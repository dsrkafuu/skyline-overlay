import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import './Combatant.scss';
import CombatantGrid from './CombatantGrid';

function Combatant() {
  // get combatant data from store
  const combatant = useSelector((state) => state.combat.combatant);

  // get sort settings
  const sortRule = useSelector((state) => state.settings.sortRule);
  const sortedCombatant = useMemo(
    () => [...combatant].sort((a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])),
    [combatant, sortRule.key, sortRule.value]
  );

  // limit player numbers and show lb
  const playerLimit = useSelector((state) => state.settings.playerLimit);
  const showLB = useSelector((state) => state.settings.showLB);
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

export default memo(Combatant);
