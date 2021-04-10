import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as jobIcons from '@/assets/icons';
import { fmtNumber } from '@/utils/formatters';

function CombatantGrid({ player, index }) {
  // get data
  const { jobType, job, name, dps, hps, maxHit, maxHitDamage } = player;
  const gridClass = ['combatant-grid']; // grid classnames

  // display name
  const youName = useSelector((state) => state.settings.youName);
  const shortName = useSelector((state) => state.settings.shortName);
  const showRanks = useSelector((state) => state.settings.showRanks);
  const dispName = useMemo(() => {
    let res = name;
    res === 'YOU' && (res = youName); // if custom name
    res === '' && (res = 'YOU'); // prevent empty
    // checker whether to shorten
    const splitName = res.split(' ');
    if (splitName.length === 2) {
      shortName.first && splitName[0].charAt(0) && (splitName[0] = `${splitName[0].charAt(0)}.`);
      shortName.last && splitName[1].charAt(0) && (splitName[1] = `${splitName[1].charAt(0)}.`);
      res = splitName.join(' ');
    }
    showRanks && (res = `${index + 1}. ${res}`); // if show ranks
    return res;
  }, [index, name, shortName.first, shortName.last, showRanks, youName]);
  const blurName = useSelector((state) => state.settings.blurName);

  // class names related to job
  const hlYou = useSelector((state) => state.settings.hlYou);
  gridClass.push(`job-${jobType || 'others'}`); // job
  gridClass.push({ 'job-self': hlYou && name === 'YOU' }); // highlight

  // sub display prop
  const showHPS = useSelector((state) => state.settings.showHPS);
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

export default memo(CombatantGrid);
