import OverlayAPI from 'ffxiv-overlay-api';
import { useEffect } from 'react';

let inited = false;

/**
 * hook for init mock data
 */
function useMock(overlay: OverlayAPI, random = true) {
  useEffect(() => {
    if (inited) {
      return;
    }
    inited = true;
    if (import.meta.env.DEV) {
      fetch(
        'https://cdn.jsdelivr.net/gh/dsrkafuu/ffxiv-overlay-api@4/test/fake_cn.json'
      )
        .then((res) => res.json())
        .then((obj) => {
          if (random) {
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
              if (overlay && overlay.simulateData) {
                overlay.simulateData(obj);
              }
              time++;
            }, 1000);
            setTimeout(() => clearInterval(int), 10 * 1000 + 500);
          } else {
            overlay.simulateData(obj);
          }
        });
    }
  }, [overlay, random]);
}

export default useMock;
