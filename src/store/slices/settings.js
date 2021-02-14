import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // settings container display
  showSettings: false,

  // sort data
  sortRule: { key: 'dps', value: -1 },
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
     * @param {{ payload: { key, value } }} action
     */
    updateSortRule(state, action) {
      const { key, value } = action.payload;
      key && (state.sortRule.key = String(key));
      value && (state.sortRule.value = String(value));
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

export const { toggleSettings, updateSortRule, updateShowRanks, updateYouName } = slice.actions;

export default slice.reducer;
