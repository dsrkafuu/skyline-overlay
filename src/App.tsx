import './App.scss';
import clsx from 'clsx';
import { CSSProperties, useMemo } from 'react';

import { CombatantData, LimitBreakData } from './api';
import { useAppSelector } from './hooks';
import SW from './SW';
import { fmtMergePet } from './utils/formatters';
import { cloneDeep } from './utils/lodash';
import Combatant from './views/Combatant';
import Encounter from './views/Encounter';
import Settings from './views/Settings';

function App() {
  const shouldCrash = import.meta.env.DEV && /crash=[^0&]/i.test(window.location.search);
  if (shouldCrash) {
    throw new Error('ErrorBoundary Test Error');
  }

  const showCombatants = useAppSelector((state) => state.settings.showCombatants);
  const sort = useAppSelector((state) => state.settings.sort);
  const playerLimit = useAppSelector((state) => state.settings.playerLimit);
  const showLB = useAppSelector((state) => state.settings.showLB);
  const petMergeID = useAppSelector((state) => state.settings.petMergeID);
  const opacity = useAppSelector((state) => state.settings.opacity);
  const playerPerRow = useAppSelector((state) => state.settings.playerPerRow);
  const layoutMode = useAppSelector((state) => state.settings.layoutMode);

  // get data from store
  const data = useAppSelector((state) => state.api.data);
  const lockedData = useAppSelector((state) => state.api.lockedData);

  const combatant = (lockedData || data).combatant;
  const playersWithLB = useMemo<Array<CombatantData | LimitBreakData>>(() => {
    const { combatant, limitBreak } = cloneDeep(lockedData || data);
    let players = combatant;
    // merge pet if enabled
    if (petMergeID) {
      players = fmtMergePet(players, petMergeID);
    }
    // sort combatant
    players.sort((a, b) => sort.rule * (a[sort.key] - b[sort.key]));
    // limit combatants
    const limited: CombatantData[] = [];
    for (let i = 0; i < playerLimit; i++) {
      if (players[i] && players[i].name) {
        limited.push(players[i]);
      }
    }
    // add LB if enabled
    const result: Array<CombatantData | LimitBreakData> = limited;
    if (showLB && limitBreak) {
      result.push(limitBreak);
    }
    return result;
  }, [data, lockedData, petMergeID, sort, playerLimit, showLB]);

  const opacityStyle: CSSProperties = {
    opacity: opacity >= 0.1 && opacity <= 1 ? opacity : 1,
  };

  return (
    <div
      className={clsx({
        app: true,
        'app-reverse': layoutMode === 'reverse',
      })}
    >
      <div className='container' style={opacityStyle}>
        {showCombatants && Boolean(combatant) && combatant.length > 0 && (
          <div className='combatants' style={{ width: `${playerPerRow * 1.26 + 0.01}rem` }}>
            {playersWithLB.map((player, index) => (
              <Combatant player={player} index={index} key={player.name} />
            ))}
          </div>
        )}
      </div>
      {layoutMode === 'reverse' && (
        <div className='container'>
          <SW />
        </div>
      )}
      <div className='container' style={opacityStyle}>
        <Encounter />
      </div>
      {layoutMode !== 'reverse' && (
        <div className='container'>
          <SW />
        </div>
      )}
      <div className='container'>
        <Settings />
      </div>
    </div>
  );
}

export default App;
