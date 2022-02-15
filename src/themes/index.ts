import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';
import './simple.scss';

import { Author, authors } from "./authors";
import { RGBAColor } from "../utils/type";

interface Theme {
  text: string,
  data?: {
    author?: Author
  }
  colors?: {[k: string]: RGBAColor},
}

const themes: {[k: string]: Theme} = {
  default: { text: 'Skyline Overlay', data: { author: authors.DSRKafuU } },
  horiz: { text: 'HORIZOVERLAY', data: { author: authors.DSRKafuU } },
  ikegami: { text: 'ikegami', data: { author: authors.DSRKafuU } },
  jround: { 
    text: 'Round', 
    data: { author: authors.j0sh77 },
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
