import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { CUSTOM_CSS_DOM_ID } from '../../utils/constants';
import {
  LangMapKey,
  ShortNameMapKey,
  SortRuleMapKey,
  ThemeMapKey,
  DisplayModeMapKey,
  DisplayContentMapKey,
  TickerAlignMapKey,
  TickerMapKey,
  BottomDispMapKey,
  FontFamilyMapKey,
  FontWeightMapKey,
  MAP_FONT_WEIGHT,
} from '../../utils/maps';
import lang from '../../lang';
import { cloneDeep, mergeDeep, xssEscape } from '../../utils/lodash';
import { getLS, setLS } from '../../utils/storage';
import { ColorsData } from '../../themes';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

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
  theme: ThemeMapKey;
  lang: LangMapKey;
  zoom: number;
  opacity: number;
  fonts: FontSettings;
  customCSS: string;
  // colors
  preset: string; // preset key
  colors: Partial<ColorsData>; // custom colors
}

interface SettingsState extends Settings {
  showCombatants: boolean;
  lockCombatants: boolean;
  showSettings: boolean;
  blurName: boolean;
}

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
  theme: 'default',
  lang: 'en',
  zoom: 1,
  opacity: 1,
  fonts: { family: 'default', weight: 'regular' },
  customCSS: '#root {}',
  preset: 'default',
  colors: {},
};
let initialState: SettingsState = {
  showCombatants: true,
  lockCombatants: false,
  showSettings: false,
  blurName: false,
  ...cloneDeep(defaultSettings),
};

// merge saved settings into default settings
const savedSettings = (getLS('settings') || {}) as Partial<SettingsState>;
try {
  for (const key of Object.keys(savedSettings)) {
    // @ts-expect-error merge PartialSettings into Settings
    initialState[key] = savedSettings[key];
  }
} catch {
  // use default setting if saved settings is invalid
  initialState = {
    ...initialState,
    ...cloneDeep(defaultSettings),
  };
}

// apply initial theme
document.body.setAttribute('data-theme', initialState.theme);
// apply initial fonts
const family = initialState.fonts.family;
document.documentElement.setAttribute('data-font', family);
// apply initial lang
if (!savedSettings.lang) {
  const detectedLang = navigator.language.substring(0, 2);
  if (Object.keys(lang).includes(detectedLang)) {
    initialState.lang = detectedLang as LangMapKey;
  }
}
document.documentElement.setAttribute('lang', initialState.lang);
// apply initial font weight
const weight = MAP_FONT_WEIGHT[initialState.fonts.weight].text;
document.documentElement.style.fontWeight = weight;
// apply initial zoom
const zoomFontSize = `${Math.floor(100 * initialState.zoom) || 100}px`;
document.documentElement.style.fontSize = zoomFontSize;
// apply initial custom style
const customStyles = document.createElement('style');
customStyles.setAttribute('id', CUSTOM_CSS_DOM_ID);
customStyles.innerHTML = xssEscape(initialState.customCSS);
document.head.appendChild(customStyles);

/**
 * delay save settings (event loop)
 */
const saveSettings = (data: Partial<Settings>) => {
  setTimeout(() => {
    try {
      const pre = (getLS('settings') || {}) as Partial<Settings>;
      setLS('settings', { ...pre, ...data });
    } catch {
      return;
    }
  }, 0);
};

