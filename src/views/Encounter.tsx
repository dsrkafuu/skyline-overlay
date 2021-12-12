import './Encounter.scss';
import { useCallback, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { version } from '../assets/meta';
import {
  IChevronUpCircle,
  IChevronDownCircle,
  ISettings,
  IRefreshCircle,
} from '../assets/icons';
import { logInfo } from '../utils/loggers';
import { useStore } from '../hooks';
import { fmtNumber } from '../utils/formatters';

function Encounter() {
  const { api, settings } = useStore();
  const { active, encounter, overlay } = api;
  const { showCombatants, shortNumber, toggleShowCombatants } = settings;

  // encounter data
  const duration = encounter.duration || '00:00';
  const zoneName = encounter.zoneName || `Skyline Overlay ${version}`;
  const totalDPS = encounter.dps || 0;

  /**
   * reset all combat data
   */
  const handleEndEncounter = useCallback(async () => {
    await overlay.endEncounter();
    logInfo('encounter ended');
  }, [overlay]);

  const handleToggleShowCombatants = useCallback(() => {
    toggleShowCombatants();
  }, [toggleShowCombatants]);

  const [durationHovered, setDurationHovered] = useState(false);
  const DurationInner = durationHovered ? (
    <IRefreshCircle />
  ) : (
    <span>{duration}</span>
  );
  const onDurationEnter = useCallback(() => {
    setDurationHovered(true);
  }, []);
  const onDurationLeave = useCallback(() => {
    setDurationHovered(false);
  }, []);

  return (
    <div className='encounter'>
      <div
        className={cn('encounter-duration', {
          'encounter-duration--active': active,
        })}
        onMouseEnter={onDurationEnter}
        onMouseLeave={onDurationLeave}
        onClick={handleEndEncounter}
      >
        {DurationInner}
      </div>
      <div className='encounter-content'>
        <div className='encounter-zone'>
          <span>{zoneName}</span>
        </div>
        <div className='encounter-numbers'>
          <span className='g-number'>{fmtNumber(shortNumber, totalDPS)}</span>
          <span className='g-counter'>DPS</span>
        </div>
      </div>
      <div className='encounter-buttons'>
        <div className='btn' onClick={handleToggleShowCombatants}>
          {showCombatants ? <IChevronUpCircle /> : <IChevronDownCircle />}
        </div>
        <div className='btn' onClick={() => settings.toggleSettings()}>
          <ISettings />
        </div>
      </div>
    </div>
  );
}

export default observer(Encounter);
