import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import lang from '../../lang';
import { CUSTOM_CSS_DOM_ID } from '../../utils/constants';
import {
  LangMapKey,
  ShortNameMapKey,
  SortRuleMapKey,
  DisplayModeMapKey,
  DisplayContentMapKey,
  TickerAlignMapKey,
  TickerMapKey,
  BottomDispMapKey,
  FontFamilyMapKey,
  FontWeightMapKey,
  MAP_FONT_WEIGHT,
} from '../../utils/maps';
import { cloneDeep, mergeDeep, xssEscape } from '../../utils/lodash';
import { getAsyncLSSetter, getLS } from '../../utils/storage';
import { logDebug } from '../../utils/loggers';

interface SortSettings {
  key: SortRuleMapKey;
  rule: -1 | 1;
}
interface DispContentSettings {
  left: DisplayContentMapKey;
  right: DisplayContentMapKey;
}
interface TickerSettings {
  top: TickerMapKey;
  bottom: TickerMapKey;
}
interface TickerAlignSettings {
  top: TickerAlignMapKey;
  bottom: TickerAlignMapKey;
}
interface FontSettings {
  family: FontFamilyMapKey;
  weight: FontWeightMapKey;
}

export interface Settings {
  // data
  sort: SortSettings;
  playerLimit: number; // combatant limit
  showLB: boolean;
  youName: string; // which to represent as 'YOU'
  petMergeID: string; // merge pet data when using global client with cn language patch
  shortNumber: boolean;
  bigNumberMode: boolean;
  // display
  dispMode: DisplayModeMapKey;
  dispContent: DispContentSettings;
  hlYou: boolean;
  ticker: TickerSettings;
  tickerAlign: TickerAlignSettings;
  bottomDisp: BottomDispMapKey;
  shortName: ShortNameMapKey;
  // general
  lang: LangMapKey;
  zoom: number;
  opacity: number;
  fonts: FontSettings;
  customCSS: string;
}

interface SettingsState extends Settings {
  showCombatants: boolean;
  combatantsLocked: boolean;
  showSettings: boolean;
  blurName: boolean;
}

const save = getAsyncLSSetter<DeepPartial<Settings>>('settings');

/** @redux initialize */

// initial settings
export const defaultSettings: Settings = {
  sort: { key: 'dps', rule: -1 },
  playerLimit: 8,
  showLB: true,
  youName: 'YOU',
  petMergeID: '',
  shortNumber: false,
  bigNumberMode: false,
  dispMode: 'single',
  dispContent: { left: 'hps', right: 'dps' },
  hlYou: true,
  ticker: { top: 'none', bottom: 'dps' },
  tickerAlign: { top: 'right', bottom: 'left' },
  bottomDisp: 'maxhit',
  shortName: 'fstlst',
  lang: 'en',
  zoom: 1,
  opacity: 1,
  fonts: { family: 'default', weight: 'regular' },
  customCSS: '#root {}',
};
let initialState: SettingsState = {
  showCombatants: true,
  combatantsLocked: false,
  showSettings: false,
  blurName: false,
  ...cloneDeep(defaultSettings),
};

// merge saved settings into default settings
const savedSettings = getLS<DeepPartial<Settings>>('settings') || {};
try {
  logDebug('Store::Settings::mergeSavedSettings', savedSettings);
  initialState = mergeDeep(initialState, savedSettings);
} catch {
  // use default setting if saved settings is invalid
  logDebug('Store::Settings::invalidSavedSettings', savedSettings);
  initialState = { ...initialState, ...defaultSettings };
}

// apply initial lang
function applyLang(value: LangMapKey) {
  logDebug('Store::Settings::applyLang', value);
  document.documentElement.setAttribute('lang', value);
}
const availableLangs = Object.keys(lang);
if (!savedSettings.lang || !availableLangs.includes(savedSettings.lang)) {
  const detectedLang = navigator.language.substring(0, 2);
  if (availableLangs.includes(detectedLang)) {
    logDebug('Store::Settings::initialLangDetected', detectedLang);
    initialState.lang = detectedLang as LangMapKey;
    save({ lang: detectedLang as LangMapKey });
  }
}
applyLang(initialState.lang);

