import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Settings.scss';

import {
  updateSortRule,
  updateShowRanks,
  updateYouName,
  updateZoom,
} from '@/store/slices/settings';
import { SInput, SInputNumber, SSwitch } from '@/components';
import { IChevronDown, IChevronUp, ICheckmark, IClose } from '@/assets/svgs';

function Settings() {
  const dispatch = useDispatch();

  // settings data
  const showSettings = useSelector((state) => state.settings.showSettings);

  /* data */
  const sortRule = useSelector((state) => state.settings.sortRule);
  const showRanks = useSelector((state) => state.settings.showRanks);
  const youName = useSelector((state) => state.settings.youName);
  /**
   * @param {boolean} value
   */
  function handleChangeSortRuleValue(value) {
    value = value ? -1 : 1;
    dispatch(updateSortRule({ value }));
  }
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

  /* layout */
  const zoom = useSelector((state) => state.settings.zoom);
  /**
   * @param {number} value
   */
  function handleChangeZoom(value) {
    dispatch(updateZoom({ value }));
  }

  return (
    <div className='settings'>
      {showSettings && (
        <div className='content'>
          <div className='row'>
            <span className='title'>界面缩放</span>
            <SInputNumber
              value={zoom}
              onChange={handleChangeZoom}
              min={0.5}
              max={4}
              step={0.25}
              accuracy={2}
            />
          </div>
          <div className='row'>
            <span className='title'>排序规则</span>
            <SSwitch
              value={sortRule.value < 0}
              onChange={handleChangeSortRuleValue}
              ITrue={IChevronDown}
              IFalse={IChevronUp}
            />
          </div>
          <div className='row'>
            <span className='title'>显示名次</span>
            <SSwitch
              value={showRanks}
              onChange={handleChangeShowRanks}
              ITrue={ICheckmark}
              IFalse={IClose}
            />
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
