// local storage key
export const STORAGE_PREFIX = 'SKYLINE_V3_';

// value maps for selection component

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

// bottom display map
const bottomDispMap = {
  maxhit: { text: 'Max Hit' },
  cdpcts: { text: 'C/D/CD' },
  none: { text: 'None' },
};
export type BottomDispMapKey = keyof typeof bottomDispMap & string;
export const MAP_BOTTOM_DISP = bottomDispMap;

// languages
import rawLang from '../lang';
export type LangMapKey = keyof typeof rawLang & string;
export const MAP_LANG = rawLang;

// themes map
import themes from '../themes';
export type ThemeMapKey = keyof typeof themes & string;
export const MAP_THEMES = themes;
