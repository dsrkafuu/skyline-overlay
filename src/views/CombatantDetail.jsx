import React, { memo, forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const CombatantDetail = memo(
  forwardRef(({ player, locked, ...props }, ref) => {
    const { t } = useTranslation(); // i18n

    // settings
    const showHPS = useSelector((state) => state.settings.showHPS);
    const extendDetail = useSelector((state) => state.settings.extendDetail);

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
      rowData.push([{ key: t('Damage'), value: damagePct, pct: true }]);
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
      <div className={classNames(['combatant-detail', { locked }])} ref={ref} {...props}>
        <div className='combatant-detail-inner'>
          {sections.map((section, idx) => (
            <div className='combatant-detail-section' key={idx}>
              {section.map((row) => (
                <div className='combatant-detail-row' key={row.key}>
                  <span>&nbsp;{row.key}&nbsp;</span>
                  {(row.ps && (
                    <div className='combatant-detail-row-counter'>
                      <span className='s-number'>{row.value}</span>
                      <span className='s-counter'>{row.ps}</span>&nbsp;
                    </div>
                  )) ||
                    (row.pct && (
                      <div className='combatant-detail-row-pct'>
                        <span className='s-number'>{row.value?.split('%')[0]}</span>
                        <span className='s-counter'>%</span>&nbsp;
                      </div>
                    )) || <span>{row.value}&nbsp;</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  })
);

CombatantDetail.displayName = 'CombatantDetail';
CombatantDetail.propTypes = {
  player: PropTypes.object.isRequired,
  locked: PropTypes.bool.isRequired,
};

export default CombatantDetail;
