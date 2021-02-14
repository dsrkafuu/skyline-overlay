import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // settings container display
  showSettings: false,

  /* data */
  // sort data
  sortRule: { key: 'dps', value: -1 },
  // show rank number before id
  showRanks: false,
  // which to represent as 'YOU'
  youName: 'YOU',

  /* layout */
  zoom: 1,
};

const slice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    toggleSettings(state) {
      state.showSettings = !state.showSettings;
    },

    /* data */
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

    /* layout */
    /**
     * @param {{ payload: { value } }} action
     */
    updateZoom(state, action) {
      const { value } = action.payload;
      state.zoom = Number(value);
      document.documentElement.style.fontSize = `${Number(value) * 14}px`;
    },
  },
});

export const {
  toggleSettings,
  updateSortRule,
  updateShowRanks,
  updateYouName,
  updateZoom,
} = slice.actions;

export default slice.reducer;
