import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SSwitch, SInputNumber } from '@/components';
import { IChevronDown, IChevronUp } from '@/assets/svgs';
import {
  updateSortRule,
  updatePlayerLimit,
  updateShowLB,
  updateShowHPS,
  updateExtendDetail,
} from '@/store/slices/settings';

function SettingsData() {
  const { t } = useTranslation(); // i18n
  const dispatch = useDispatch();

  const sortRule = useSelector((state) => state.settings.sortRule);
  const playerLimit = useSelector((state) => state.settings.playerLimit);
  const showLB = useSelector((state) => state.settings.showLB);
  const showHPS = useSelector((state) => state.settings.showHPS);
  const extendDetail = useSelector((state) => state.settings.extendDetail);

  return (
    <div className='settings-data'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Sort Rule')}</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={(value) => dispatch(updateSortRule({ key: 'dps', value: value ? -1 : 1 }))}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Max Combatants')}</span>
        <SInputNumber
          value={playerLimit}
          onChange={(value) => dispatch(updatePlayerLimit(value))}
          min={1}
          max={24}
          step={1}
          accuracy={0}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Limit Break')}</span>
        <SSwitch value={showLB} onChange={(value) => dispatch(updateShowLB(value))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show HPS')}</span>
        <SSwitch value={showHPS} onChange={(value) => dispatch(updateShowHPS(value))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Extend Detail')}</span>
        <SSwitch value={extendDetail} onChange={(value) => dispatch(updateExtendDetail(value))} />
      </div>
    </div>
  );
}

export default memo(SettingsData);
