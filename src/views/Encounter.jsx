import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Encounter.scss';

import { version } from '@/assets/changelog';
import { clearCombat } from '@/store/slices/combat';
import { toggleSettings } from '@/store/slices/settings';
import { IRefresh, ISettings } from '@/assets/svgs';
import { logInfo } from '@/utils/loggers';

function Encounter({ overlay }) {
  const dispatch = useDispatch();

  // encounter data
  const active = useSelector((state) => state.combat.active);
  const duration = useSelector((state) => state.combat.encounter.duration || '00:00');
  const zoneName = useSelector(
    (state) => state.combat.encounter.zoneName || `Skyline Overlay ${version}`
  );
  const totalDPS = useSelector((state) => state.combat.encounter.dps || 0);

  function handleReset() {
    overlay.endEncounter();
    dispatch(clearCombat());
    logInfo('overlay cleared');
  }

  return (
    <div className='encounter'>
      <div className={classNames('encounter-duration', { active })}>
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
        <div className='btn' onClick={() => dispatch(toggleSettings())}>
          <ISettings />
        </div>
      </div>
    </div>
  );
}

Encounter.propTypes = {
  overlay: PropTypes.shape({
    endEncounter: PropTypes.func.isRequired,
  }).isRequired,
};

export default Encounter;
