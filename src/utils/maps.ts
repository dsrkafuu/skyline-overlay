/**
 * value maps for selection component
 */

// sort rules map
const sortRuleMap = {
  dps: { text: 'DPS' },
  hps: { text: 'HPS' },
};
export type SortRuleMapKey = keyof typeof sortRuleMap & string;
export const MAP_SORT_RULE = sortRuleMap;

// short names map
const shortNameMap = {
  fstlst: { text: 'First Last', data: { first: false, last: false } },
  fstl: { text: 'First L.', data: { first: false, last: true } },
  flst: { text: 'F. Last', data: { first: true, last: false } },
  fl: { text: 'F. L.', data: { first: true, last: true } },
};
export type ShortNameMapKey = keyof typeof shortNameMap & string;
export const MAP_SHORT_NAME = shortNameMap;

// display mode map
const displayModeMap = {
  single: { text: 'Single' },
  dual: { text: 'Dual' },
};
export type DisplayModeMapKey = keyof typeof displayModeMap & string;
export const MAP_DISPLAY_MODE = displayModeMap;

// display content map
const displayContentMap = {
  dps: { text: 'DPS', data: { unit: 'DPS' } },
  hps: { text: 'HPS', data: { unit: 'HPS' } },
  swings: { text: 'Swings', data: { unit: 'SWS' } },
  deaths: { text: 'Deaths', data: { unit: 'DT' } },
  damagePct: { text: 'Damage', data: { unit: 'DMG' } },
  healsPct: { text: 'Heals', data: { unit: 'HLS' } },
  overHealPct: { text: 'Overheal', data: { unit: 'OH' } },
  shieldPct: { text: 'Shield', data: { unit: 'SLD' } },
};
export type DisplayContentMapKey = keyof typeof displayContentMap & string;
export const MAP_DISPLAY_CONTENT = displayContentMap;

// ticker map
const tickerMap = {
  healer: { text: 'OH/H/S' },
  'healer-reverse': { text: 'S/H/OH' },
  dps: { text: 'CD/C/D' },
  'dps-reverse': { text: 'D/C/CD' },
  none: { text: 'None' },
};
export type TickerMapKey = keyof typeof tickerMap & string;
export const MAP_TICKER = tickerMap;

// ticker align map
const tickerAlignMap = {
  left: { text: 'Left' },
  right: { text: 'Right' },
};
export type TickerAlignMapKey = keyof typeof tickerAlignMap & string;
export const MAP_TICKER_ALIGN = tickerAlignMap;

// bottom display map
const bottomDispMap = {
  maxhit: { text: 'Max Hit' },
  cdpcts: { text: 'CD/C/D' },
  'cdpcts-reverse': { text: 'D/C/CD' },
  none: { text: 'None' },
};
export type BottomDispMapKey = keyof typeof bottomDispMap & string;
export const MAP_BOTTOM_DISP = bottomDispMap;

// languages
import rawLang from '../lang';
export type LangMapKey = keyof typeof rawLang & string;
export const MAP_LANG = rawLang;

// font family map
const fontFamilyMap = {
  default: { text: 'Default' },
  misans: { text: 'MiSans' },
};
export type FontFamilyMapKey = keyof typeof fontFamilyMap & string;
export const MAP_FONT_FAMILY = fontFamilyMap;

// font weight map
const fontWeightMap = {
  light: { text: '300' },
  regular: { text: '400' },
  medium: { text: '500' },
};
export type FontWeightMapKey = keyof typeof fontWeightMap & string;
export const MAP_FONT_WEIGHT = fontWeightMap;

// themes map
import themes from '../themes';
export type ThemeMapKey = keyof typeof themes & string;
export const MAP_THEMES = themes;

// theme mode map
const themeModeMap = {
  role: { text: 'Role' },
  job: { text: 'Job' },
};
export type ThemeModeMapKey = keyof typeof themeModeMap & string;
export const MAP_THEME_MODE = themeModeMap;
