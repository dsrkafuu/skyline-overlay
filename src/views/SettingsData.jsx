import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateSortRule, updatePlayerLimit, updateShowLB } from '@/store/slices/settings';
import { SSwitch, SInputNumber } from '@/components';
import { IChevronDown, IChevronUp, ICheckmark, IClose } from '@/assets/svgs';

function SettingsData() {
  const { t } = useTranslation(); // i18n support
  const dispatch = useDispatch();

  // datas
  const sortRule = useSelector((state) => state.settings.sortRule);
  const playerLimit = useSelector((state) => state.settings.playerLimit);
  const showLB = useSelector((state) => state.settings.showLB);

  /**
   * @param {boolean} value
   */
  function handleChangeSortRuleValue(value) {
    value = value ? -1 : 1;
    dispatch(updateSortRule({ value }));
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
        <span className='settings-title'>{t('Max Combatants')}</span>
        <SInputNumber
          value={playerLimit}
          onChange={(value) => dispatch(updatePlayerLimit({ value }))}
          min={1}
          max={24}
          step={1}
          accuracy={0}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Limit Break')}</span>
        <SSwitch
          value={showLB}
          onChange={(value) => dispatch(updateShowLB({ value }))}
          ITrue={ICheckmark}
          IFalse={IClose}
        />
      </div>
    </div>
  );
}

export default SettingsData;
