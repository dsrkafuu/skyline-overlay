// local storage key
export const STORAGE_PREFIX = 'SKYLINE_V3_';

// value maps for selection component
import { SSelectMap } from '../components';

// languages
import rawLang from '../lang';
const langMap: SSelectMap = {};
(Object.keys(rawLang) as Array<keyof typeof rawLang>).forEach((key) => {
  langMap[key] = {
    text: rawLang[key].translation.LANG,
  };
});
export const MAP_LANG = langMap;

// short names map
interface ShortNameMap extends SSelectMap {
  [key: string]: {
    text: string;
    data: { first: boolean; last: boolean };
  };
}
const shortNameMap: ShortNameMap = {
  fstlst: { text: 'First Last', data: { first: false, last: false } },
  fstl: { text: 'First L.', data: { first: false, last: true } },
  flst: { text: 'F. Last', data: { first: true, last: false } },
  fl: { text: 'F. L.', data: { first: true, last: true } },
};
export const MAP_SHORT_NAME = shortNameMap;

// themes map
import themes from '../themes';
export const MAP_THEMES: SSelectMap = themes;

// bottom display map
const bottomDispMap: SSelectMap = {
  maxhit: { text: 'Max Hit' },
  cdpcts: { text: 'C/D/CD' },
  none: { text: 'None' },
};
export const MAP_BOTTOM_DISP = bottomDispMap;
