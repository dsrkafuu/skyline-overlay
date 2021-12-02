import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import cn from 'classnames';
import { SList, SListRow } from '../components';
import useStore from '../hooks/useStore';
import { isCombatantData } from '../utils/type';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  locked: boolean;
}

function CombatantDetail(
  { player, locked, ...props }: CombatantDetailProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { t } = useTranslation();

  // settings
  const { settings } = useStore();
  const { showHPS, extendDetail } = settings;

  // row data render props
  const rowItems: SListRow[][] = [];

  // last 30 60 dps
  if (extendDetail && isCombatantData(player)) {
    rowItems.push([
      { key: '30s', value: player.last30DPS },
      { key: '60s', value: player.last60DPS },
    ]);
  }

  // overheal & hps
  if (isCombatantData(player)) {
    rowItems.push([
      { key: t('Overheal'), value: player.overHealPct, pct: true },
    ]);
  }
  if (!showHPS) {
    const newRow: SListRow = {
      key: t('Heal'),
      value: player.hps,
    };
    if (rowItems[rowItems.length - 1]) {
      rowItems[rowItems.length - 1].unshift(newRow);
    } else {
      rowItems.push([newRow]);
    }
  }

  if (isCombatantData(player)) {
    // damage
    rowItems.push([
      { key: t('Damage'), value: player.damagePct, pct: true },
      { key: t('Deaths'), value: player.deaths },
    ]);

    // c & d & cd
    rowItems.push([
      { key: t('Direct'), value: player.directHitPct, pct: true },
      { key: t('Critical !'), value: player.critHitPct, pct: true },
      { key: t('DC !!!'), value: player.directCritHitPct, pct: true },
    ]);
  }

  // max hit
  if (extendDetail) {
    rowItems.push([]);
    player.maxHit &&
      rowItems[rowItems.length - 1].push({
        key: player.maxHit,
        value: isCombatantData(player) ? player.maxHitDamage : player.damage,
      });
    player.maxHeal &&
      rowItems[rowItems.length - 1].push({
        key: player.maxHeal,
        value: isCombatantData(player) ? player.maxHealDamage : player.healed,
      });
  }

  return (
    <div className={cn(['combatant-detail', { locked }])} ref={ref} {...props}>
      <SList items={rowItems} />
    </div>
  );
}

const CombatantDetailWithRef = observer(CombatantDetail, { forwardRef: true });

export default CombatantDetailWithRef;
