import './Combatant.scss';
import { useCallback, useState } from 'react';
import clsx, { ClassArray } from 'clsx';
import { CombatantData, LimitBreakData, class2job } from 'ffxiv-overlay-api';
import CombatantName from './CombatantName';
import CombatantDetail from './CombatantDetail';
import CombatantBottom from './CombatantBottom';
import CombatantContent from './CombatantContent';
import { useAppSelector } from '../hooks';
import { STicker, STickerProps, STickerClass } from '../components';
import { isLimitBreakData, isCombatantData } from '../utils/type';
import { TickerMapKey } from '../utils/maps';

interface CombatantProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function Combatant({ player }: CombatantProps) {
  const { name } = player;
  const classes: ClassArray = ['combatant']; // grid classnames

  const hlYou = useAppSelector((state) => state.settings.hlYou);
  const youName = useAppSelector((state) => state.settings.youName);
  const bottomDisp = useAppSelector((state) => state.settings.bottomDisp);
  const ticker = useAppSelector((state) => state.settings.ticker);
  const tickerAlign = useAppSelector((state) => state.settings.tickerAlign);
  const dispMode = useAppSelector((state) => state.settings.dispMode);
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  // player colors
  let color = 'var(--color-common)'; // fallback common color
  if (!isLimitBreakData(player)) {
    const { job, jobType, name } = player;
    if (hlYou && (name === youName || name === 'YOU')) {
      color = `var(--color-self)`; // self highlight
    } else if (themeMode === 'role' && jobType && jobType !== 'unknown') {
      color = `var(--color-role-${jobType})`; // role colors
    } else if (themeMode === 'job' && job && job !== 'unknown') {
      const transedJob = class2job(job);
      if (transedJob !== job) {
        color = `var(--color-job-${transedJob})`; // per job colors (base class)
      } else {
        color = `var(--color-job-${job})`; // per job colors (transd job)
      }
    }
  }

  // if dual display mode
  if (dispMode === 'dual') {
    classes.push('combatant-dual');
  }

  // detail controls data
  const needDetail = name !== 'Limit Break';
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
    <div className={clsx(...classes)}>
      <CombatantName player={player} />

      {ticker.top && ticker.top !== 'none' && (
        <STicker {...getTickerProps(ticker.top)} align={tickerAlign.top} />
      )}

      <CombatantContent
        player={player}
        color={color}
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

      {bottomDisp !== 'none' && (
        <CombatantBottom
          player={player}
          mode={needDetail && (lockDetail || showDetail) ? 'none' : bottomDisp}
        />
      )}

      {needDetail && (lockDetail || showDetail) && (
        <CombatantDetail
          player={player}
          color={color}
          lockDetail={lockDetail}
        />
      )}
    </div>
  );
}

export default Combatant;
