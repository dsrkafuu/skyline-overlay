import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';
import './simple.scss';

import { RGBAColor } from "../utils/type";

interface Theme {
  text: string,
  colors?: {[k: string]: RGBAColor},
}

const themes: {[k: string]: Theme} = {
  'default': { text: 'Skyline Overlay' },
  horiz: { text: 'HORIZOVERLAY' },
  ikegami: { text: 'ikegami' },
  jround: { 
    text: 'Round', 
    colors: { 
      background: {r: 0, g: 0, b: 0, a: 0.3} 
    }
  },
  simple: {
    text: 'Simple',
    colors: {
      background: {r: 0, g: 0, b: 0, a: 0.3},
      foreground: {r: 255, g: 255, b: 255, a: 1},
      border: {r: 255, g: 255, b: 255, a: 1},
    }
  }
};

export default themes;
