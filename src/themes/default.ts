import type { ColorsDataBasics, ColorsPreset } from '.';
import { DSRKafuU } from './authors';

const commonColors: ColorsDataBasics = {
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

export const presets: ColorsPreset[] = [
  {
    key: 'default',
    name: 'Default',
    data: {
      ...commonColors,
      jobtype: {
        dps: [232, 107, 121, 0.5],
        tank: [138, 162, 211, 0.6],
        healer: [123, 170, 23, 0.5],
      },
    },
  },
];

export default {
  name: 'Skyline Overlay',
  author: DSRKafuU,
  presets,
};
