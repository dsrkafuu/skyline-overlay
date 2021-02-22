import React from 'react';
import { useTranslation } from 'react-i18next';

import { SInputNumber, SSelect, SInput } from '@/components';
import useSettings from '@/hooks/useSettings';

import rawLang from '@/lang';
const langMap = {};
Object.keys(rawLang).forEach((key) => {
  langMap[key] = {
    text: rawLang[key].translation.LANG,
    // no data needed, use kay as data
  };
});

function SettingsLayout() {
  const { t } = useTranslation(); // i18n support

  // datas
  const [lang, setLang] = useSettings('lang');
  const [zoom, setZoom] = useSettings('zoom');
  const [font, setFont] = useSettings('font');

  return (
    <div className='settings-general'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={(value) => setLang(value)} map={langMap} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={(value) => setZoom(value)}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Font Family')}</span>
        <SInput value={font} onChange={(value) => setFont(value)} />
      </div>
    </div>
  );
}

export default SettingsLayout;
