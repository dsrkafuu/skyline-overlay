import React, { forwardRef } from 'react';

const CombatantBottom = forwardRef(({ player = {}, mode = 'none' }, ref) => {
  const { maxHit, maxHitDamage, directHitPct, critHitPct, directCritHitPct } = player;

  if (mode === 'maxhit') {
    return (
      <div className='combatant-grid-bottom maxhit' ref={ref}>
        <span>&nbsp;{maxHit}&nbsp;</span>
        {maxHitDamage > 0 && <span>-&nbsp;{maxHitDamage}&nbsp;</span>}
      </div>
    );
  } else if (mode === 'cdpcts' && directHitPct && critHitPct && directCritHitPct) {
    return (
      <div className='combatant-grid-bottom cdpcts' ref={ref}>
        &nbsp;<span>{directCritHitPct}CD</span>
        &nbsp;<span>{critHitPct}D</span>
        &nbsp;<span>{directHitPct}C</span>&nbsp;
      </div>
    );
  }

  return null;
});
CombatantBottom.displayName = 'CombatantBottom';

export default CombatantBottom;
