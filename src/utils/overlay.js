import OverlayAPI from 'ffxiv-overlay-api';

import { OVERLAY_INITED, OVERLAY_CALLBACK } from './constants';
import { isDev } from './env';
import { logInfo } from './loggers';

const overlay = new OverlayAPI({
  extendData: true,
  silentMode: true,
});

// add listener callback
overlay.addListener('CombatData', (obj) => {
  if (window[OVERLAY_CALLBACK]) {
    window[OVERLAY_CALLBACK](obj.extendData);
  }
});
overlay.startEvent();

// mount overlay to window
window[OVERLAY_INITED] = overlay;
logInfo('api initialized');

// [DEBUG]
isDev() &&
  fetch('https://cdn.jsdelivr.net/gh/dsrkafuu/ffxiv-overlay-api@3/test/fake_cn.json')
    .then((res) => res.json())
    .then((obj) => {
      let time = 1;
      const int = setInterval(() => {
        obj.Encounter.duration = `00:${time < 10 ? '0' : ''}${time}`;
        obj.Encounter.encdps = 0;
        Object.keys(obj.Combatant).forEach((idx) => {
          const dps = (Math.random() * 20000).toFixed(0);
          obj.Combatant[idx].encdps = dps;
          obj.Encounter.encdps += Number(dps);
        });
        obj.Encounter.encdps = `${obj.Encounter.encdps}`;
        obj.Combatant['YOU'].name = obj.Combatant['光之战士一号'];
        obj.Combatant['YOU'].name = 'YOU';
        delete obj.Combatant['光之战士一号'];
        overlay.simulateData(obj);
        time++;
      }, 1000);
      setTimeout(() => clearInterval(int), 10 * 1000 + 500);
    });

export { overlay };
