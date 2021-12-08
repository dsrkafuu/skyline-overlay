import { observer } from 'mobx-react-lite';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import cn from 'classnames';
import { SList, SListRow } from '../components';
import { useStore, useTranslation } from '../hooks';
import { isCombatantData } from '../utils/type';
import { DisplayContentMapKey } from '../utils/constants';
import { useCallback, useMemo } from 'react';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  locked: boolean;
}

function CombatantDetail(
  { player, locked, ...props }: CombatantDetailProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const t = useTranslation();
  const { settings } = useStore();
  const { extendDetail, dispMode, dispContent, bottomDisp } = settings;

  // calculate top position according to tickerNum
  let tickerNum = 0;
  if (settings.ticker.top !== 'none') {
    tickerNum++;
  }
  if (settings.ticker.bottom !== 'none') {
    tickerNum++;
  }
  const baseTop = settings.dispMode === 'dual' ? 0.22 + 0.4 : 0.22 + 0.24; // name + content
  const topWithTick = (baseTop + tickerNum * 0.04).toFixed(2) + 'rem'; // + ticker

  const keyNotDisplayed = useCallback(
    (key: DisplayContentMapKey) =>
      (dispMode === 'single' && dispContent.right !== key) ||
      (dispMode === 'dual' &&
        dispContent.left !== key &&
        dispContent.right !== key),
    [dispContent.left, dispContent.right, dispMode]
  );

  // row data render props
  const rowItems = useMemo<SListRow[][]>(() => {
    const items: SListRow[][] = [[]];

    // dps related
    if (extendDetail && isCombatantData(player)) {
      items[items.length - 1].push(
        { key: '30s', value: player.last30DPS },
        { key: '60s', value: player.last60DPS }
      );
      items[items.length - 1].push({
        key: '60s',
        value: player.last60DPS,
      });
    }
    keyNotDisplayed('dps') &&
      items[items.length - 1].push({ key: 'DPS', value: player.dps });

    items[items.length - 1].length && items.push([]);
    // hps related
    keyNotDisplayed('hps') &&
      items[items.length - 1].push({ key: 'HPS', value: player.hps });
    if (isCombatantData(player)) {
      keyNotDisplayed('overHealPct') &&
        items[items.length - 1].push({
          key: t('Overheal'),
          value: player.overHealPct,
          pct: true,
        });
      keyNotDisplayed('shieldPct') &&
        items[items.length - 1].push({
          key: t('Shielded'),
          value: player.shieldPct,
          pct: true,
        });
    }

    items[items.length - 1].length && items.push([]);
    // damage and deaths
    if (isCombatantData(player)) {
      keyNotDisplayed('damagePct') &&
        items[items.length - 1].push({
          key: t('Damage'),
          value: player.damagePct,
          pct: true,
        });
      keyNotDisplayed('deaths') &&
        items[items.length - 1].push({
          key: t('Deaths'),
          value: player.deaths,
        });
    }

    items[items.length - 1].length && items.push([]);
    // C/D/CD
    if (isCombatantData(player)) {
      bottomDisp !== 'cdpcts' &&
        items[items.length - 1].push(
          { key: t('Direct'), value: player.directHitPct, pct: true },
          { key: t('Critical !'), value: player.critHitPct, pct: true },
          { key: t('DC !!!'), value: player.directCritHitPct, pct: true }
        );
    }

    items[items.length - 1].length && items.push([]);
    // max hit
    bottomDisp !== 'maxhit' &&
      player.maxHit &&
      items[items.length - 1].push({
        key: player.maxHit,
        value: isCombatantData(player) ? player.maxHitDamage : player.damage,
      });
    bottomDisp !== 'maxhit' &&
      player.maxHeal &&
      items[items.length - 1].push({
        key: player.maxHeal,
        value: isCombatantData(player) ? player.maxHealDamage : player.healed,
      });

    // remove unused spliter
    !items[items.length - 1].length && items.pop();
    return items;
  }, [bottomDisp, extendDetail, keyNotDisplayed, player, t]);

  return (
    <div
      className={cn(['combatant-detail', { locked }])}
      ref={ref}
      {...props}
      style={{ top: topWithTick }}
    >
      <SList items={rowItems} />
    </div>
  );
}

export default observer(CombatantDetail, { forwardRef: true });
