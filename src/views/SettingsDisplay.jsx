import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { SInput, SSwitch, SSelect } from '@/components';
import useStore from '@/hooks/useStore';
import { MAP_SHORT_NAME } from '@/utils/constants';

function SettingsDisplay() {
  const { t } = useTranslation();
  const { settings } = useStore();

  const {
    showRanks,
    hlYou,
    youName,
    shortName: { first, last },
    shortNumber,
    blurName,
  } = settings;
  const {
    updateShowRanks,
    updateHlYou,
    updateYouName,
    updateShortName,
    updateShortNumber,
    updateBlurName,
  } = settings;

  const shortNameValue = useMemo(
    () => `${first}`.slice(0, 1) + `${last}`.slice(0, 1),
    [first, last]
  );

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
          onChange={(_, data) => updateShortName(data)}
          map={MAP_SHORT_NAME}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Number')}</span>
        <SSwitch value={shortNumber} onChange={(value) => updateShortNumber(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Blur Name')}</span>
        <SSwitch value={blurName} onChange={(value) => updateBlurName(value)} />
      </div>
    </div>
  );
}

export default observer(SettingsDisplay);
