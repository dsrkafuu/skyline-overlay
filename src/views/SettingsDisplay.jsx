import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

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
        <SSwitch value={showRanks} onChange={(value) => dispatch(updateShowRanks(value))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Highlight Self')}</span>
        <SSwitch value={hlYou} onChange={(value) => dispatch(updateHlYou(value))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={(value) => dispatch(updateYouName(value))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Name')}</span>
        <SSelect
          value={shortNameValue}
          onChange={(value, data) => dispatch(updateShortName(data))}
          map={MAP_SHORT_NAME}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Blur Name')}</span>
        <SSwitch value={blurName} onChange={(value) => dispatch(updateBlurName(value))} />
      </div>
    </div>
  );
}

export default memo(SettingsDisplay);
