/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from './lodash';
import overlay from './overlay';

let int: number = -1;
let mockData: any = null;

export const startMock = async () => {
  let data = cloneDeep(mockData);
  if (!data) {
    const res = await fetch('/mock.json');
    const json = await res.json();
    data = cloneDeep(json);
    mockData = cloneDeep(json);
  }
  let mm = '0'.padStart(2, '0');
  let ss = '1'.padStart(2, '0');
  int = window.setInterval(() => {
    data.Encounter.duration = `${mm}:${ss}`;
    data.Encounter.encdps = 0;
    Object.keys(data.Combatant).forEach((idx) => {
      const rawDPS = data.Combatant[idx].encdps;
      const newDPS = +rawDPS
        ? (+rawDPS + (Math.random() - 0.5) * 100).toFixed(0)
        : (Math.random() * 10000).toFixed(0);
      data.Combatant[idx].encdps = newDPS;
      data.Encounter.encdps += Number(newDPS);
    });
    data.Encounter.encdps = `${data.Encounter.encdps}`;
    overlay.simulateData(data);
    if (+ss >= 60) {
      mm = `${+mm + 1}`.padStart(2, '0');
      ss = '0'.padStart(2, '0');
    } else {
      ss = `${+ss + 1}`.padStart(2, '0');
    }
  }, 1000);
};

export const stopMock = () => {
  clearInterval(int);
};
