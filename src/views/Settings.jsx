import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Settings.scss';

import { updateShowRanks, updateYouName } from '@/store/slices/settings';
import { SInput, SSwitch } from '@/components';

function Settings() {
  const dispatch = useDispatch();

  // settings data
  const showSettings = useSelector((state) => state.settings.showSettings);
  const showRanks = useSelector((state) => state.settings.showRanks);
  const youName = useSelector((state) => state.settings.youName);

  /**
   * @param {boolean} value
   */
  function handleChangeShowRanks(value) {
    dispatch(updateShowRanks({ value }));
  }

  /**
   * @param {string} value
   */
  function handleChangeYouName(value) {
    dispatch(updateYouName({ value }));
  }

  return (
    <div className='settings'>
      {showSettings && (
        <div className='content'>
          <div className='row'>
            <span className='title'>显示名次</span>
            <SSwitch value={showRanks} onChange={handleChangeShowRanks} />
          </div>
          <div className='row'>
            <span className='title'>自定义 ID</span>
            <SInput value={youName} onChange={handleChangeYouName} />
          </div>
          <div className='row'>
            <span className='title'>{`Copyright ${new Date().getFullYear()} Apache-2.0 License`}</span>
            <a className='s-link' href='https://dsrkafuu.co' target='_blank' rel='noreferrer'>
              DSRKafuU
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
