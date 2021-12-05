import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import { isCombatantData } from '../utils/type';

function parsePct(pct: string) {
  pct = `${pct}`.trim();
  const num = /^([0-9]+)%$/i.exec(pct);
  if (num && num[1] && Number(num[1]) > 0) {
    return pct;
  } else {
    return '0';
  }
}

interface CombatantTickerProps {
  player: CombatantData | LimitBreakData;
}

function CombatantTicker({ player }: CombatantTickerProps) {
  if (isCombatantData(player)) {
    const { directHitPct: d, critHitPct: c, directCritHitPct: dc } = player;

    return (
      <div className='combatant-ticker'>
        <span
          className='combatant-ticker-dc'
          style={{ width: parsePct(dc) }}
        ></span>
        <span
          className='combatant-ticker-c'
          style={{ width: parsePct(c) }}
        ></span>
        <span
          className='combatant-ticker-d'
          style={{ width: parsePct(d) }}
        ></span>
      </div>
    );
  }

  return (
    <div className='combatant-ticker'>
      <span className='combatant-ticker-dc' style={{ width: '0' }}></span>
      <span className='combatant-ticker-c' style={{ width: '0' }}></span>
      <span className='combatant-ticker-d' style={{ width: '0' }}></span>
    </div>
  );
}

export default CombatantTicker;
