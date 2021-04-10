import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SInput, SSwitch, SSelect } from '@/components';
import { MAP_SHORT_NAME } from '@/utils/constants';
import {
  updateShowRanks,
  updateHlYou,
  updateYouName,
  updateShortName,
  updateBlurName,
} from '@/store/slices/settings';

function SettingsDisplay() {
  const { t } = useTranslation(); // i18n support

  // datas
  const showRanks = useSelector((state) => state.settings.showRanks);
  const hlYou = useSelector((state) => state.settings.hlYou);
  const youName = useSelector((state) => state.settings.youName);
  const { first, last } = useSelector((state) => state.settings.shortName);
  const shortNameValue = useMemo(() => Number(first) + Number(last) || 0, [first, last]);
  const blurName = useSelector((state) => state.settings.blurName);

  return (
    <div className='settings-display'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch value={showRanks} onChange={(value) => updateShowRanks(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Highlight Self')}</span>
        <SSwitch value={hlYou} onChange={(value) => updateHlYou(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={(value) => updateYouName(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Name')}</span>
        <SSelect
          value={shortNameValue}
          onChange={(value, data) => updateShortName(data)}
          map={MAP_SHORT_NAME}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Blur Name')}</span>
        <SSwitch value={blurName} onChange={(value) => updateBlurName(value)} />
      </div>
    </div>
  );
}

export default memo(SettingsDisplay);
