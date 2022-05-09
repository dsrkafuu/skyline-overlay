import type { ColorsData, ColorsPreset } from '.';
import { DSRKafuU } from './authors';

// same colors in all presets
const commonColors: ColorsData = {
  unknown: [64, 64, 64, 1],
  self: [118, 118, 118, 1],
  ticker: {
    cd: [255, 111, 0, 1], // crit direct
    c: [255, 202, 40, 1], // crit
    d: [29, 233, 182, 1], // direct
    oh: [229, 57, 53, 1], // over healed
    h: [0, 230, 118, 1], // healed
    s: [64, 196, 255, 1], // shield
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
        dps: [189, 15, 73, 1],
        tank: [23, 124, 207, 1],
        heal: [95, 153, 51, 1],
      },
    },
  },
  {
    key: 'colorful',
    name: 'Colorful',
    data: {
      ...commonColors,
      job: {
        smn: [0, 0, 0, 1],
        mnk: [0, 0, 0, 1],
      },
    },
  },
];

export default {
  name: 'ikegami',
  author: DSRKafuU,
  presets,
};
