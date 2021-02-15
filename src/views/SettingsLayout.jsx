import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateZoom } from '@/store/slices/settings';
import { SInputNumber } from '@/components';

function SettingsLayout() {
  const dispatch = useDispatch();

  // datas
  const zoom = useSelector((state) => state.settings.zoom);
  /**
   * @param {number} value
   */
  function handleChangeZoom(value) {
    dispatch(updateZoom({ value }));
  }

  return (
    <div className='settings-layout'>
      <div className='settings-row'>
        <span className='settings-title'>界面缩放</span>
        <SInputNumber
          value={zoom}
          onChange={handleChangeZoom}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
    </div>
  );
}

export default SettingsLayout;
