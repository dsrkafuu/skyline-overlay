import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Combatant, Encounter, Settings } from './views';
import useStore from './hooks/useStore';
import { isDev } from './utils/env';

function App() {
  const {
    api: { overlay },
  } = useStore();

  // debug mock data
  useEffect(() => {
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
  }, [overlay]);

  return (
    <>
      <div className='s-container'>
        <Combatant />
      </div>
      <div className='s-container'>
        <Encounter />
      </div>
      <div className='s-container'>
        <Settings />
      </div>
    </>
  );
}

export default observer(App);
