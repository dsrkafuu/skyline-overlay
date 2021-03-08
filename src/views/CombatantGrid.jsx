import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import * as jobIcons from '@/assets/icons';

function CombatantGrid({ player, index }) {
  // get data
  const { jobType, job, name, dps, maxHit, maxHitDamage } = player;

  // computed data
  const showRanks = useSelector((state) => state.settings.showRanks);
  const hlYou = useSelector((state) => state.settings.hlYou);
  const youName = useSelector((state) => state.settings.youName);
  const shortName = useSelector((state) => state.settings.shortName);

  // display name
  let dispName = name;
  dispName === 'YOU' && (dispName = youName); // if custom name
  dispName === '' && (dispName = 'YOU'); // prevent empty
  // checker whether to shorten
  const splitName = dispName.split(' ');
  if (splitName.length === 2) {
    shortName.first && splitName[0].charAt(0) && (splitName[0] = `${splitName[0].charAt(0)}.`);
    shortName.last && splitName[1].charAt(0) && (splitName[1] = `${splitName[1].charAt(0)}.`);
    dispName = splitName.join(' ');
  }
  // apply ranks if
  showRanks && (dispName = `${index + 1}. ${dispName}`); // if show ranks

  // class names related to job
  const jobClass = [
    `job-${jobType || 'others'}`, // job
    { 'job-self': hlYou && name === 'YOU' }, // highlight
  ];

  return (
    <div className={classNames('combatant-grid', jobClass)}>
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
