import stablehash from 'stable-hash';

import { OverlayAPI, ExtendData } from '@/api';
import { RootState } from '@/store';
import { store } from '@/store';
import { pushHistory, updateCombat } from '@/store/slices/api';

import { logInfo } from './loggers';

const overlay = new OverlayAPI();
const url = new URL(window.location.href);
const raw = /rawdata=[^0&]/gi.test(url.search);

// to record last data for history to avoid duplication
let lastData: ExtendData | null = null;
// store a finished battle snapshot and push it when next battle starts
let pendingHistory: ExtendData | null = null;
// track manual reset timestamp to avoid re-displaying data after user clicks end encounter
let lastManualResetTime = 0;

function canPushHistory(data: ExtendData) {
  const { encounter } = data;
  // robust check for quick end/start stress tests: do not rely on a single field.
  return encounter.durationSeconds > 0 || encounter.duration !== '00:00';
}

function isLikelyNewBattleAfterMissingInactive(prev: ExtendData, next: ExtendData) {
  // If both are active but timer jumps backward, previous battle likely ended
  // and an inactive packet was missed under rapid end/start interactions.
  return (
    prev.active &&
    next.active &&
    next.encounter.durationSeconds > 0 &&
    prev.encounter.durationSeconds > next.encounter.durationSeconds
  );
}

function tryPushHistory(newData: ExtendData) {
  let historyAdded = false;
  // battle ended: cache last active snapshot, but do not push yet
  if (lastData && lastData.active && !newData.active) {
    if (canPushHistory(lastData)) {
      pendingHistory = lastData;
    }
  }
  // new battle started: push cached previous battle into history
  if (pendingHistory && lastData && !lastData.active && newData.active) {
    // this will also trigger a toggleCombatant(true) if not locked
    store.dispatch(pushHistory(pendingHistory));
    pendingHistory = null;
    historyAdded = true;
  }
  // fallback: if inactive packet is missing, detect battle reset while active
  if (
    !historyAdded &&
    !pendingHistory &&
    lastData &&
    isLikelyNewBattleAfterMissingInactive(lastData, newData) &&
    canPushHistory(lastData)
  ) {
    store.dispatch(pushHistory(lastData));
    historyAdded = true;
  }
  // record data for future use
  lastData = newData;
  return historyAdded;
}

let lastDataHash = '';

function buildDedupeSnapshot(newData: ExtendData) {
  const clonedCombatant = [...newData.combatant]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({ name: item.name, job: item.job, dps: item.dps, hps: item.hps }));
  return {
    active: newData.active,
    encounter: {
      duration: newData.encounter.duration,
      durationSeconds: newData.encounter.durationSeconds,
      zoneName: newData.encounter.zoneName,
      dps: newData.encounter.dps,
      hps: newData.encounter.hps,
    },
    combatant: clonedCombatant,
    limitBreak: newData.limitBreak
      ? { dps: newData.limitBreak.dps, hps: newData.limitBreak.hps }
      : null,
  };
}

function tryUpdateCombat(newData: ExtendData) {
  try {
    // stablehash dedupe avoids re-processing identical packets from upstream
    const newDataHash = stablehash(buildDedupeSnapshot(newData));
    if (lastDataHash !== newDataHash) {
      store.dispatch(updateCombat(newData));
      lastDataHash = newDataHash;
    }
  } catch (e) {
    console.error(e);
    store.dispatch(updateCombat(newData));
  }
}

/**
 * Cancel the pending history and simulate an already-processed inactive transition,
 * so that manual reset via resetEncounter() does not produce a duplicate history entry.
 * Call this before dispatching resetEncounter() from the UI.
 */
export function clearPendingHistory() {
  pendingHistory = null;
  lastManualResetTime = Date.now();
  // Fake an inactive lastData so tryPushHistory won't re-arm pendingHistory
  // when the natural inactive CombatData packet arrives from ACT.
  if (lastData) {
    lastData = { ...lastData, active: false };
  }
}

// add overlay callback
overlay.addListener('CombatData', (rawData) => {
  const data = rawData.extendData;
  if (raw) {
    logInfo('raw combat data get', rawData);
  }
  if (data) {
    tryPushHistory(data);
    const state = store.getState() as RootState;
    const isManuallyLocked = state.api.lockedData !== null;
    const isJustAfterManualReset = !data.active && Date.now() - lastManualResetTime < 1000;
    // after encounter end, keep showing last finished battle until next battle starts
    // when manually locked, always keep syncing real-time data in background
    // skip updating if this is the inactive packet that arrived right after manual reset
    if (isManuallyLocked || (!(pendingHistory && !data.active) && !isJustAfterManualReset)) {
      tryUpdateCombat(data);
    }
  }
});

// start overlay
overlay.startEvent();

export default overlay;
