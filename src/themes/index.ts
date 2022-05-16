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
 * `jobtype` and `job` must be defined at least once,
 * `theme` is optional
 */
export interface ColorsData {
  common: RGBAColor;
  self: RGBAColor;
  ticker: {
    cd: RGBAColor;
    c: RGBAColor;
    d: RGBAColor;
    oh: RGBAColor;
    h: RGBAColor;
    s: RGBAColor;
  };
  jobtype?: {
    dps: RGBAColor;
    tank: RGBAColor;
    heal: RGBAColor;
  };
  job?: {
    [key: string]: RGBAColor;
  };
  theme?: {
    [key: string]: RGBAColor;
  };
}

export interface ColorsPreset {
  key: string;
  name: string;
  data: ColorsData;
}

const themes = {
  default: { text: _default.name, data: _default },
  horiz: { text: horiz.name, data: horiz },
  ikegami: { text: ikegami.name, data: ikegami },
  jround: { text: jround.name, data: jround },
};

export default themes;

const matchMap = new Map<string, ColorsData>();
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
    ret = matched.data;
    matchMap.set(key, ret);
  }
  return cloneDeep(ret);
}
