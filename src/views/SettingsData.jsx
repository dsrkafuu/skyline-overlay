import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateSortRule, updateShowRanks, updateYouName } from '@/store/slices/settings';
import { SInput, SSwitch } from '@/components';
import { IChevronDown, IChevronUp, ICheckmark, IClose } from '@/assets/svgs';

function SettingsData() {
  const { t } = useTranslation(); // i18n support
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
        <span className='settings-title'>{t('Sort Rule')}</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={handleChangeSortRuleValue}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch
          value={showRanks}
          onChange={handleChangeShowRanks}
          ITrue={ICheckmark}
          IFalse={IClose}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={handleChangeYouName} />
      </div>
    </div>
  );
}

export default SettingsData;
