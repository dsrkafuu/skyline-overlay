// overlay mount key on window
export const OVERLAY_INITED = '_SKYLINE_OVERLAY_INITED';
// callback function when data changed
export const OVERLAY_CALLBACK = '_SKYLINE_OVERLAY_CALLBACK';

// local storage key
export const STORAGE_KEY = `_SKYLINE_DATA_V2`;

// value maps for selection

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
  0: { text: 'First Last', data: { first: false, last: false } },
  1: { text: 'First L.', data: { first: false, last: true } },
  2: { text: 'F. Last', data: { first: true, last: false } },
  3: { text: 'F. L.', data: { first: true, last: true } },
};
export const MAP_SHORT_NAME = shortNameMap;

// themes map
import themes from '@/themes';
export const MAP_THEMES = themes;
