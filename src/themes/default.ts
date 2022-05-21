import './default.scss';
import { Colors } from './support/colors';
import { DSRKafuU } from './support/authors';
import { ThemeItem } from './support/theme';

const roleColors: Colors = {
  common: [145, 145, 145, 0.5],
  self: [238, 238, 238, 0.65],
  ticker: {
    cd: [255, 165, 0, 0.9],
    c: [255, 252, 103, 0.8],
    d: [127, 243, 82, 0.8],
    oh: [255, 102, 0, 0.7],
    h: [127, 243, 82, 0.8],
    s: [82, 205, 243, 0.8],
  },
  role: {
    dps: [232, 107, 121, 0.5],
    tank: [138, 162, 211, 0.6],
    healer: [123, 170, 23, 0.5],
  },
};

export default {
  text: 'Skyline Overlay',
  data: {
    author: DSRKafuU,
    colors: {
      role: roleColors,
    },
  },
} as ThemeItem;
