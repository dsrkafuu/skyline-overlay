import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './CombatantGrid.scss';

import * as jobIcons from '@/assets/icons';

function CombatantGrid({ player, index }) {
  // get data
  const { jobType, job, name, dps, maxHit, maxHitDamage } = player;

  // computed data
  const showRanks = useSelector((state) => state.settings.showRanks);
  const youName = useSelector((state) => state.settings.youName);

  // display name (YOU and ranks)
  let dispName = name;
  dispName === 'YOU' && (dispName = youName); // if custom name
  dispName === '' && (dispName = 'YOU'); // prevent empty
  showRanks && (dispName = `${index}. ${dispName}`); // if show ranks

  return (
    <div className={classNames('combatant-grid', `job-${jobType || 'other'}`)}>
      <div className='id'>{dispName}</div>
      <div className='content'>
        <span className='job-icon'>
          <img src={jobIcons[job] || jobIcons.ffxiv} />
        </span>
        <div className='data'>
          <span className='s-number'>{dps || 0}</span>
          <span className='s-counter'>DPS</span>
        </div>
      </div>
      <div className='maxhit'>
        <span>&nbsp;{maxHit}&nbsp;</span>
        {maxHitDamage > 0 && <span>-&nbsp;{maxHitDamage}&nbsp;</span>}
      </div>
    </div>
  );
}

CombatantGrid.propTypes = {
  player: PropTypes.shape({
    jobType: PropTypes.string,
    job: PropTypes.string,
    name: PropTypes.string.isRequired,
    dps: PropTypes.number.isRequired,
    maxHit: PropTypes.string,
    maxHitDamage: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CombatantGrid;
