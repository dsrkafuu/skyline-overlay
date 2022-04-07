import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import { store } from '../store';
import { pushHistory, updateCombat } from '../store/slices/api';

const overlay = new OverlayAPI();

// to record last data for history to avoid duplication
let lastData: ExtendData | null = null;

function tryPushHistory(newData: ExtendData) {
  // if last data (false) this data (true) which indicates
  // a new battle, push last data (false) into a new history
  if (lastData && !lastData.active && newData.active) {
    // do not push empty battle into history
    if (
      lastData.encounter.duration !== '00:00' &&
      lastData.encounter.durationSeconds !== 0 &&
      lastData.encounter.dps !== 0
    ) {
      store.dispatch(pushHistory(lastData));
    }
  }
  // record data for future use
  lastData = newData;
}

// add overlay callback
overlay.addListener('CombatData', (rawData) => {
  const data = rawData.extendData;
  if (data) {
    tryPushHistory(data);
    store.dispatch(updateCombat(data));
  }
});

// start overlay
overlay.startEvent();

export default overlay;
