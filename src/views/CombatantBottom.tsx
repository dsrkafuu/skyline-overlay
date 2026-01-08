import { CombatantData, LimitBreakData } from '@/api';
import { useAppSelector } from '@/hooks';
import { fmtNumber } from '@/utils/formatters';
import { BottomDispMapKey } from '@/utils/maps';
import { isCombatantData } from '@/utils/type';

interface CombatantBottomProps {
  player: CombatantData | LimitBreakData;
  mode: BottomDispMapKey;
}

function CombatantBottom({ player, mode = 'none' }: CombatantBottomProps) {
  const shortNumber = useAppSelector((state) => state.settings.shortNumber);
  const bigNumberMode = useAppSelector((state) => state.settings.bigNumberMode);

  if (mode === 'maxhit') {
    const maxHitDamage = isCombatantData(player)
      ? player.maxHitDamage
      : player.damage;
    const maxHealDamage = isCombatantData(player)
      ? player.maxHealDamage
      : player.healed;

    if (maxHitDamage) {
      return (
        <div className='combatant-bottom combatant-bottom-maxhit'>
          <span>&nbsp;{player.maxHit}&nbsp;</span>
          {maxHitDamage > 0 && (
            <span>
              -&nbsp;{fmtNumber(maxHitDamage, shortNumber, bigNumberMode)}&nbsp;
            </span>
          )}
        </div>
      );
    } else if (maxHealDamage) {
      return (
        <div className='combatant-bottom combatant-bottom-maxhit'>
          <span>&nbsp;{player.maxHeal}&nbsp;</span>
          {maxHealDamage > 0 && (
            <span>
              -&nbsp;{fmtNumber(maxHealDamage, shortNumber, bigNumberMode)}
              &nbsp;
            </span>
          )}
        </div>
      );
    }
  } else if (mode === 'last60DPS' && isCombatantData(player)) {
    const { last60DPS } = player;

    return (
      <div className='combatant-bottom combatant-bottom-dps'>
        &nbsp;<span className='g-number'>{last60DPS}</span>
        &nbsp;<span className='g-counter'>DPS60</span>&nbsp;
      </div>
    );
  } else if (mode === 'cdpcts' && isCombatantData(player)) {
    const { directHitPct, critHitPct, directCritHitPct } = player;

    return (
      <div className='combatant-bottom combatant-bottom-cdpcts'>
        &nbsp;<span>{directCritHitPct}CD</span>
        &nbsp;<span>{critHitPct}C</span>
        &nbsp;<span>{directHitPct}D</span>&nbsp;
      </div>
    );
  } else if (mode === 'cdpcts-reverse' && isCombatantData(player)) {
    const { directHitPct, critHitPct, directCritHitPct } = player;

    return (
      <div className='combatant-bottom combatant-bottom-cdpcts'>
        &nbsp;<span>{directHitPct}D</span>
        &nbsp;<span>{critHitPct}C</span>
        &nbsp;<span>{directCritHitPct}CD</span>&nbsp;
      </div>
    );
  }

  return <div className='combatant-bottom'></div>;
}

export default CombatantBottom;
