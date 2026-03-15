import { createListenerMiddleware, createSlice, PayloadAction as PA } from '@reduxjs/toolkit';

import { ExtendData } from '@/api';
import { RootState } from '@/store';
import { logDebug } from '@/utils/loggers';

import { toggleShowCombatants } from './settings';

interface HistoryData extends ExtendData {
  time: number;
}

export interface APIState {
  data: ExtendData;
  historys: HistoryData[];
  historyIdx: number; // idx of currently selected history for highlight; -1 = real-time
  lockedData: ExtendData | null; // frozen snapshot for display; null = real-time
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
  historyIdx: -1,
  lockedData: null,
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
    },
    /**
     * lock/unlock display data; null = unlock (real-time)
     */
    setLockedData(state, { payload }: PA<ExtendData | null>) {
      logDebug('Store::API::setLockedData', payload);
      state.lockedData = payload;
      // unlocking from lock button should also reset history highlight
      if (payload === null) {
        state.historyIdx = -1;
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
        state.historyIdx = -1;
        state.lockedData = null;
        return;
      }
      state.historyIdx = idx;
      state.lockedData = state.historys[idx];
    },
    /**
     * push a history (5 max)
     */
    pushHistory(state, { payload }: PA<ExtendData>) {
      logDebug('Store::API::pushHistory', payload);
      state.historys.length >= 5 && state.historys.pop();
      state.historys.unshift({ time: Date.now(), ...payload });
    },
    /**
     * clean mock data
     */
    cleanMockData(state) {
      logDebug('Store::API::cleanMockData');
      state.data = cleanData;
    },
  },
});

export const { updateCombat, setLockedData, showHistory, pushHistory, cleanMockData } =
  apiSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// add a new history means a new battle,
// so we need to show the temporarily hided combatants
listener.startListening({
  actionCreator: pushHistory,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    if (state.api.lockedData === null) {
      logDebug('Listener::API::pushHistory::showHidedCombatants');
      api.dispatch(toggleShowCombatants(true));
    }
  },
});

export default {
  reducer: apiSlice.reducer,
  middleware: listener.middleware,
};
