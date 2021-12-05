import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import { SSelectMap } from '../components';
import { isCombatantData } from '../utils/type';

interface CombatantBottomProps {
  player: CombatantData | LimitBreakData;
  mode: keyof SSelectMap;
}

function CombatantBottom({ player, mode = 'none' }: CombatantBottomProps) {
  if (mode === 'maxhit') {
    const maxHitDamage = isCombatantData(player)
      ? player.maxHitDamage
      : player.damage;
    const maxHealDamage = isCombatantData(player)
      ? player.maxHealDamage
      : player.healed;

    if (maxHitDamage) {
      return (
        <div className='combatant-bottom combatant-bottom--maxhit'>
          <span>&nbsp;{player.maxHit}&nbsp;</span>
          {maxHitDamage > 0 && <span>-&nbsp;{maxHitDamage}&nbsp;</span>}
        </div>
      );
    } else if (maxHealDamage) {
      return (
        <div className='combatant-bottom combatant-bottom--maxhit'>
          <span>&nbsp;{player.maxHeal}&nbsp;</span>
          {maxHealDamage > 0 && <span>-&nbsp;{maxHealDamage}&nbsp;</span>}
        </div>
      );
    }
  } else if (mode === 'cdpcts' && isCombatantData(player)) {
    const { directHitPct, critHitPct, directCritHitPct } = player;

    return (
      <div className='combatant-bottom combatant-bottom--cdpcts'>
        &nbsp;<span>{directCritHitPct}CD</span>
        &nbsp;<span>{critHitPct}D</span>
        &nbsp;<span>{directHitPct}C</span>&nbsp;
      </div>
    );
  }

  return null;
}

export default CombatantBottom;
