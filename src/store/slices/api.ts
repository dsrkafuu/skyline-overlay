import {
  createSlice,
  createListenerMiddleware,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { ExtendData } from 'ffxiv-overlay-api';
import { RootState } from '..';
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
      state.data = payload;
      // clear current history display if new data appears
      if (state.history.idx !== -1 || state.history.data) {
        state.history.idx = -1;
        state.history.data = null;
      }
    },
    /**
     * show a history data (-1 to disable)
     */
    showHistory: (state, { payload }: PA<number>) => {
      const idx = payload;
      if (idx < 0 || idx >= 5 || !state.historys[idx]) {
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
      state.historys.length >= 5 && state.historys.pop();
      state.historys.unshift({ time: Date.now(), ...payload });
    },
  },
});

export const { updateCombat, showHistory, pushHistory } = apiSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// show combatants whenever new data is pushed
listener.startListening({
  actionCreator: updateCombat,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    if (!state.settings.showCombatants) {
      api.dispatch(toggleShowCombatants(true));
    }
  },
});

export default {
  reducer: apiSlice.reducer,
  middleware: listener.middleware,
};
