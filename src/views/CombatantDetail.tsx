import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import cn from 'classnames';
import useStore from '../hooks/useStore';
import { isCombatantData } from '../utils/type';

interface CombatantDetailProps {
  player: CombatantData | LimitBreakData;
  locked: boolean;
}

interface RowDataRenderProps {
  key: string;
  value: React.ReactNode;
  ps?: 'DPS' | 'HPS';
  pct?: boolean;
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
  const rowData: RowDataRenderProps[][] = [];

  // last 30 60 dps
  if (extendDetail && isCombatantData(player)) {
    rowData.push([
      { key: '30s', ps: 'DPS', value: player.last30DPS },
      { key: '60s', ps: 'DPS', value: player.last60DPS },
    ]);
  }

  // overheal & hps
  if (isCombatantData(player)) {
    rowData.push([
      { key: t('Overheal'), value: player.overHealPct, pct: true },
    ]);
  }
  if (!showHPS) {
    const newRow: RowDataRenderProps = {
      key: t('Heal'),
      value: player.hps,
      ps: 'HPS',
    };
    if (rowData[rowData.length - 1]) {
      rowData[rowData.length - 1].unshift(newRow);
    } else {
      rowData.push([newRow]);
    }
  }

  if (isCombatantData(player)) {
    // damage
    rowData.push([
      { key: t('Damage'), value: player.damagePct, pct: true },
      { key: t('Deaths'), value: player.deaths },
    ]);

    // c & d & cd
    rowData.push([
      { key: t('Direct'), value: player.directHitPct, pct: true },
      { key: t('Critical !'), value: player.critHitPct, pct: true },
      { key: t('DC !!!'), value: player.directCritHitPct, pct: true },
    ]);
  }

  // max hit
  if (extendDetail) {
    rowData.push([]);
    player.maxHit &&
      rowData[rowData.length - 1].push({
        key: player.maxHit,
        value: isCombatantData(player) ? player.maxHitDamage : player.damage,
      });
    player.maxHeal &&
      rowData[rowData.length - 1].push({
        key: player.maxHeal,
        value: isCombatantData(player) ? player.maxHealDamage : player.healed,
      });
  }

  return (
    <div className={cn(['combatant-detail', { locked }])} ref={ref} {...props}>
      {rowData.map((section, idx) => (
        <div className='combatant-detail-section' key={idx}>
          {section.map((row) => (
            <div className='combatant-detail-row' key={row.key}>
              <span>{row.key}</span>
              {(row.ps && (
                <div className='combatant-detail-row-counter'>
                  <span className='s-number'>{row.value}</span>
                  <span className='s-counter'>{row.ps}</span>
                </div>
              )) ||
                (row.pct && (
                  <div className='combatant-detail-row-pct'>
                    <span className='s-number'>
                      {((row.value || '0') as string).split('%')[0]}
                    </span>
                    <span className='s-counter'>%</span>
                  </div>
                )) || <span>{row.value}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const CombatantDetailWithRef = observer(CombatantDetail, { forwardRef: true });

export default CombatantDetailWithRef;
