import { createSlice } from '@reduxjs/toolkit';
import i18n from '@/i18n';
import { setLS, getLS } from '@/utils/storage';

const initialState = {
  // settings container display
  showSettings: false,

  /* data */
  sortRule: { key: 'dps', value: -1 }, // sort data
  playerLimit: 8, // combatant limit
  showLB: true,
  showHPS: false,
  extendDetail: false,

  /* display */
  showRanks: false, // show rank number before id
  hlYou: true, // highlight 'YOU'
  youName: 'YOU', // which to represent as 'YOU'
  shortName: { first: false, last: false },
  blurName: false,

  /* general */
  theme: 'default',
  lang: 'en',
  zoom: 1,
  customCSS: '#root {}',

  // merge local storage saved settings
  ...(getLS('settings') || {}),
};
// apply theme to dom
if (initialState.theme === 'default') {
  document.body.removeAttribute('data-theme');
} else {
  document.body.setAttribute('data-theme', initialState.theme);
}
// apply initial state to dom
document.documentElement.setAttribute('lang', initialState.lang);
document.documentElement.style.fontSize = `${Number(initialState.zoom) * 14}px`;
// apply initial style
const customStyles = document.createElement('style');
customStyles.setAttribute('id', 'skyline-ccss');
customStyles.innerHTML = initialState.customCSS;
document.head.appendChild(customStyles);

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
      value && (state.sortRule.value = Number(value));
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updatePlayerLimit(state, action) {
      const value = action.payload;
      state.playerLimit = Number(value) > 0 ? Number(value) : initialState.playerLimit;
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateShowLB(state, action) {
      const value = action.payload;
      state.showLB = Boolean(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateShowHPS(state, action) {
      const value = action.payload;
      state.showHPS = Boolean(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateExtendDetail(state, action) {
      const value = action.payload;
      state.extendDetail = Boolean(value);
      saveSettings(state);
    },

    /* display */
    /**
     * @param {{ payload: value }} action
     */
    updateShowRanks(state, action) {
      const value = action.payload;
      state.showRanks = Boolean(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateHlYou(state, action) {
      const value = action.payload;
      state.hlYou = Boolean(value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateYouName(state, action) {
      const value = action.payload;
      state.youName = `${value}`;
      saveSettings(state);
    },
    /**
     * @param {{ payload: { first, last } }} action
     */
    updateShortName(state, action) {
      const { first, last } = action.payload;
      state.shortName.first = Boolean(first);
      state.shortName.last = Boolean(last);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateBlurName(state, action) {
      const value = action.payload;
      state.blurName = Boolean(value);
      saveSettings(state);
    },

    /* layout */
    /**
     * @param {{ payload: value }} action
     */
    updateTheme(state, action) {
      const value = action.payload;
      state.theme = value;
      if (value === 'default') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', value);
      }
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateLang(state, action) {
      const value = action.payload;
      state.lang = value;
      i18n.changeLanguage(value);
      document.documentElement.setAttribute('lang', value);
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateZoom(state, action) {
      const value = action.payload;
      state.zoom = Number(value);
      document.documentElement.style.fontSize = `${Number(value) * 14}px`;
      saveSettings(state);
    },
    /**
     * @param {{ payload: value }} action
     */
    updateCustomCSS(state, action) {
      const value = action.payload;
      state.customCSS = value;
      const customStyles = document.querySelector('#skyline-ccss');
      if (customStyles) {
        customStyles.innerHTML = value;
      }
      saveSettings(state);
    },
  },
});

export const { toggleSettings } = slice.actions;

export const {
  updateSortRule,
  updatePlayerLimit,
  updateShowLB,
  updateShowHPS,
  updateExtendDetail,
  updateShowRanks,
  updateHlYou,
  updateYouName,
  updateShortName,
  updateBlurName,
  updateTheme,
  updateLang,
  updateZoom,
  updateCustomCSS,
} = slice.actions;

export default slice.reducer;