/** @redux slice */

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // settings container display
    toggleShowCombatants(state, { payload }: PA<boolean | undefined>) {
      if (payload !== undefined) {
        state.showCombatants = payload;
      } else {
        state.showCombatants = !state.showCombatants;
      }
    },
    toggleLockCombatants(state, { payload }: PA<boolean | undefined>) {
      if (payload !== undefined) {
        state.lockCombatants = payload;
      } else {
        state.lockCombatants = !state.lockCombatants;
      }
    },
    toggleSettings(state) {
      state.showSettings = !state.showSettings;
    },
    toggleBlurName(state) {
      state.blurName = !state.blurName;
    },
    // data
    updateSort(state, { payload }: PA<Partial<SortSettings>>) {
      state.sort = { ...state.sort, ...payload };
      saveSettings({ sort: state.sort });
    },
    updatePlayerLimit(state, { payload }: PA<number>) {
      state.playerLimit = payload;
      saveSettings({ playerLimit: state.playerLimit });
    },
    updateShowLB(state, { payload }: PA<boolean>) {
      state.showLB = payload;
      saveSettings({ showLB: state.showLB });
    },
    updateYouName(state, { payload }: PA<string>) {
      state.youName = payload;
      saveSettings({ youName: state.youName });
    },
    updatePetMergeID(state, { payload }: PA<string>) {
      state.petMergeID = payload;
      saveSettings({ petMergeID: state.petMergeID });
    },
    updateShortNumber(state, { payload }: PA<boolean>) {
      state.shortNumber = payload;
      saveSettings({ shortNumber: state.shortNumber });
    },
    updateBigNumberMode(state, { payload }: PA<boolean>) {
      state.bigNumberMode = payload;
      saveSettings({ bigNumberMode: state.bigNumberMode });
    },
    // display
    updateDispMode(state, { payload }: PA<DisplayModeMapKey>) {
      state.dispMode = payload;
      saveSettings({ dispMode: state.dispMode });
    },
    updateDispContent(state, { payload }: PA<Partial<DispContentSettings>>) {
      state.dispContent = { ...state.dispContent, ...payload };
      saveSettings({ dispContent: state.dispContent });
    },
    updateHlYou(state, { payload }: PA<boolean>) {
      state.hlYou = payload;
      saveSettings({ hlYou: state.hlYou });
    },
    updateTicker(state, { payload }: PA<Partial<TickerSettings>>) {
      state.ticker = { ...state.ticker, ...payload };
      saveSettings({ ticker: state.ticker });
    },
    updateTickerAlign(state, { payload }: PA<Partial<TickerAlignSettings>>) {
      state.tickerAlign = { ...state.tickerAlign, ...payload };
      saveSettings({ tickerAlign: state.tickerAlign });
    },
    updateBottomDisp(state, { payload }: PA<BottomDispMapKey>) {
      state.bottomDisp = payload;
      saveSettings({ bottomDisp: state.bottomDisp });
    },
    updateShortName(state, { payload }: PA<ShortNameMapKey>) {
      state.shortName = payload;
      saveSettings({ shortName: state.shortName });
    },
    // general
    updateTheme(state, { payload }: PA<ThemeMapKey>) {
      state.theme = payload;
      saveSettings({ theme: state.theme });
    },
    updateOpacity(state, { payload }: PA<number>) {
      state.opacity = payload;
      saveSettings({ opacity: state.opacity });
    },
    updateLang(state, { payload }: PA<LangMapKey>) {
      state.lang = payload;
      saveSettings({ lang: state.lang });
    },
    updateZoom(state, { payload }: PA<number>) {
      state.zoom = payload;
      saveSettings({ zoom: state.zoom });
    },
    updateFonts(state, { payload }: PA<Partial<FontSettings>>) {
      state.fonts = { ...state.fonts, ...payload };
      saveSettings({ fonts: state.fonts });
    },
    updateCustomCSS(state, { payload }: PA<string>) {
      state.customCSS = payload;
      saveSettings({ customCSS: state.customCSS });
    },
    // colors
    updatePreset(state, { payload }: PA<string>) {
      state.preset = payload;
      saveSettings({ preset: state.preset });
    },
    updateColors(state, { payload }: PA<DeepPartial<ColorsData> | null>) {
      if (!payload) {
        state.colors = {};
      } else {
        state.colors = mergeDeep(state.colors, payload);
      }
      saveSettings({ colors: state.colors });
    },
  },
});

export const {
  toggleShowCombatants,
  toggleLockCombatants,
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
  updateTheme,
  updateOpacity,
  updateLang,
  updateZoom,
  updateFonts,
  updateCustomCSS,
  updatePreset,
  updateColors,
} = settingsSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// ensure unlock combatants when toggling combatants
listener.startListening({
  actionCreator: toggleShowCombatants,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    if (state.settings.lockCombatants) {
      api.dispatch(toggleLockCombatants(false));
    }
  },
});

// apply dom when settings changed
listener.startListening({
  actionCreator: updateTheme,
  effect: ({ payload }) => {
    document.body.setAttribute('data-theme', payload);
  },
});
listener.startListening({
  actionCreator: updateLang,
  effect: ({ payload }) => {
    document.documentElement.setAttribute('lang', payload);
  },
});
listener.startListening({
  actionCreator: updateZoom,
  effect: ({ payload }) => {
    const zoomFontSize = `${Math.floor(100 * payload) || 100}px`;
    document.documentElement.style.fontSize = zoomFontSize;
  },
});
listener.startListening({
  actionCreator: updateFonts,
  effect: ({ payload }) => {
    const { family, weight } = payload;
    if (family) {
      document.documentElement.setAttribute('data-font', family);
    }
    if (weight) {
      const fontWeight = MAP_FONT_WEIGHT[weight].text;
      document.documentElement.style.fontWeight = fontWeight;
    }
  },
});
listener.startListening({
  actionCreator: updateCustomCSS,
  effect: ({ payload }) => {
    const customStyles = document.getElementById(CUSTOM_CSS_DOM_ID);
    if (customStyles) {
      customStyles.innerHTML = xssEscape(payload);
    }
  },
});

// clear custom color when theme changes & preset changes
listener.startListening({
  actionCreator: updateTheme,
  effect: (_, api) => {
    api.dispatch(updateColors(null));
  },
});
listener.startListening({
  actionCreator: updatePreset,
  effect: (_, api) => {
    api.dispatch(updateColors(null));
  },
});

export default {
  reducer: settingsSlice.reducer,
  middleware: listener.middleware,
};
