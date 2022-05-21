import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';

import _default from './default';
import horiz from './horiz';
import ikegami from './ikegami';
import jround from './jround';
import { ThemeMapKey } from '../utils/maps';
import { cloneDeep } from '../utils/lodash';

/**
 * colors data in presets,
 * `jobtype` and `job` can only defined once,
 * `theme` is optional
 */
export interface ColorsDataBasics {
  common: RGBAColor;
  self: RGBAColor;
  ticker: {
    cd: RGBAColor; // crit direct
    c: RGBAColor; // crit
    d: RGBAColor; // direct
    oh: RGBAColor; // over healed
    h: RGBAColor; // healed
    s: RGBAColor; // shield
  };
  theme?: {
    [key: string]: RGBAColor;
  };
}
interface ColorsDataWithJobType extends ColorsDataBasics {
  job?: never;
  jobtype: {
    dps: RGBAColor;
    tank: RGBAColor;
    healer: RGBAColor;
  };
}
interface ColorsDataWithJob extends ColorsDataBasics {
  jobtype?: never;
  job: {
    pld: RGBAColor; // tank
    war: RGBAColor;
    drk: RGBAColor;
    gnb: RGBAColor;
    whm: RGBAColor; // healer
    sch: RGBAColor;
    ast: RGBAColor;
    sge: RGBAColor;
    mnk: RGBAColor; // melee
    drg: RGBAColor;
    nin: RGBAColor;
    sam: RGBAColor;
    rpr: RGBAColor;
    brd: RGBAColor; // ranged
    mch: RGBAColor;
    dnc: RGBAColor;
    blm: RGBAColor; // magic
    smn: RGBAColor;
    rdm: RGBAColor;
    blu: RGBAColor;
  };
}

export type ColorsData = ColorsDataWithJobType | ColorsDataWithJob;

export interface ColorsPreset {
  key: string;
  name: string;
  data: ColorsData;
}

const matchMap = new Map<string, ColorsPreset>();
/**
 *
 */
export function matchPreset(theme: ThemeMapKey, preset: string) {
  const key = `${theme}|${preset}`;
  let ret = matchMap.get(key);
  if (!ret) {
    const presets = themes[theme].data.presets;
    let matched = presets.find((item) => item.key === preset);
    if (!matched) {
      matched = presets[0];
    }
    ret = matched;
    matchMap.set(key, ret);
  }
  return cloneDeep(ret);
}

const themes = {
  default: { text: _default.name, data: _default },
  horiz: { text: horiz.name, data: horiz },
  ikegami: { text: ikegami.name, data: ikegami },
  jround: { text: jround.name, data: jround },
};

export default themes;
