import React, { memo, forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { fmtNumber } from '@/utils/formatters';

const CombatantDetail = memo(
  forwardRef(({ player, locked, ...props }, ref) => {
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
        overHeal,
        overHealPct,
        directHits,
        directHitPct,
        critHits,
        critHitPct,
        directCritHits,
        directCritHitPct,
        damage,
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
      rowData.push([
        { key: '过量', value: showHPS ? overHeal : fmtNumber(overHeal), pct: overHealPct },
      ]);
      !showHPS && rowData[rowData.length - 1].unshift({ key: '治疗', value: hps, ps: 'HPS' });
      // c & d & cd
      rowData.push([
        { key: '直击', value: directHits, pct: directHitPct },
        { key: '暴击', value: critHits, pct: critHitPct },
        { key: '直暴', value: directCritHits, pct: directCritHitPct },
      ]);
      // damage
      rowData.push([{ key: '伤害', value: showHPS ? damage : fmtNumber(damage), pct: damagePct }]);
      if (extendDetail) {
        maxHit && rowData[rowData.length - 1].push({ key: maxHit, value: maxHitDamage });
        maxHeal && rowData[rowData.length - 1].push({ key: maxHeal, value: maxHealDamage });
      }

      return rowData;
    }, [extendDetail, player, showHPS]);

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
                        <span className='s-number'>{row.value}</span>
                        <span className='s-counter'>{row.pct}</span>&nbsp;
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
