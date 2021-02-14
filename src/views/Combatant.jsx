import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Combatant.scss';

import CombatantGrid from './CombatantGrid';

function Combatant() {
  // get combatant data from store
  const combatant = useSelector((state) => state.combat.combatant);

  // get sort settings
  const sortRule = useSelector((state) => state.settings.sortRule);
  const sortedCombatant = [...combatant].sort(
    (a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])
  );

  return (
    <Fragment>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {sortedCombatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Combatant;
