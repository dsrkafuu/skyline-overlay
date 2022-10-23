import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { ExtendData } from 'ffxiv-overlay-api';
import { RootState } from '..';
import { logDebug } from '../../utils/loggers';
import { toggleShowCombatants } from './settings';

interface HistoryData extends ExtendData {
  time: number;
}

interface APIState {
  data: ExtendData;
  historys: HistoryData[];
  history: {
    idx: number; // mark current showing history for active comparsion
    data: HistoryData | null;
  };
}

/** @redux initialize */

const cleanData: ExtendData = {
  active: false,
  encounter: {} as never,
  combatant: [],
};

const initialState: APIState = {
  data: cleanData,
  historys: [],
  history: {
    idx: -1,
    data: null,
  },
};

/** @redux slice */

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    /**
     * update a new combat data
     */
    updateCombat(state, { payload }: PA<ExtendData>) {
      logDebug('Store::API::updateCombat', payload);
      state.data = payload;
      // clear current history display if new data appears
      if (state.history.idx !== -1 || state.history.data) {
        logDebug('Store::API::updateCombat::newData');
        state.history.idx = -1;
        state.history.data = null;
      }
    },
    /**
     * show a history data (-1 to disable)
     */
    showHistory: (state, { payload }: PA<number>) => {
      logDebug('Store::API::showHistory', payload);
      const idx = payload;
      if (idx < 0 || idx >= 5 || !state.historys[idx]) {
        logDebug('Store::API::showHistory::exitHistoryView');
        state.history.idx = -1;
        state.history.data = null;
        return;
      }
      state.history.idx = idx;
      state.history.data = state.historys[idx];
    },
    /**
     * push a history (5 max)
     */
    pushHistory(state, { payload }: PA<ExtendData>) {
      logDebug('Store::API::pushHistory', payload);
      state.historys.length >= 5 && state.historys.pop();
      state.historys.unshift({ time: Date.now(), ...payload });
    },
  },
});

export const { updateCombat, showHistory, pushHistory } = apiSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// add a new history means a new battle,
// so we need to show the temporarily hided combatants
listener.startListening({
  actionCreator: pushHistory,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    if (!state.settings.combatantsLocked) {
      logDebug('Listener::API::pushHistory::showHidedCombatants');
      api.dispatch(toggleShowCombatants(true));
    }
  },
});

export default {
  reducer: apiSlice.reducer,
  middleware: listener.middleware,
};
