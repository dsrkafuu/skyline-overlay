import type { ColorsData, ColorsPreset } from '.';
import { j0sh77 } from './authors';

// same colors in all presets
const commonColors: ColorsData = {
  common: [0, 0, 0, 0.3],
  self: [118, 118, 118, 1],
  ticker: {
    cd: [255, 111, 0, 0.7], // crit direct
    c: [255, 202, 40, 0.7], // crit
    d: [29, 233, 182, 0.7], // direct
    oh: [255, 102, 0, 0.7], // over healed
    h: [127, 243, 82, 0.8], // healed
    s: [82, 205, 243, 0.8], // shield
  },
  theme: {
    jbg: [255, 255, 255, 1],
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
        dps: [244, 67, 54, 0.5],
        tank: [32, 149, 243, 0.5],
        heal: [139, 195, 74, 0.5],
      },
    },
  },
];

export default {
  name: 'JRound',
  author: j0sh77,
  presets,
};
