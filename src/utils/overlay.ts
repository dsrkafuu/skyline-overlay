import { cloneDeep } from './lodash';
import { logInfo } from './loggers';
import { OverlayAPI, ExtendData } from '@/api';
import { RootState } from '@/store';
import { store } from '@/store';
import { pushHistory, updateCombat } from '@/store/slices/api';
import stablehash from 'stable-hash';

const overlay = new OverlayAPI();
const url = new URL(window.location.href);
const raw = /rawdata=[^0&]/gi.test(url.search);

// to record last data for history to avoid duplication
let lastData: ExtendData | null = null;
// store a finished battle snapshot and push it when next battle starts
let pendingHistory: ExtendData | null = null;

function canPushHistory(data: ExtendData) {
  const { encounter } = data;
  // robust check for quick end/start stress tests: do not rely on a single field.
  return encounter.durationSeconds > 0 || encounter.duration !== '00:00';
}

function isLikelyNewBattleAfterMissingInactive(
  prev: ExtendData,
  next: ExtendData
) {
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

async function tryUpdateCombat(newData: ExtendData) {
  try {
    // prevent hash constantly changing leads to unnecessary re-render/history reset
    const newDataHash = stablehash(
      cloneDeep(newData).combatant.sort((a, b) => a.name.localeCompare(b.name))
    );
    if (lastDataHash !== newDataHash) {
      store.dispatch(updateCombat(newData));
      lastDataHash = newDataHash;
    }
  } catch (e) {
    console.error(e);
    store.dispatch(updateCombat(newData));
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
    // after encounter end, keep showing last finished battle until next battle starts
    // when manually locked, always keep syncing real-time data in background
    if (isManuallyLocked || !(pendingHistory && !data.active)) {
      tryUpdateCombat(data);
    }
  }
});

// start overlay
overlay.startEvent();

export default overlay;
