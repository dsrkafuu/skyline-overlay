import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import * as jobIcons from '../assets/jobs';
import { useStore } from '../hooks';
import { isLimitBreakData } from '../utils/type';
import { fmtNumber } from '../utils/formatters';

interface CombatantContentProps {
  player: CombatantData | LimitBreakData;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  lockDetail: boolean;
  setLockDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

function CombatantContent({
  player,
  setShowDetail,
  lockDetail,
  setLockDetail,
}: CombatantContentProps) {
  const { dps } = player;
  const { settings } = useStore();
  const { shortNumber } = settings;

  // detail controls controllers
  const onDetailEnter = useCallback(() => {
    setShowDetail(true);
  }, [setShowDetail]);
  const onDetailLeave = useCallback(() => {
    !lockDetail && setShowDetail(false);
  }, [lockDetail, setShowDetail]);
  const onSwitchDetailLock = useCallback(
    () => setLockDetail((val) => !val),
    [setLockDetail]
  );

  // job icon component
  const Icon = isLimitBreakData(player)
    ? jobIcons.FFXIV
    : jobIcons[
        String.prototype.toUpperCase.apply(player.job) as keyof typeof jobIcons
      ] || jobIcons.FFXIV;

  return (
    <div
      className='combatant-content'
      onMouseEnter={onDetailEnter}
      onMouseLeave={onDetailLeave}
      onClick={onSwitchDetailLock}
    >
      <div className='combatant-content-data'>
        <span className='g-number'>
          {(shortNumber ? fmtNumber(dps) : dps) || 0}
        </span>
        <span className='g-counter'>DPS</span>
      </div>
      <span className='job-icon'>
        <Icon />
      </span>
    </div>
  );
}

export default observer(CombatantContent);
