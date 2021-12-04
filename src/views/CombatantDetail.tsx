import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import cn from 'classnames';
import { SList, SListRow } from '../components';
import useStore from '../hooks/useStore';
import { isCombatantData } from '../utils/type';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  tickerNum: number; // how many tickers has
  locked: boolean;
}

function CombatantDetail(
  { player, tickerNum, locked, ...props }: CombatantDetailProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { t } = useTranslation();

  // calculate top position according to tickerNum
  let tickerValidNum = Math.floor(tickerNum);
  if (tickerValidNum < 0 || tickerValidNum > 2) {
    tickerValidNum = 0;
  }
  const top = (0.46 + tickerValidNum * 0.04).toFixed(2) + 'rem';

  // settings
  const { settings } = useStore();
  const { extendDetail } = settings;

  // row data render props
  const rowItems: SListRow[][] = [];

  // last 30 60 dps
  if (extendDetail && isCombatantData(player)) {
    rowItems.push([
      { key: '30s', value: player.last30DPS },
      { key: '60s', value: player.last60DPS },
      { key: 'DPS', value: player.dps },
    ]);
  }

  // overheal & hps
  if (isCombatantData(player)) {
    rowItems.push([
      { key: t('Heal'), value: player.hps },
      { key: t('Overheal'), value: player.overHealPct, pct: true },
      { key: 'Shield', value: player.shieldPct, pct: true },
    ]);
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
    <div
      className={cn(['combatant-detail', { locked }])}
      ref={ref}
      {...props}
      style={{ top }}
    >
      <SList items={rowItems} />
    </div>
  );
}

const CombatantDetailWithRef = observer(CombatantDetail, { forwardRef: true });

export default CombatantDetailWithRef;
