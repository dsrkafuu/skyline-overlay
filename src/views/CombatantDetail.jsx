import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import useStore from '@/hooks/useStore';

const CombatantDetail = observer(
  ({ player = {}, locked, ...props }, ref) => {
    const { t } = useTranslation();

    // settings
    const { settings } = useStore();
    const { minimalMode, showHPS, extendDetail } = settings;

    // data rendered
    const sections = useMemo(() => {
      // data props
      const {
        last30DPS,
        last60DPS,
        hps,
        overHealPct,
        directHitPct,
        critHitPct,
        directCritHitPct,
        damagePct,
        deaths,
        maxHit,
        maxHitDamage,
        maxHeal,
        maxHealDamage,
      } = player;

      const rowData = [];
      // last 30 60 dps
      extendDetail &&
        rowData.push([
          { key: '30s', ps: 'DPS', value: last30DPS },
          { key: '60s', ps: 'DPS', value: last60DPS },
        ]);
      // overheal & hps
      rowData.push([{ key: t('Overheal'), value: overHealPct, pct: true }]);
      !showHPS && rowData[rowData.length - 1].unshift({ key: t('Heal'), value: hps, ps: 'HPS' });
      // damage
      rowData.push([
        { key: t('Damage'), value: damagePct, pct: true },
        { key: t('Deaths'), value: deaths },
      ]);
      // c & d & cd
      rowData.push([
        { key: t('Direct'), value: directHitPct, pct: true },
        { key: t('Critical !'), value: critHitPct, pct: true },
        { key: t('DC !!!'), value: directCritHitPct, pct: true },
      ]);
      // max hit
      if (extendDetail) {
        rowData.push([]);
        maxHit && rowData[rowData.length - 1].push({ key: maxHit, value: maxHitDamage });
        maxHeal && rowData[rowData.length - 1].push({ key: maxHeal, value: maxHealDamage });
      }

      return rowData;
    }, [extendDetail, player, showHPS, t]);

    return (
      <div
        className={cn(['combatant-detail', { locked, minimal: minimalMode }])}
        ref={ref}
        {...props}
      >
        {sections.map((section, idx) => (
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
                      <span className='s-number'>{row.value?.split('%')[0]}</span>
                      <span className='s-counter'>%</span>
                    </div>
                  )) || <span>{row.value}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
  { forwardRef: true }
);
CombatantDetail.displayName = 'CombatantDetail';

export default CombatantDetail;
