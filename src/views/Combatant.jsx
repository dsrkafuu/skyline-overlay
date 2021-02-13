import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Combatant.scss';

import CombatantGrid from './CombatantGrid';

function Combatant() {
  // get combatant data from store
  const combatant = useSelector((state) => state.combat.combatant);

  return (
    <Fragment>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {combatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Combatant;
