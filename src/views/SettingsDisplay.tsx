import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { SInput, SSwitch, SSelect } from '../components';
import useStore from '../hooks/useStore';
import { MAP_SHORT_NAME } from '../utils/constants';

function SettingsDisplay() {
  const { t } = useTranslation();
  const { settings } = useStore();

  const { showRanks, hlYou, showTickers, youName, shortName, shortNumber, blurName } = settings;
  const {
    updateShowRanks,
    updateHlYou,
    updateShowTickers,
    updateYouName,
    updateShortName,
    updateShortNumber,
    updateBlurName,
  } = settings;

  return (
    <div className='settings-display'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch value={showRanks} onChange={(val) => updateShowRanks(val)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Highlight Self')}</span>
        <SSwitch value={hlYou} onChange={(val) => updateHlYou(val)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Tickers')}</span>
        <SSwitch value={showTickers} onChange={(val) => updateShowTickers(val)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={(val) => updateYouName(val)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Name')}</span>
        <SSelect value={shortName} onChange={(val) => updateShortName(val)} map={MAP_SHORT_NAME} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Number')}</span>
        <SSwitch value={shortNumber} onChange={(val) => updateShortNumber(val)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Blur Name')}</span>
        <SSwitch value={blurName} onChange={(val) => updateBlurName(val)} />
      </div>
    </div>
  );
}

export default observer(SettingsDisplay);
