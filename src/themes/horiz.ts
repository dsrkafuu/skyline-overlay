import './horiz.scss';
import { DSRKafuU } from './support/authors';
import { Colors } from './support/colors';
import { ThemeItem } from './support/theme';

const roleColors: Colors = {
  common: [0, 0, 0, 0.3],
  self: [255, 255, 255, 0.8],
  ticker: {
    cd: [255, 111, 0, 0.7],
    c: [255, 202, 40, 0.7],
    d: [29, 233, 182, 0.7],
    oh: [255, 102, 0, 0.7],
    h: [127, 243, 82, 0.8],
    s: [82, 205, 243, 0.8],
  },
  role: {
    dps: [244, 67, 54, 0.5],
    tank: [32, 149, 243, 0.5],
    healer: [139, 195, 74, 0.5],
  },
};

export default {
  text: 'HORIZOVERLAY',
  data: {
    author: DSRKafuU,
    colors: {
      role: roleColors,
    },
  },
} as ThemeItem;
