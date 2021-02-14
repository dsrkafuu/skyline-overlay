import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Combatant.scss';

import CombatantGrid from './CombatantGrid';

function Combatant() {
  // get combatant data from store
  const combatant = useSelector((state) => state.combat.combatant);

  // get sort settings
  const sort = useSelector((state) => state.settings.sort);
  const sortedCombatant = [...combatant].sort((a, b) => {
    // move lb to the end
    if (!a.job) return 1;
    if (!b.job) return -1;
    return sort.rule * (a[sort.key] - b[sort.key]);
  });

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
