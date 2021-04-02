import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SInputNumber, SSelect, SInput } from '@/components';
import useSettings from '@/hooks/useSettings';
import { MAP_LANG, MAP_THEMES } from '@/utils/constants';

function SettingsLayout() {
  const { t } = useTranslation(); // i18n support

  // datas
  const [theme, setTheme] = useSettings('theme');
  const [lang, setLang] = useSettings('lang');
  const [zoom, setZoom] = useSettings('zoom');
  const [font, setFont] = useSettings('font');

  return (
    <div className='settings-general'>
      <div className='settings-row settings-theme'>
        <span className='settings-title'>{t('Theme')}</span>
        <SSelect value={theme} onChange={(val) => setTheme(val)} map={MAP_THEMES} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={(val) => setLang(val)} map={MAP_LANG} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={(val) => setZoom(val)}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
      <div className='settings-row settings-font'>
        <span className='settings-title'>{t('Font Family')}</span>
        <SInput value={font} onChange={(val) => setFont(val)} />
      </div>
    </div>
  );
}

export default memo(SettingsLayout);
