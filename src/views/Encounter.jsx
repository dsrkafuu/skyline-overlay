import React, { useCallback } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import './Encounter.scss';
import { latest } from '@/assets/changelog';
import { IRefresh, ISettings } from '@/assets/svgs';
import { logInfo } from '@/utils/loggers';
import useStore from '@/hooks/useStore';

const Encounter = observer(() => {
  const { api, settings } = useStore();
  const { active, encounter, overlay } = api;

  // encounter data
  const duration = encounter.duration || '00:00';
  const zoneName = encounter.zoneName || `Skyline Overlay ${latest.version}`;
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
          <span className='s-number'>{totalDPS}</span>
          <span className='s-counter'>DPS</span>
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
});
Encounter.displayName = 'Encounter';

export default Encounter;
