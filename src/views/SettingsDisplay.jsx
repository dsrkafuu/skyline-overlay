import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SInput, SSwitch, SSelect } from '@/components';
import useSettings from '@/hooks/useSettings';
import { MAP_SHORT_NAME } from '@/utils/constants';

function SettingsDisplay() {
  const { t } = useTranslation(); // i18n support

  // datas
  const [showRanks, setShowRanks] = useSettings('showRanks');
  const [hlYou, setHlYou] = useSettings('hlYou');
  const [youName, setYouName] = useSettings('youName');
  const [{ first, last }, setShortName] = useSettings('shortName');
  const shortNameValue = useMemo(() => Number(first) + Number(last) || 0, [first, last]);
  const [blurName, setBlurName] = useSettings('blurName');

  return (
    <div className='settings-display'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch value={showRanks} onChange={(value) => setShowRanks(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Highlight Self')}</span>
        <SSwitch value={hlYou} onChange={(value) => setHlYou(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={(value) => setYouName(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Name')}</span>
        <SSelect
          value={shortNameValue}
          onChange={(value, data) => setShortName(data)}
          map={MAP_SHORT_NAME}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Blur Name')}</span>
        <SSwitch value={blurName} onChange={(value) => setBlurName(value)} />
      </div>
    </div>
  );
}

export default memo(SettingsDisplay);
