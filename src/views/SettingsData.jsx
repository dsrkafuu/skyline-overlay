import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SSwitch, SInputNumber } from '@/components';
import { IChevronDown, IChevronUp } from '@/assets/svgs';
import {
  updateSortRule,
  updatePlayerLimit,
  updateShowLB,
  updateShowHPS,
} from '@/store/slices/settings';

function SettingsData() {
  const { t } = useTranslation(); // i18n

  const sortRule = useSelector((state) => state.settings.sortRule);
  const playerLimit = useSelector((state) => state.settings.playerLimit);
  const showLB = useSelector((state) => state.settings.showLB);
  const showHPS = useSelector((state) => state.settings.showHPS);

  return (
    <div className='settings-data'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Sort Rule')}</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={(value) => updateSortRule({ key: 'dps', value: value ? -1 : 1 })}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Max Combatants')}</span>
        <SInputNumber
          value={playerLimit}
          onChange={(value) => updatePlayerLimit(value)}
          min={1}
          max={24}
          step={1}
          accuracy={0}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Limit Break')}</span>
        <SSwitch value={showLB} onChange={(value) => updateShowLB(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show HPS')}</span>
        <SSwitch value={showHPS} onChange={(value) => updateShowHPS(value)} />
      </div>
    </div>
  );
}

export default memo(SettingsData);
