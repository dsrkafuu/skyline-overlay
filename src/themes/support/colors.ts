import themes from '..';
import { CSS_VARS_DOM_ID } from '../../utils/constants';
import { mergeDeep } from '../../utils/lodash';
import { ThemeMapKey, ThemeModeMapKey } from '../../utils/maps';

interface ColorsBasics {
  // common color
  common: RGBAColor;
  // self highlight color
  self: RGBAColor;
  // ticker colors
  ticker: {
    cd: RGBAColor; // crit direct
    c: RGBAColor; // crit
    d: RGBAColor; // direct
    oh: RGBAColor; // over healed
    h: RGBAColor; // healed
    s: RGBAColor; // shield
  };
  // theme customized colors
  theme?: {
    [key: string]: RGBAColor;
  };
}

interface ColorsWithRole extends ColorsBasics {
  role: {
    tank: RGBAColor;
    healer: RGBAColor;
    dps: RGBAColor;
  };
  job?: never;
}

interface ColorsWithJob extends ColorsBasics {
  job: {
    // tank
    pld: RGBAColor;
    war: RGBAColor;
    drk: RGBAColor;
    gnb: RGBAColor;
    // healer
    whm: RGBAColor;
    sch: RGBAColor;
    ast: RGBAColor;
    sge: RGBAColor;
    // melee
    mnk: RGBAColor;
    drg: RGBAColor;
    nin: RGBAColor;
    sam: RGBAColor;
    rpr: RGBAColor;
    // ranged
    brd: RGBAColor;
    mch: RGBAColor;
    dnc: RGBAColor;
    // magic
    blm: RGBAColor;
    smn: RGBAColor;
    rdm: RGBAColor;
    blu: RGBAColor;
  };
  role?: never;
}

export type Colors = ColorsWithRole | ColorsWithJob;

function rgba2css(color: RGBAColor) {
  if (color.length === 4) {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
  } else if (color.length === 3) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  } else {
    return 'transparent';
  }
}

export function applyColors(
  theme: ThemeMapKey,
  themeMode: ThemeModeMapKey,
  colors: DeepPartial<Colors>
) {
  const themeData = themes[theme].data;
  let themeColors = themeData.colors[themeMode];
  if (!themeColors) {
    themeColors = themeData.colors.role;
  }
  const fullColors = mergeDeep(themeColors, colors) as Colors;
  const { common, self } = fullColors;
  let css = `  --color-common: ${rgba2css(common)};\n`;
  css += `  --color-self: ${rgba2css(self)};\n`;
  const objKeys = ['ticker', 'role', 'job', 'theme'];
  for (const objKey of objKeys) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = fullColors[objKey as keyof Colors] as any;
    if (obj) {
      for (const varKey of Object.keys(obj)) {
        css += `  --color-${objKey}-${varKey}: ${rgba2css(obj[varKey])};\n`;
      }
    }
  }
  css = `body {\n${css}}`;
  const el = document.getElementById(CSS_VARS_DOM_ID);
  if (el) {
    el.innerHTML = css;
  } else {
    const newEl = document.createElement('style');
    newEl.id = CSS_VARS_DOM_ID;
    newEl.innerHTML = css;
    document.head.appendChild(newEl);
  }
}
