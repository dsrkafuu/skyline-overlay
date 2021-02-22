import React from 'react';
import { useTranslation } from 'react-i18next';

import { SInput, SSwitch, SSelect } from '@/components';
import { ICheckmark, IClose } from '@/assets/svgs';
import useSettings from '@/hooks/useSettings';

const shortNameMap = {
  'F-F': { text: 'First Last', data: { first: false, last: false } },
  'F-T': { text: 'First L.', data: { first: false, last: true } },
  'T-F': { text: 'F. Last', data: { first: true, last: false } },
  'T-T': { text: 'F. L.', data: { first: true, last: true } },
};

function SettingsDisplay() {
  const { t } = useTranslation(); // i18n support

  // datas
  const [showRanks, setShowRanks] = useSettings('showRanks');
  const [youName, setYouName] = useSettings('youName');
  const [{ first, last }, setShortName] = useSettings('shortName');
  const shortNameValue = (() => {
    return `${first ? 'T' : 'F'}-${last ? 'T' : 'F'}`;
  })();

  return (
    <div className='settings-display'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch
          value={showRanks}
          onChange={(value) => setShowRanks(value)}
          ITrue={ICheckmark}
          IFalse={IClose}
        />
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
          map={shortNameMap}
        />
      </div>
    </div>
  );
}

export default SettingsDisplay;
