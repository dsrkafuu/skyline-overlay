import './default.scss';
import { DSRKafuU } from './support/authors';
import { Colors } from './support/colors';
import { ThemeItem } from './support/theme';

const commonColors = {
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
};

const roleColors: Colors = {
  ...commonColors,
  role: {
    dps: [232, 107, 121, 0.5],
    tank: [138, 162, 211, 0.6],
    healer: [123, 170, 23, 0.5],
  },
};

const jobColors: Colors = {
  ...commonColors,
  job: {
    pld: [168, 210, 230, 0.4],
    war: [207, 38, 33, 0.4],
    drk: [209, 38, 204, 0.4],
    gnb: [121, 109, 48, 0.4],
    whm: [255, 240, 220, 0.4],
    sch: [134, 87, 255, 0.4],
    ast: [255, 231, 74, 0.4],
    sge: [128, 160, 240, 0.4],
    mnk: [214, 156, 0, 0.4],
    drg: [65, 100, 205, 0.4],
    nin: [175, 25, 100, 0.4],
    sam: [228, 109, 4, 0.4],
    rpr: [150, 90, 144, 0.4],
    vpr: [216, 67, 21, 0.4],
    brd: [145, 186, 94, 0.4],
    mch: [110, 225, 214, 0.4],
    dnc: [226, 176, 175, 0.4],
    blm: [165, 121, 214, 0.4],
    smn: [45, 155, 120, 0.4],
    rdm: [232, 123, 123, 0.4],
    pct: [139, 202, 23, 0.4],
    blu: [0, 185, 247, 0.4],
  },
};

export default {
  text: 'Skyline Overlay',
  data: {
    author: DSRKafuU,
    colors: {
      role: roleColors,
      job: jobColors,
    },
  },
} as ThemeItem;
