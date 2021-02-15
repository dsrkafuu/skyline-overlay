import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateSortRule, updateShowRanks, updateYouName } from '@/store/slices/settings';
import { SInput, SSwitch } from '@/components';
import { IChevronDown, IChevronUp, ICheckmark, IClose } from '@/assets/svgs';

function SettingsData() {
  const dispatch = useDispatch();

  // datas
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

  return (
    <div className='settings-data'>
      <div className='settings-row'>
        <span className='settings-title'>排序规则</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={handleChangeSortRuleValue}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>显示名次</span>
        <SSwitch
          value={showRanks}
          onChange={handleChangeShowRanks}
          ITrue={ICheckmark}
          IFalse={IClose}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>自定义 ID</span>
        <SInput value={youName} onChange={handleChangeYouName} />
      </div>
    </div>
  );
}

export default SettingsData;
