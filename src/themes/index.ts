import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';

import { RGBAColor } from "../utils/type";

interface Theme {
  text: string,
  colors?: RGBAColor[],
}

const themes: {[k: string]: Theme} = {
  'default': { text: 'Skyline Overlay' },
  horiz: { text: 'HORIZOVERLAY' },
  ikegami: { text: 'ikegami' },
  jround: { text: 'Jimmy Round', colors: [{r: 255, g: 0, b: 0, a: 1}, {r: 0, g: 255, b: 0, a: 1}] },
};

export default themes;
