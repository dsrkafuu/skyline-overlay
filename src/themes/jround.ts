import type { ColorsDataBasics, ColorsPreset } from '.';
import { j0sh77 } from './authors';

const commonColors: ColorsDataBasics = {
  common: [0, 0, 0, 0.3],
  self: [118, 118, 118, 1],
  ticker: {
    cd: [255, 111, 0, 0.7],
    c: [255, 202, 40, 0.7],
    d: [29, 233, 182, 0.7],
    oh: [255, 102, 0, 0.7],
    h: [127, 243, 82, 0.8],
    s: [82, 205, 243, 0.8],
  },
  theme: {
    fg: [255, 255, 255],
    bg: [0, 0, 0, 0.3],
    bga: [85, 85, 85],
  },
};

export const presets: ColorsPreset[] = [
  {
    key: 'default',
    name: 'Default',
    data: {
      ...commonColors,
      jobtype: {
        dps: [244, 67, 54, 0.5],
        tank: [32, 149, 243, 0.5],
        healer: [139, 195, 74, 0.5],
      },
    },
  },
];

export default {
  name: 'JRound',
  author: j0sh77,
  presets,
};