// apply initial fonts
function applyFonts(value: FontFamilyMapKey) {
  logDebug('Store::Settings::applyFonts', value);
  document.documentElement.setAttribute('data-font', value);
}
applyFonts(initialState.fonts.family);

// apply initial font weight
function applyFontWeight(value: FontWeightMapKey) {
  const weight = MAP_FONT_WEIGHT[value].text;
  logDebug('Store::Settings::applyFontWeight', weight);
  document.documentElement.style.fontWeight = weight;
}
applyFontWeight(initialState.fonts.weight);

// apply initial zoom
function applyZoom(value: number) {
  const zoomFontSize = `${Math.floor(100 * value) || 100}px`;
  logDebug('Store::Settings::applyZoom', zoomFontSize);
  document.documentElement.style.fontSize = zoomFontSize;
}
applyZoom(initialState.zoom);

// apply initial custom style
function applyCustomCSS(value: string) {
  logDebug('Store::Settings::applyCustomCSS', value);
  const el = document.getElementById(CUSTOM_CSS_DOM_ID);
  if (el) {
    el.innerHTML = xssEscape(value);
  } else {
    const newEl = document.createElement('style');
    newEl.id = CUSTOM_CSS_DOM_ID;
    newEl.innerHTML = xssEscape(value);
    document.head.appendChild(newEl);
  }
}
applyCustomCSS(initialState.customCSS);

/** @redux slice */

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // settings container display
    toggleShowCombatants(state, { payload }: PA<boolean | undefined>) {
      logDebug('Store::Settings::toggleShowCombatants', payload);
      if (payload !== undefined) {
        state.showCombatants = payload;
      } else {
        state.showCombatants = !state.showCombatants;
      }
    },
    toggleCombatantsLocked(state, { payload }: PA<boolean | undefined>) {
      logDebug('Store::Settings::toggleCombatantsLocked', payload);
      if (payload !== undefined) {
        state.combatantsLocked = payload;
      } else {
        state.combatantsLocked = !state.combatantsLocked;
      }
    },
    toggleSettings(state) {
      logDebug('Store::Settings::toggleSettings');
      state.showSettings = !state.showSettings;
    },
    toggleBlurName(state) {
      logDebug('Store::Settings::toggleBlurName');
      state.blurName = !state.blurName;
    },
    // data
    updateSort(state, { payload }: PA<Partial<SortSettings>>) {
      logDebug('Store::Settings::updateSort', payload);
      state.sort = { ...state.sort, ...payload };
      save({ sort: state.sort });
    },
    updatePlayerLimit(state, { payload }: PA<number>) {
      logDebug('Store::Settings::updatePlayerLimit', payload);
      state.playerLimit = payload;
      save({ playerLimit: state.playerLimit });
    },
    updateShowLB(state, { payload }: PA<boolean>) {
      logDebug('Store::Settings::updateShowLB', payload);
      state.showLB = payload;
      save({ showLB: state.showLB });
    },
    updateYouName(state, { payload }: PA<string>) {
      logDebug('Store::Settings::updateYouName', payload);
      state.youName = payload;
      save({ youName: state.youName });
    },
    updatePetMergeID(state, { payload }: PA<string>) {
      logDebug('Store::Settings::updatePetMergeID', payload);
      state.petMergeID = payload;
      save({ petMergeID: state.petMergeID });
    },
    updateShortNumber(state, { payload }: PA<boolean>) {
      logDebug('Store::Settings::updateShortNumber', payload);
      state.shortNumber = payload;
      save({ shortNumber: state.shortNumber });
    },
    updateBigNumberMode(state, { payload }: PA<boolean>) {
      logDebug('Store::Settings::updateBigNumberMode', payload);
      state.bigNumberMode = payload;
      save({ bigNumberMode: state.bigNumberMode });
    },
    // display
    updateDispMode(state, { payload }: PA<DisplayModeMapKey>) {
      logDebug('Store::Settings::updateDispMode', payload);
      state.dispMode = payload;
      save({ dispMode: state.dispMode });
    },
    updateDispContent(state, { payload }: PA<Partial<DispContentSettings>>) {
      logDebug('Store::Settings::updateDispContent', payload);
      state.dispContent = { ...state.dispContent, ...payload };
      save({ dispContent: state.dispContent });
    },
    updateHlYou(state, { payload }: PA<boolean>) {
      logDebug('Store::Settings::updateHlYou', payload);
      state.hlYou = payload;
      save({ hlYou: state.hlYou });
    },
    updateTicker(state, { payload }: PA<Partial<TickerSettings>>) {
      logDebug('Store::Settings::updateTicker', payload);
      state.ticker = { ...state.ticker, ...payload };
      save({ ticker: state.ticker });
    },
    updateTickerAlign(state, { payload }: PA<Partial<TickerAlignSettings>>) {
      logDebug('Store::Settings::updateTickerAlign', payload);
      state.tickerAlign = { ...state.tickerAlign, ...payload };
      save({ tickerAlign: state.tickerAlign });
    },
    updateBottomDisp(state, { payload }: PA<BottomDispMapKey>) {
      logDebug('Store::Settings::updateBottomDisp', payload);
      state.bottomDisp = payload;
      save({ bottomDisp: state.bottomDisp });
    },
    updateShortName(state, { payload }: PA<ShortNameMapKey>) {
      logDebug('Store::Settings::updateShortName', payload);
      state.shortName = payload;
      save({ shortName: state.shortName });
    },
    // general
    updateOpacity(state, { payload }: PA<number>) {
      logDebug('Store::Settings::updateOpacity', payload);
      state.opacity = payload;
      save({ opacity: state.opacity });
    },
    updateLang(state, { payload }: PA<LangMapKey>) {
      logDebug('Store::Settings::updateLang', payload);
      state.lang = payload;
      save({ lang: state.lang });
    },
    updateZoom(state, { payload }: PA<number>) {
      logDebug('Store::Settings::updateZoom', payload);
      state.zoom = payload;
      save({ zoom: state.zoom });
    },
    updateFonts(state, { payload }: PA<Partial<FontSettings>>) {
      logDebug('Store::Settings::updateFonts', payload);
      state.fonts = { ...state.fonts, ...payload };
      save({ fonts: state.fonts });
    },
    updateCustomCSS(state, { payload }: PA<string>) {
      logDebug('Store::Settings::updateCustomCSS', payload);
      state.customCSS = payload;
      save({ customCSS: state.customCSS });
    },
  },
});

