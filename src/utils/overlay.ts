import { cloneDeep, sha1 } from './lodash';
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
  return (
    data.encounter.duration !== '00:00' &&
    data.encounter.durationSeconds !== 0 &&
    data.encounter.dps !== 0
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
  // record data for future use
  lastData = newData;
  return historyAdded;
}

let lastDataHash = '';

async function tryUpdateCombat(newData: ExtendData) {
  try {
    // prevent hash constantly changing leads to unnecessary re-render/history reset
    const newDataHash = await sha1(
      stablehash(
        cloneDeep(newData).combatant.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      )
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
