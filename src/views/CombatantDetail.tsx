import { observer } from 'mobx-react-lite';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import clsx from 'clsx';
import { SList, SListRow } from '../components';
import { useStore, useTranslation } from '../hooks';
import { isLimitBreakData } from '../utils/type';
import { DisplayContentMapKey } from '../utils/constants';
import { useCallback, useMemo } from 'react';
import { fmtNumber } from '../utils/formatters';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  lockDetail: boolean;
}

function CombatantDetail({ player, lockDetail }: CombatantDetailProps) {
  const t = useTranslation();
  const { settings } = useStore();
  const { dispMode, dispContent, bottomDisp, shortNumber } = settings;

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
    if (isLimitBreakData(player)) {
      return [];
    }

    const items: SListRow[][] = [[]];

    // dps and hps
    keyNotDisplayed('dps') &&
      items[items.length - 1].push({
        key: 'DPS',
        value: fmtNumber(shortNumber, player.dps),
      });
    keyNotDisplayed('hps') &&
      items[items.length - 1].push({
        key: 'HPS',
        value: fmtNumber(shortNumber, player.hps),
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
        value: fmtNumber(shortNumber, player.maxHitDamage),
      });
    bottomDisp !== 'maxhit' &&
      player.maxHeal &&
      items[items.length - 1].push({
        key: player.maxHeal,
        value: fmtNumber(shortNumber, player.maxHealDamage),
      });

    // remove unused spliter
    !items[items.length - 1].length && items.pop();
    return items;
  }, [bottomDisp, keyNotDisplayed, player, shortNumber, t]);

  if (isLimitBreakData(player)) {
    return null;
  } else {
    return (
      <div
        className={clsx('combatant-detail', {
          'combatant-detail--locked': lockDetail,
        })}
        style={{ top: topWithTick }}
      >
        <SList items={rowItems} />
      </div>
    );
  }
}

export default observer(CombatantDetail);
