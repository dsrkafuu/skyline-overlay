import './App.scss';
import { CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import Combatant from './views/Combatant';
import Encounter from './views/Encounter';
import Settings from './views/Settings';
import { useStore, useMock } from './hooks';
import { cloneDeep } from './utils/lodash';
import { fmtMergePet } from './utils/formatters';

function App() {
  // get data from store
  const {
    api: { combatant, lb, overlay },
    settings: {
      showCombatants,
      sort,
      playerLimit,
      showLB,
      petMergeID,
      opacity,
    },
  } = useStore();
  let players = cloneDeep(combatant);

  // debug mock data
  useMock(overlay, true);

  // merge pet if enabled
  if (petMergeID) {
    players = fmtMergePet(players, petMergeID);
  }

  // sort combatant
  players.sort((a, b) => sort.rule * (a[sort.key] - b[sort.key]));

  // limit combatants
  const temp = players;
  players = [];
  for (let i = 0; i < playerLimit; i++) {
    temp[i] && temp[i].name && players.push(temp[i]);
  }

  // add lb if enabled
  const playersWithLB: Array<CombatantData | LimitBreakData> = players;
  if (showLB && lb) {
    playersWithLB.push(cloneDeep(lb));
  }

  const opacityStyle: CSSProperties = {
    opacity: opacity >= 0.1 && opacity <= 1 ? opacity : 1,
  };

  return (
    <div className='app'>
      <div className='container' style={opacityStyle}>
        {showCombatants && Boolean(combatant) && combatant.length > 0 && (
          <div className='combatants'>
            {playersWithLB.map((player, index) => (
              <Combatant player={player} index={index} key={player.name} />
            ))}
          </div>
        )}
      </div>
      <div className='container' style={opacityStyle}>
        <Encounter />
      </div>
      <div className='container'>
        <Settings />
      </div>
    </div>
  );
}

export default observer(App);
