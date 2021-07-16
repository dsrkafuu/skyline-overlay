import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import './Combatant.scss';
import CombatantGrid from './CombatantGrid';
import useStore from '@/hooks/useStore';

function Combatant() {
  // get data from store
  const {
    combat: { combatant },
    settings: { sortRule, playerLimit, showLB },
  } = useStore();

  // parse sort settings
  const sortedCombatant = useMemo(
    () => [...combatant].sort((a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])),
    [combatant, sortRule]
  );

  // limit player numbers and show lb
  const dispCombatant = useMemo(() => {
    const res = [];
    for (let i = 0; i < sortedCombatant.length; i++) {
      const p = sortedCombatant[i];
      if (p.name === 'Limit Break' && !p.job) {
        res.LB = p;
      } else if (res.length < playerLimit) {
        res.push(p);
      }
    }
    if (showLB && res.LB) {
      res.push(res.LB);
    }
    return res;
  }, [playerLimit, showLB, sortedCombatant]);

  return (
    <>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {dispCombatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </>
  );
}

export default observer(Combatant);
