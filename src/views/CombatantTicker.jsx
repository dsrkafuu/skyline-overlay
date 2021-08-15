import React, { memo, useCallback } from 'react';

const CombatantTicker = memo(({ d, c, dc }) => {
  /**
   * @param {string} pct
   * @returns {string|number}
   */
  const parsePct = useCallback((pct) => {
    pct = `${pct}`.trim();
    const num = /^([0-9]+)%$/i.exec(pct);
    if (num && num[1] && Number(num[1]) > 0) {
      return pct;
    } else {
      return 0;
    }
  }, []);

  return (
    <div className='combatant-ticker'>
      <span className='combatant-ticker-d' style={{ width: parsePct(d) }}></span>
      <span className='combatant-ticker-c' style={{ width: parsePct(c) }}></span>
      <span className='combatant-ticker-dc' style={{ width: parsePct(dc) }}></span>
    </div>
  );
});
CombatantTicker.displayName = 'CombatantTicker';

export default CombatantTicker;
