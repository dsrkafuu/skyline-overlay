import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';

import { RGBAColor } from "../utils/type";

interface Theme {
  text: string,
  colors?: {[k: string]: RGBAColor},
}

const themes: {[k: string]: Theme} = {
  'default': { text: 'Skyline Overlay' },
  horiz: { text: 'HORIZOVERLAY' },
  ikegami: { text: 'ikegami' },
  jround: { text: 'Jimmy Round', colors: { background: {r: 0, g: 0, b: 0, a: 0.3} }},
};

export default themes;
