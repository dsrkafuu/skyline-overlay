import { createSlice } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import { setLS, getLS } from '@/utils/storage';

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
  lang: 'en-US',
  zoom: 1,

  // merge local storage saved settings
  ...(getLS('settings') || {}),
};

/**
 * save settings to local storage
 * @param {Object} state
 */
function saveSettings(state) {
  setLS('settings', state);
}

const slice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    toggleSettings(state) {
      state.showSettings = !state.showSettings;
      saveSettings(state);
    },

    /* data */
    /**
     * @param {{ payload: { key, value } }} action
     */
    updateSortRule(state, action) {
      const { key, value } = action.payload;
      key && (state.sortRule.key = String(key));
      value && (state.sortRule.value = String(value));
      saveSettings(state);
    },
    /**
     * @param {{ payload: { value } }} action
     */
    updateShowRanks(state, action) {
      const { value } = action.payload;
      state.showRanks = Boolean(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: { value } }} action
     */
    updateYouName(state, action) {
      const { value } = action.payload;
      state.youName = `${value}`;
      saveSettings(state);
    },

    /* layout */
    /**
     * @param {{ payload: { value } }} action
     */
    updateLang(state, action) {
      const { value } = action.payload;
      state.lang = value;
      i18n.changeLanguage(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: { value } }} action
     */
    updateZoom(state, action) {
      const { value } = action.payload;
      state.zoom = Number(value);
      document.documentElement.style.fontSize = `${Number(value) * 14}px`;
      saveSettings(state);
    },
  },
});

export const {
  toggleSettings,
  updateSortRule,
  updateShowRanks,
  updateYouName,
  updateLang,
  updateZoom,
} = slice.actions;

export default slice.reducer;
