import { CombatantData, LimitBreakData } from '../api';
import clsx from 'clsx';
import { SList, SListRow } from '../components';
import { useAppSelector, useTranslation } from '../hooks';
import { isLimitBreakData } from '../utils/type';
import { DisplayContentMapKey } from '../utils/maps';
import { useCallback, useMemo } from 'react';
import { fmtNumber } from '../utils/formatters';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  color: string;
  lockDetail: boolean;
}

function CombatantDetail({ player, color, lockDetail }: CombatantDetailProps) {
  const t = useTranslation();
  const dispMode = useAppSelector((state) => state.settings.dispMode);
  const dispContent = useAppSelector((state) => state.settings.dispContent);
  const bottomDisp = useAppSelector((state) => state.settings.bottomDisp);
  const shortNumber = useAppSelector((state) => state.settings.shortNumber);
  const ticker = useAppSelector((state) => state.settings.ticker);
  const bigNumberMode = useAppSelector((state) => state.settings.bigNumberMode);

  // calculate top position according to tickerNum
  let tickerNum = 0;
  if (ticker.top !== 'none') {
    tickerNum++;
  }
  if (ticker.bottom !== 'none') {
    tickerNum++;
  }
  const baseTop = dispMode === 'dual' ? 0.22 + 0.4 : 0.22 + 0.24; // name + content
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
    if (isLimitBreakData(player)) {
      return [];
    }

    const items: SListRow[][] = [[]];

    // dps and hps
    keyNotDisplayed('dps') &&
      items[items.length - 1].push({
        key: 'DPS',
        value: fmtNumber(player.dps, shortNumber, bigNumberMode),
      });
    keyNotDisplayed('hps') &&
      items[items.length - 1].push({
        key: 'HPS',
        value: fmtNumber(player.hps, shortNumber, bigNumberMode),
      });
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

    items[items.length - 1].length && items.push([]);
    // damage and deaths
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

    items[items.length - 1].length && items.push([]);
    // C/D/CD
    bottomDisp !== 'cdpcts' &&
      items[items.length - 1].push(
        { key: t('Direct'), value: player.directHitPct, pct: true },
        { key: t('Critical !'), value: player.critHitPct, pct: true },
        { key: t('DC !!!'), value: player.directCritHitPct, pct: true }
      );

    items[items.length - 1].length && items.push([]);
    // max hit
    bottomDisp !== 'maxhit' &&
      player.maxHit &&
      items[items.length - 1].push({
        key: player.maxHit,
        value: fmtNumber(player.maxHitDamage, shortNumber, bigNumberMode),
      });

    // remove unused spliter
    !items[items.length - 1].length && items.pop();
    return items;
  }, [bottomDisp, bigNumberMode, keyNotDisplayed, player, shortNumber, t]);

  if (isLimitBreakData(player)) {
    return null;
  } else {
    return (
      <div
        className={clsx('combatant-detail', {
          'combatant-detail--locked': lockDetail,
        })}
        style={{
          top: topWithTick,
          backgroundColor: lockDetail ? color : 'var(--color-common)',
        }}
      >
        <SList items={rowItems} />
      </div>
    );
  }
}

export default CombatantDetail;
