import './Combatant.scss';
import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import cn, { Argument } from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { CSSTransition } from 'react-transition-group';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import CombatantName from './CombatantName';
import CombatantDetail from './CombatantDetail';
import CombatantBottom from './CombatantBottom';
import CombatantContent from './CombatantContent';
import { useStore } from '../hooks';
import { STicker, STickerProps } from '../components';
import { isLimitBreakData, isCombatantData } from '../utils/type';
import { fmtMergePet } from '../utils/formatters';

interface CombatantGridProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function CombatantGrid({ player, index }: CombatantGridProps) {
  // get data
  const { name } = player;
  const gridClass: Argument[] = ['combatant-grid']; // grid classnames
  const { settings } = useStore();
  const { hlYou, bottomDisp, ticker, tickerAlign } = settings;

  // class names related to job
  if (isLimitBreakData(player)) {
    gridClass.push('job-unknown');
  } else {
    gridClass.push({ 'job-self': hlYou && name === 'YOU' }); // highlight
    gridClass.push(`job-${player.job || 'unknown'}`); // job
    gridClass.push(`jobtype-${player.jobType || 'unknown'}`); // jobtype
  }

  // sub display prop
  const transBottomDispRef = useRef<HTMLDivElement>(null); // ref for react-transition-group
  const transDetailRef = useRef<HTMLDivElement>(null); // ref for react-transition-group
  // detail controls data
  const needDetail = name !== 'Limit Break';
  const [showDetail, setShowDetail] = useState(false);
  const [lockDetail, setLockDetail] = useState(false);

  // tickers
  let healerPcts: string[] = [];
  let dpsPcts: string[] = [];
  if (isCombatantData(player)) {
    dpsPcts = [player.directCritHitPct, player.critHitPct, player.directHitPct];
    healerPcts = [player.shieldPct, player.healsPct, player.overHealPct];
  }
  const topTickerProps: STickerProps = {
    pcts: ticker.top === 'healer' ? healerPcts : dpsPcts,
    type: ticker.top === 'healer' ? 'healer' : 'dps',
  };
  const bottomTickerProps: STickerProps = {
    pcts: ticker.bottom === 'healer' ? healerPcts : dpsPcts,
    type: ticker.bottom === 'healer' ? 'healer' : 'dps',
  };
  let tickerNum = 2;
  ticker.top === 'none' && tickerNum--;
  ticker.bottom === 'none' && tickerNum--;

  return (
    <div className={cn(...gridClass)}>
      <CombatantName player={player} index={index} />

      {ticker.top && ticker.top !== 'none' && (
        <STicker {...topTickerProps} align={tickerAlign.top} />
      )}

      <CombatantContent
        player={player}
        setShowDetail={setShowDetail}
        lockDetail={lockDetail}
        setLockDetail={setLockDetail}
      />

      {ticker.bottom && ticker.bottom !== 'none' && (
        <STicker {...bottomTickerProps} align={tickerAlign.bottom} />
      )}

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
          tickerNum={tickerNum}
          locked={lockDetail}
        />
      </CSSTransition>
    </div>
  );
}

function Combatant() {
  // get data from store
  const {
    api: { combatant, lb },
    settings: { sort, playerLimit, showLB, petMergeID },
  } = useStore();
  let players: Array<CombatantData | LimitBreakData> = cloneDeep(combatant);

  // merge pet if enabled
  if (petMergeID) {
    players = fmtMergePet(players, petMergeID);
  }

  // sort combatant
  players.sort((a, b) => sort.rule * (a[sort.key] - b[sort.key]));

  // limit combatants
  const temp = players;
  players = [];
  for (let i = 0; i < playerLimit; i++) {
    temp[i] && temp[i].name && players.push(temp[i]);
  }

  // add lb if enabled
  if (showLB && lb && lb.name === 'Limit Break') {
    players.push(cloneDeep(lb));
  }

  return (
    <>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {players.map((player, index) => (
            <CombatantGrid player={player} index={index} key={player.name} />
          ))}
        </div>
      )}
    </>
  );
}

export default observer(Combatant);
