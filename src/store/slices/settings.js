import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // settings container display
  showSettings: false,

  // sort data
  sort: { key: 'dps', rule: -1 },
  // show rank number before id
  showRanks: false,
  // which to represent as 'YOU'
  youName: 'YOU',
};

const slice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    toggleSettings(state) {
      state.showSettings = !state.showSettings;
    },

    /**
     * @param {{ payload: { key, rule } }} action
     */
    updateSort(state, action) {
      const { key, rule } = action.payload;
      state.sort = { key: String(key), rule: Number(rule) };
    },

    /**
     * @param {{ payload: { value } }} action
     */
    updateShowRanks(state, action) {
      const { value } = action.payload;
      state.showRanks = Boolean(value);
    },

    /**
     * @param {{ payload: { value } }} action
     */
    updateYouName(state, action) {
      const { value } = action.payload;
      state.youName = `${value}`;
    },
  },
});

export const { toggleSettings, updateShowRanks, updateYouName } = slice.actions;

export default slice.reducer;
