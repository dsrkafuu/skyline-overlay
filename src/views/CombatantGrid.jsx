import React, { memo, useMemo, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import CombatantDetail from './CombatantDetail';
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

  const transMaxHitRef = useRef(); // ref for react-transition-group
  const transDetailRef = useRef(); // ref for react-transition-group
  // detail controls data
  const needDetail = useMemo(() => name !== 'Limit Break', [name]);
  const [showDetail, setShowDetail] = useState(false);
  const [lockDetail, setLockDetail] = useState(false);
  // detail controls controllers
  const onDetailEnter = useCallback(() => setShowDetail(true), []);
  const onDetailLeave = useCallback(() => !lockDetail && setShowDetail(false), [lockDetail]);
  const onSwitchDetailLock = useCallback(() => setLockDetail((val) => !val), []);

  return (
    <div className={classNames(...gridClass)}>
      <div className={classNames('combatant-grid-id', { blur: blurName })}>{dispName}</div>

      <div
        className='combatant-grid-content'
        onMouseEnter={onDetailEnter}
        onMouseLeave={onDetailLeave}
        onClick={onSwitchDetailLock}
      >
        {showHPS && (
          <div className='combatant-grid-data'>
            <span className='s-number'>{fmtNumber(hps) || 0}</span>
            <span className='s-counter'>HPS</span>
          </div>
        )}
        <span className='job-icon'>
          <img src={jobIcons[job] || jobIcons.ffxiv} />
        </span>
        <div className='combatant-grid-data'>
          <span className='s-number'>{(showHPS ? fmtNumber(dps) : dps) || 0}</span>
          <span className='s-counter'>DPS</span>
        </div>
      </div>

      <CSSTransition
        classNames='fade'
        in={!needDetail || !(lockDetail || showDetail)}
        timeout={150}
        unmountOnExit
        nodeRef={transMaxHitRef}
      >
        <div className='combatant-grid-maxhit' ref={transMaxHitRef}>
          <span>&nbsp;{maxHit}&nbsp;</span>
          {maxHitDamage > 0 && <span>-&nbsp;{maxHitDamage}&nbsp;</span>}
        </div>
      </CSSTransition>

      <CSSTransition
        classNames='fade'
        in={needDetail && (lockDetail || showDetail)}
        timeout={150}
        unmountOnExit
        nodeRef={transDetailRef}
      >
        <CombatantDetail
          ref={transDetailRef}
          player={player}
          locked={lockDetail}
          onClick={onSwitchDetailLock}
        />
      </CSSTransition>
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
