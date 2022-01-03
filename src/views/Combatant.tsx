import './Combatant.scss';
import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn, { Argument } from 'classnames';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import CombatantName from './CombatantName';
import CombatantDetail from './CombatantDetail';
import CombatantBottom from './CombatantBottom';
import CombatantContent from './CombatantContent';
import { useStore } from '../hooks';
import { STicker, STickerProps, STickerClass } from '../components';
import { isLimitBreakData, isCombatantData } from '../utils/type';
import { TickerMapKey } from '../utils/constants';

interface CombatantProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function Combatant({ player, index }: CombatantProps) {
  // get data
  const { name } = player;
  const classes: Argument[] = ['combatant']; // grid classnames
  const { settings } = useStore();
  const { hlYou, youName, bottomDisp, ticker, tickerAlign, dispMode } =
    settings;

  // class names related to job
  if (isLimitBreakData(player)) {
    classes.push('job-unknown');
  } else {
    classes.push({ 'job-self': hlYou && name === youName }); // highlight
    classes.push(`job-${player.job || 'unknown'}`); // job
    classes.push(`jobtype-${player.jobType || 'unknown'}`); // jobtype
  }

  // if dual display mode
  if (dispMode === 'dual') {
    classes.push('combatant-dual');
  }

  // detail controls data
  const needDetail = name !== 'Limit Break' && bottomDisp !== 'none';
  const [showDetail, setShowDetail] = useState(false);
  const [lockDetail, setLockDetail] = useState(false);
  if (!needDetail) {
    classes.push('combatant-no-detail');
  }

  // tickers
  const getTickerProps = useCallback(
    (mapKey: TickerMapKey) => {
      let healerPcts: number[] = [];
      let healerClasses: STickerClass[] = [];
      let dpsPcts: number[] = [];
      let dpsClasses: STickerClass[] = [];
      let dpsSpace = 0;
      if (isCombatantData(player)) {
        // CD/C/D
        dpsPcts = [
          player.directCritHits,
          // CD is included in C/D
          player.critHits - player.directCritHits,
          player.directHits - player.directCritHits,
        ];
        dpsClasses = ['cd', 'c', 'd'];
        // all normal hits
        dpsSpace =
          player.hits -
          (player.critHits + player.directHits - player.directCritHits);
        // OH/H/S
        healerPcts = [
          player.overHeal,
          // H = OH + S + H(actually)
          player.healed - player.overHeal - player.shield,
          player.shield,
        ];
        healerClasses = ['oh', 'h', 's'];
      }
      let ret: STickerProps;
      switch (mapKey) {
        case 'healer':
          ret = { pcts: healerPcts, classes: healerClasses, space: 0 };
          break;
        case 'healer-reverse':
          ret = {
            pcts: [...healerPcts].reverse(),
            classes: [...healerClasses].reverse(),
            space: 0,
          };
          break;
        case 'dps':
          ret = { pcts: dpsPcts, classes: dpsClasses, space: dpsSpace };
          break;
        case 'dps-reverse':
          ret = {
            pcts: [...dpsPcts].reverse(),
            classes: [...dpsClasses].reverse(),
            space: dpsSpace,
          };
          break;
        default:
          ret = { pcts: [], classes: new Array(3).fill('space'), space: 0 };
      }
      return ret;
    },
    [player]
  );

  return (
    <div className={cn(...classes)}>
      <CombatantName player={player} index={index} />

      {ticker.top && ticker.top !== 'none' && (
        <STicker {...getTickerProps(ticker.top)} align={tickerAlign.top} />
      )}

      <CombatantContent
        player={player}
        setShowDetail={setShowDetail}
        lockDetail={lockDetail}
        setLockDetail={setLockDetail}
      />

      {ticker.bottom && ticker.bottom !== 'none' && (
        <STicker
          {...getTickerProps(ticker.bottom)}
          align={tickerAlign.bottom}
        />
      )}

      {needDetail && (
        <CombatantBottom
          player={player}
          mode={lockDetail || showDetail ? 'none' : bottomDisp}
        />
      )}

      {needDetail && (lockDetail || showDetail) && (
        <CombatantDetail player={player} lockDetail={lockDetail} />
      )}
    </div>
  );
}

export default observer(Combatant);