export const {
  toggleShowCombatants,
  toggleCombatantsLocked,
  toggleSettings,
  toggleBlurName,
  updateSort,
  updatePlayerLimit,
  updateShowLB,
  updateYouName,
  updatePetMergeID,
  updateShortNumber,
  updateBigNumberMode,
  updateDispMode,
  updateDispContent,
  updateHlYou,
  updateTicker,
  updateTickerAlign,
  updateBottomDisp,
  updateShortName,
  updateOpacity,
  updateLang,
  updateZoom,
  updateFonts,
  updateCustomCSS,
} = settingsSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// when click to show combatants,
// unlock them if locked
listener.startListening({
  actionCreator: toggleShowCombatants,
  effect: ({ payload }, api) => {
    const state = api.getState() as RootState;
    if (
      payload === true ||
      (payload === undefined && state.settings.showCombatants === false)
    ) {
      logDebug('Listener::Settings::toggleShowCombatants::unlockCombatants');
      api.dispatch(toggleCombatantsLocked(false));
    }
  },
});

// apply dom when settings changed
listener.startListening({
  actionCreator: updateLang,
  effect: ({ payload }) => applyLang(payload),
});
listener.startListening({
  actionCreator: updateFonts,
  effect: ({ payload }) => {
    const { family, weight } = payload;
    family && applyFonts(family);
    weight && applyFontWeight(weight);
  },
});
listener.startListening({
  actionCreator: updateZoom,
  effect: ({ payload }) => applyZoom(payload),
});
listener.startListening({
  actionCreator: updateCustomCSS,
  effect: ({ payload }) => applyCustomCSS(payload),
});

export default {
  reducer: settingsSlice.reducer,
  middleware: listener.middleware,
};
