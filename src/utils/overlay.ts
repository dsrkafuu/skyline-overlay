import { cloneDeep, sha1 } from './lodash';
import { OverlayAPI, ExtendData } from '@/api';
import { store } from '@/store';
import { pushHistory, updateCombat } from '@/store/slices/api';
import stablehash from 'stable-hash';

const overlay = new OverlayAPI();

// to record last data for history to avoid duplication
let lastData: ExtendData | null = null;

function tryPushHistory(newData: ExtendData) {
  let historyAdded = false;
  // if last data (false) this data (true) which indicates
  // a new battle, push last data (false) into a new history
  if (lastData && !lastData.active && newData.active) {
    // do not push empty battle into history
    if (
      lastData.encounter.duration !== '00:00' &&
      lastData.encounter.durationSeconds !== 0 &&
      lastData.encounter.dps !== 0
    ) {
      // this will also trigger a toggleCombatant(true) if not locked
      store.dispatch(pushHistory(lastData));
      historyAdded = true;
    }
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
  if (data) {
    tryPushHistory(data);
    tryUpdateCombat(data);
  }
});

// start overlay
overlay.startEvent();

export default overlay;
