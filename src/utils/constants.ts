// local storage key
export const STORAGE_PREFIX = 'SKYLINE_DATA_V2_';

// value maps for selection component

// languages
import rawLang from '../lang';

interface LanguageMap {
  [key: string]: { text: string };
}

const langMap: LanguageMap = {};
(Object.keys(rawLang) as Array<keyof typeof rawLang>).forEach((key) => {
  langMap[key] = {
    text: rawLang[key].translation.LANG, // no data needed, use kay as value/data
  };
});

export const MAP_LANG = langMap;

// short names map
interface ShortNameMap {
  [key: string]: { text: string; data: { first: boolean; last: boolean } };
}

const shortNameMap: ShortNameMap = {
  ff: { text: 'First Last', data: { first: false, last: false } },
  ft: { text: 'First L.', data: { first: false, last: true } },
  tf: { text: 'F. Last', data: { first: true, last: false } },
  tt: { text: 'F. L.', data: { first: true, last: true } },
};

export const MAP_SHORT_NAME = shortNameMap;

// themes map
import themes from '../themes';

interface ThemeMap {
  [key: string]: { text: string };
}

export const MAP_THEMES: ThemeMap = themes;

// bottom display map
interface BottomDisplayMap {
  [key: string]: { text: string };
}

const bottomDispMap: BottomDisplayMap = {
  maxhit: { text: 'Max Hit' },
  cdpcts: { text: 'C/D/CD' },
  none: { text: 'None' },
};

export const MAP_BOTTOM_DISP = bottomDispMap;
