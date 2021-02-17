import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateZoom, updateLang } from '@/store/slices/settings';
import { SInputNumber, SSelect } from '@/components';

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
  const dispatch = useDispatch();

  // datas
  const lang = useSelector((state) => state.settings.lang);
  const zoom = useSelector((state) => state.settings.zoom);

  return (
    <div className='settings-layout'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Language')}</span>
        <SSelect value={lang} onChange={(value) => dispatch(updateLang({ value }))} map={langMap} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('UI Scale')}</span>
        <SInputNumber
          value={zoom}
          onChange={(value) => dispatch(updateZoom({ value }))}
          min={0.5}
          max={4}
          step={0.25}
          accuracy={2}
        />
      </div>
    </div>
  );
}

export default SettingsLayout;
