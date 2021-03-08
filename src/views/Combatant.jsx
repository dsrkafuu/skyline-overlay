import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Combatant.scss';

import CombatantGrid from './CombatantGrid';
import useSettings from '@/hooks/useSettings';

function Combatant() {
  // get combatant data from store
  const combatant = useSelector((state) => state.combat.combatant);

  // get sort settings
  const [sortRule] = useSettings('sortRule');
  const sortedCombatant = [...combatant].sort(
    (a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])
  );

  // limit player numbers and show lb
  const [playerLimit] = useSettings('playerLimit');
  const [showLB] = useSettings('showLB');
  const dispCombatant = [];
  for (let i = 0; i < sortedCombatant.length; i++) {
    const p = sortedCombatant[i];
    if (p.name === 'Limit Break' && !p.job) {
      dispCombatant.LB = p;
    } else if (dispCombatant.length < playerLimit) {
      dispCombatant.push(p);
    }
  }
  if (showLB && dispCombatant.LB) {
    dispCombatant.push(dispCombatant.LB);
  }

  return (
    <Fragment>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {dispCombatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Combatant;
