// local storage key
export const STORAGE_PREFIX = 'SKYLINE_DATA_V2_';

// value maps for selection component

// languages
import rawLang from '@/lang';
const langMap = {};
Object.keys(rawLang).forEach((key) => {
  langMap[key] = {
    text: rawLang[key].translation.LANG, // no data needed, use kay as value/data
  };
});
export const MAP_LANG = langMap;

// short names map
const shortNameMap = {
  ff: { text: 'First Last', data: { first: false, last: false } },
  ft: { text: 'First L.', data: { first: false, last: true } },
  tf: { text: 'F. Last', data: { first: true, last: false } },
  tt: { text: 'F. L.', data: { first: true, last: true } },
};
export const MAP_SHORT_NAME = shortNameMap;

// themes map
import themes from '@/themes';
export const MAP_THEMES = themes;

// bottom display map
const bottomDispMap = {
  maxhit: { text: 'Max Hit' },
  cdpcts: { text: 'C/D/CD' },
  none: { text: 'None' },
};
export const MAP_BOTTOM_DISP = bottomDispMap;
