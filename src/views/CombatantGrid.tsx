import { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import cn, { Argument } from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import CombatantDetail from './CombatantDetail';
import CombatantTicker from './CombatantTicker';
import * as jobIcons from '../assets/jobs';
import { fmtNumber } from '../utils/formatters';
import { MAP_SHORT_NAME } from '../utils/constants';
import useStore from '../hooks/useStore';
import CombatantBottom from './CombatantBottom';
import { isLimitBreakData } from '../utils/type';

interface CombatantGridProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function CombatantGrid({ player, index }: CombatantGridProps) {
  // get data
  const { name, dps, hps } = player;
  const gridClass: Argument[] = ['combatant-grid']; // grid classnames
  const { settings } = useStore();
  const {
    youName,
    shortName,
    showRanks,
    blurName,
    hlYou,
    showHPS,
    showTickers,
    shortNumber,
    bottomDisp,
  } = settings;

  // display name
  let dispName = name;
  dispName === 'YOU' && (dispName = youName); // if custom name
  dispName === '' && (dispName = 'YOU'); // prevent empty
  // checker whether to shorten
  const splitName = dispName.split(' ');
  const shortNameCheck = MAP_SHORT_NAME[shortName].data;
  if (splitName.length === 2) {
    shortNameCheck.first &&
      splitName[0].charAt(0) &&
      (splitName[0] = `${splitName[0].charAt(0)}.`);
    shortNameCheck.last &&
      splitName[1].charAt(0) &&
      (splitName[1] = `${splitName[1].charAt(0)}.`);
    dispName = splitName.join(' ');
  }
  showRanks && (dispName = `${index + 1}. ${dispName}`); // if show ranks

  // class names related to job
  if (isLimitBreakData(player)) {
    gridClass.push('job-unknown');
  } else {
    gridClass.push({ 'job-self': hlYou && name === 'YOU' }); // highlight
    gridClass.push(`job-${player.job || 'unknown'}`); // job
    gridClass.push(`jobtype-${player.jobType || 'unknown'}`); // jobtype
  }

  // sub display prop
  gridClass.push({ 'combatant-grid-extend': showHPS }); // extended grid

  const transBottomDispRef = useRef<HTMLDivElement>(null); // ref for react-transition-group
  const transDetailRef = useRef<HTMLDivElement>(null); // ref for react-transition-group
  // detail controls data
  const needDetail = name !== 'Limit Break';
  const [showDetail, setShowDetail] = useState(false);
  const [lockDetail, setLockDetail] = useState(false);
  // detail controls controllers
  const onDetailEnter = useCallback(() => {
    setShowDetail(true);
  }, []);
  const onDetailLeave = useCallback(() => {
    !lockDetail && setShowDetail(false);
  }, [lockDetail]);
  const onSwitchDetailLock = useCallback(
    () => setLockDetail((val) => !val),
    []
  );

  // job icon component
  const Icon = isLimitBreakData(player)
    ? jobIcons.FFXIV
    : jobIcons[
        String.prototype.toUpperCase.apply(player.job) as keyof typeof jobIcons
      ] || jobIcons.FFXIV;

  return (
    <div className={cn(...gridClass)}>
      <div className={cn('combatant-grid-id', { blur: blurName })}>
        {dispName}
      </div>

      <div
        className='combatant-grid-content'
        onMouseEnter={onDetailEnter}
        onMouseLeave={onDetailLeave}
        onClick={onSwitchDetailLock}
      >
        <div className='combatant-grid-data'>
          <span className='s-number'>
            {(shortNumber ? fmtNumber(dps) : dps) || 0}
          </span>
          <span className='s-counter'>DPS</span>
        </div>
        <span className='job-icon'>
          <Icon />
        </span>
        {showHPS && (
          <div className='combatant-grid-data'>
            <span className='s-number'>
              {(shortNumber ? fmtNumber(hps) : hps) || 0}
            </span>
            <span className='s-counter'>HPS</span>
          </div>
        )}
      </div>

      {showTickers && <CombatantTicker player={player} />}

      <CSSTransition
        nodeRef={transBottomDispRef}
        in={!needDetail || !(lockDetail || showDetail)}
        classNames='fade'
        timeout={150}
      >
        <CombatantBottom
          ref={transBottomDispRef}
          player={player}
          mode={bottomDisp}
        />
      </CSSTransition>

      <CSSTransition
        nodeRef={transDetailRef}
        in={needDetail && (lockDetail || showDetail)}
        classNames='fade'
        timeout={150}
        unmountOnExit={true}
      >
        <CombatantDetail
          ref={transDetailRef}
          player={player}
          locked={lockDetail}
        />
      </CSSTransition>
    </div>
  );
}

export default observer(CombatantGrid);
