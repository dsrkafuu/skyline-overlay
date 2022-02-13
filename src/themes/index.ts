import { Theme } from "../types/configuration";
import authors from './authors';

import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';

const themes: {[k: string]: Theme} = {
  'default': { text: 'Skyline Overlay', data: { author: authors.DSRKafuU } },
  horiz: { text: 'HORIZOVERLAY', data: { author: authors.DSRKafuU } },
  ikegami: { text: 'ikegami', data: { author: authors.DSRKafuU } },
  jround: { text: 'Jimmy Round', data: { author: authors.j0sh77 }, colors: { background: {r: 0, g: 0, b: 0, a: 0.3} },
};

export default themes;
