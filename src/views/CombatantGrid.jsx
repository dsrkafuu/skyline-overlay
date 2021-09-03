import React, { useMemo, useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import CombatantDetail from './CombatantDetail';
import CombatantTicker from './CombatantTicker';
import * as jobIcons from '@/assets/icons';
import { fmtNumber } from '@/utils/formatters';
import useStore from '@/hooks/useStore';

const CombatantGrid = observer(({ player, index }) => {
  // get data
  const {
    jobType,
    job,
    name,
    dps,
    hps,
    maxHit,
    maxHitDamage,
    directHitPct,
    critHitPct,
    directCritHitPct,
  } = player;
  const gridClass = ['combatant-grid']; // grid classnames
  const { settings } = useStore();
  const {
    minimalMode,
    youName,
    shortName,
    showRanks,
    blurName,
    hlYou,
    showHPS,
    showTickers,
    shortNumber,
  } = settings;

  // display name
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
  }, [index, name, shortName, showRanks, youName]);

  // class names related to job
  gridClass.push({ 'job-self': hlYou && name === 'YOU' }); // highlight
  gridClass.push(`job-${job || 'others'}`); // job
  gridClass.push(`jobtype-${jobType || 'others'}`); // jobtype

  // sub display prop
  gridClass.push({ 'combatant-grid-extend': showHPS }); // extended grid

  const transMaxHitRef = useRef(); // ref for react-transition-group
  const transDetailRef = useRef(); // ref for react-transition-group
  // detail controls data
  const needDetail = useMemo(() => name !== 'Limit Break', [name]);
  const [showDetail, setShowDetail] = useState(false);
  const [lockDetail, setLockDetail] = useState(false);
  // detail controls controllers
  const [timer, setTimer] = useState(null);
  const onDetailEnter = useCallback(() => {
    timer && clearTimeout(timer);
    setShowDetail(true);
  }, [timer]);
  const onDetailLeave = useCallback(() => {
    setTimer(setTimeout(() => !lockDetail && setShowDetail(false), 300));
  }, [lockDetail]);
  const onSwitchDetailLock = useCallback(() => setLockDetail((val) => !val), []);

  return (
    <div className={cn(...gridClass)}>
      {!minimalMode && (
        <div className={cn('combatant-grid-id', { blur: blurName })}>{dispName}</div>
      )}

      <div
        className='combatant-grid-content'
        onMouseEnter={onDetailEnter}
        onMouseLeave={onDetailLeave}
        onClick={onSwitchDetailLock}
      >
        <div className='combatant-grid-data'>
          <span className='s-number'>{(shortNumber ? fmtNumber(dps) : dps) || 0}</span>
          <span className='s-counter'>DPS</span>
        </div>
        <span className='job-icon'>
          <img src={jobIcons[job] || jobIcons.ffxiv} />
        </span>
        {showHPS && (
          <div className='combatant-grid-data'>
            <span className='s-number'>{(shortNumber ? fmtNumber(hps) : hps) || 0}</span>
            <span className='s-counter'>HPS</span>
          </div>
        )}
      </div>

      {showTickers && <CombatantTicker d={directHitPct} c={critHitPct} dc={directCritHitPct} />}

      {!minimalMode && (
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
      )}

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
});
CombatantGrid.displayName = 'CombatantGrid';

export default CombatantGrid;
