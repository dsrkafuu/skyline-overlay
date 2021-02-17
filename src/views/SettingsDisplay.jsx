import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateShowRanks, updateYouName, updateShortName } from '@/store/slices/settings';
import { SInput, SSwitch, SSelect } from '@/components';
import { ICheckmark, IClose } from '@/assets/svgs';

const shortNameMap = {
  'F-F': { text: 'Skyline Overlay', data: { first: false, last: false } },
  'F-T': { text: 'Skyline O.', data: { first: false, last: true } },
  'T-F': { text: 'S. Overlay', data: { first: true, last: false } },
  'T-T': { text: 'S. O.', data: { first: true, last: true } },
};

function SettingsDisplay() {
  const { t } = useTranslation(); // i18n support
  const dispatch = useDispatch();

  // datas
  const showRanks = useSelector((state) => state.settings.showRanks);
  const youName = useSelector((state) => state.settings.youName);
  const { first, last } = useSelector((state) => state.settings.shortName);
  const shortName = (() => {
    return `${first ? 'T' : 'F'}-${last ? 'T' : 'F'}`;
  })();

  return (
    <div className='settings-display'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Ranks')}</span>
        <SSwitch
          value={showRanks}
          onChange={(value) => dispatch(updateShowRanks({ value }))}
          ITrue={ICheckmark}
          IFalse={IClose}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Custom ID')}</span>
        <SInput value={youName} onChange={(value) => dispatch(updateYouName({ value }))} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Shorten Name')}</span>
        <SSelect
          value={shortName}
          onChange={(value, data) => dispatch(updateShortName(data))}
          map={shortNameMap}
        />
      </div>
    </div>
  );
}

export default SettingsDisplay;
