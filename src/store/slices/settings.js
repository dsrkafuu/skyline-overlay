import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // settings container display
  showSettings: false,

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
