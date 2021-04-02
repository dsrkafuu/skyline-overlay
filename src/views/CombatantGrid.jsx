import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as jobIcons from '@/assets/icons';
import useSettings from '@/hooks/useSettings';
import { fmtNumber } from '@/utils/formatters';

function CombatantGrid({ player, index }) {
  // get data
  const { jobType, job, name, dps, hps, maxHit, maxHitDamage } = player;
  const gridClass = ['combatant-grid']; // grid classnames

  // display name
  const [youName] = useSettings('youName');
  const [shortName] = useSettings('shortName');
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
  const [blurName] = useSettings('blurName');

  // apply ranks if
  const [showRanks] = useSettings('showRanks');
  showRanks && (dispName = `${index + 1}. ${dispName}`); // if show ranks

  // class names related to job
  const [hlYou] = useSettings('hlYou');
  gridClass.push(`job-${jobType || 'others'}`); // job
  gridClass.push({ 'job-self': hlYou && name === 'YOU' }); // highlight

  // sub display prop
  const [showHPS] = useSettings('showHPS');
  gridClass.push({ 'combatant-grid-extend': showHPS }); // extended grid

  return (
    <div className={classNames(...gridClass)}>
      <div className={classNames('id', { blur: blurName })}>{dispName}</div>
      <div className='content'>
        {showHPS && (
          <div className='data'>
            <span className='s-number'>{fmtNumber(hps) || 0}</span>
            <span className='s-counter'>HPS</span>
          </div>
        )}
        <span className='job-icon'>
          <img src={jobIcons[job] || jobIcons.ffxiv} />
        </span>
        <div className='data'>
          <span className='s-number'>{(showHPS ? fmtNumber(dps) : dps) || 0}</span>
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
    hps: PropTypes.number.isRequired,
    maxHit: PropTypes.string,
    maxHitDamage: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CombatantGrid;
