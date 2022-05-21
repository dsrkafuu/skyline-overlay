import { useCallback } from 'react';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import * as jobIcons from '../assets/jobs';
import { useAppSelector } from '../hooks';
import { isLimitBreakData } from '../utils/type';
import { fmtNumber } from '../utils/formatters';
import { MAP_DISPLAY_CONTENT } from '../utils/maps';

interface CombatantContentProps {
  player: CombatantData | LimitBreakData;
  color: string;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  lockDetail: boolean;
  setLockDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

function CombatantContent({
  player,
  color,
  setShowDetail,
  lockDetail,
  setLockDetail,
}: CombatantContentProps) {
  const dispMode = useAppSelector((state) => state.settings.dispMode);
  const dispContent = useAppSelector((state) => state.settings.dispContent);
  const shortNumber = useAppSelector((state) => state.settings.shortNumber);
  const bigNumberMode = useAppSelector((state) => state.settings.bigNumberMode);

  const leftDisp = (player as CombatantData)[dispContent.left] || 0;
  const leftDispUnit = MAP_DISPLAY_CONTENT[dispContent.left].data.unit;
  const rightDisp = (player as CombatantData)[dispContent.right] || 0;
  const rightDispUnit = MAP_DISPLAY_CONTENT[dispContent.right].data.unit;

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
      style={{ backgroundColor: color }}
    >
      {dispMode === 'dual' && (
        <div className='combatant-content-data'>
          <span className='g-number'>
            {(typeof leftDisp === 'number' &&
              fmtNumber(leftDisp, shortNumber, bigNumberMode)) ||
              leftDisp}
          </span>
          <span className='g-counter'>{leftDispUnit}</span>
        </div>
      )}
      <span className='job-icon'>
        <Icon />
      </span>
      <div className='combatant-content-data'>
        <span className='g-number'>
          {(typeof rightDisp === 'number' &&
            fmtNumber(rightDisp, shortNumber, bigNumberMode)) ||
            rightDisp}
        </span>
        <span className='g-counter'>{rightDispUnit}</span>
      </div>
    </div>
  );
}

export default CombatantContent;
