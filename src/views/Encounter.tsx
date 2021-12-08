import './Encounter.scss';
import { useCallback } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { version } from '../assets/meta';
import { IRefresh, ISettings } from '../assets/icons';
import { logInfo } from '../utils/loggers';
import { useStore } from '../hooks';
import { fmtNumber } from '../utils/formatters';

function Encounter() {
  const { api, settings } = useStore();
  const { active, encounter, overlay } = api;
  const { shortNumber } = settings;

  // encounter data
  const duration = encounter.duration || '00:00';
  const zoneName = encounter.zoneName || `Skyline Overlay ${version}`;
  const totalDPS = encounter.dps || 0;

  /**
   * reset all combat data
   */
  const handleReset = useCallback(() => {
    overlay.endEncounter();
    api.clearCombat();
    logInfo('overlay cleared');
  }, [api, overlay]);

  return (
    <div className='encounter'>
      <div className={cn('encounter-duration', { active })}>
        <span>{duration}</span>
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
        <div className='btn' onClick={handleReset}>
          <IRefresh />
        </div>
        <div className='btn' onClick={() => settings.toggleSettings()}>
          <ISettings />
        </div>
      </div>
    </div>
  );
}

export default observer(Encounter);
