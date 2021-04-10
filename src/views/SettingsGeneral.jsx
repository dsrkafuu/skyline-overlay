import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SInputNumber, SSelect, SInput } from '@/components';
import { MAP_LANG, MAP_THEMES } from '@/utils/constants';
import { updateTheme, updateLang, updateZoom, updateFont } from '@/store/slices/settings';

function SettingsLayout() {
  const { t } = useTranslation(); // i18n support

  // datas
  const theme = useSelector((state) => state.settings.theme);
  const lang = useSelector((state) => state.settings.lang);
  const zoom = useSelector((state) => state.settings.zoom);
  const font = useSelector((state) => state.settings.font);

  return (
    <div className='settings-general'>
      <div className='settings-row settings-theme'>
        <span className='settings-title'>{t('Theme')}</span>
        <SSelect value={theme} onChange={(val) => updateTheme(val)} map={MAP_THEMES} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={(val) => updateLang(val)} map={MAP_LANG} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={(val) => updateZoom(val)}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
      <div className='settings-row settings-font'>
        <span className='settings-title'>{t('Font Family')}</span>
        <SInput value={font} onChange={(val) => updateFont(val)} />
      </div>
    </div>
  );
}

export default memo(SettingsLayout);
