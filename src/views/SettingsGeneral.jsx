import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { SInputNumber, SSelect, SInput } from '@/components';
import { MAP_LANG, MAP_THEMES } from '@/utils/constants';
import useStore from '@/hooks/useStore';

const SettingsLayout = observer(() => {
  const { t } = useTranslation();
  const { settings } = useStore();

  const { theme, lang, zoom, customCSS } = settings;
  const { updateTheme, updateLang, updateZoom, updateCustomCSS } = settings;

  return (
    <div className='settings-general'>
      <div className='settings-row settings-theme'>
        <span className='settings-title'>{t('Theme')}</span>
        <SSelect value={theme} onChange={(val) => updateTheme(val)} map={MAP_THEMES} />
      </div>
      <div className='settings-row settings-lang'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={(val) => updateLang(val)} map={MAP_LANG} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={(val) => updateZoom(val)}
          min={0.4}
          max={4}
          step={0.2}
          accuracy={1}
        />
      </div>
      <div className='settings-row settings-font'>
        <span className='settings-title'>{t('Custom CSS')}</span>
        <SInput value={customCSS} onChange={(val) => updateCustomCSS(val)} />
      </div>
    </div>
  );
});
SettingsLayout.displayName = 'SettingsLayout';

export default SettingsLayout;
