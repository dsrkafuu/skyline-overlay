import React from 'react';

function CombatantTicker({ d, c, dc }) {
  return (
    <div className='combatant-ticker'>
      <span className='combatant-ticker-d' style={{ width: d }}></span>
      <span className='combatant-ticker-c' style={{ width: c }}></span>
      <span className='combatant-ticker-dc' style={{ width: dc }}></span>
    </div>
  );
}

export default CombatantTicker;
