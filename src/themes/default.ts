import type { ColorsData, ColorsPreset } from '.';
import { DSRKafuU } from './authors';

// same colors in all presets
const commonColors: ColorsData = {
  common: [145, 145, 145, 0.5],
  self: [238, 238, 238, 0.65],
  ticker: {
    cd: [255, 165, 0, 0.9], // crit direct
    c: [255, 252, 103, 0.8], // crit
    d: [127, 243, 82, 0.8], // direct
    oh: [255, 102, 0, 0.7], // over healed
    h: [127, 243, 82, 0.8], // healed
    s: [82, 205, 243, 0.8], // shield
  },
};

// different color presets
export const presets: ColorsPreset[] = [
  {
    key: 'default',
    name: 'Default',
    data: {
      ...commonColors,
      jobtype: {
        dps: [232, 107, 121, 0.5],
        tank: [138, 162, 211, 0.6],
        heal: [123, 170, 23, 0.5],
      },
    },
  },
];

export default {
  name: 'Skyline Overlay',
  author: DSRKafuU,
  presets,
};
