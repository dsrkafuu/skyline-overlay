import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import './Combatant.scss';
import CombatantGrid from './CombatantGrid';
import useStore from '@/hooks/useStore';

function Combatant() {
  // get data from store
  const {
    api: { combatant, lb },
    settings: { sortRule, playerLimit, showLB },
  } = useStore();

  // parse combatant settings
  const sortedCombatant = useMemo(() => {
    const sorted = [...combatant].sort(
      (a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])
    );
    const res = [];
    for (let i = 0; i < playerLimit; i++) {
      sorted[i] && sorted[i].name && res.push(sorted[i]);
    }
    if (showLB && lb && lb.name === 'Limit Break') {
      res.push(lb);
    }
    return res;
  }, [combatant, lb, playerLimit, showLB, sortRule]);

  return (
    <>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {sortedCombatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </>
  );
}

export default observer(Combatant);
