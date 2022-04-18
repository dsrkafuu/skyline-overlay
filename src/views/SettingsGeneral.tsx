import { useMemo } from 'react';
import { SInput, SInputNumber, SSelect, SInputColors } from '../components';
import { useAppDispatch, useAppSelector, useTranslation } from '../hooks';
import {
  updateColor,
  updateCustomCSS,
  updateFonts,
  updateLang,
  updateOpacity,
  updateTheme,
  updateZoom,
} from '../store/slices/settings';
import {
  MAP_THEMES,
  MAP_LANG,
  MAP_FONT_FAMILY,
  MAP_FONT_WEIGHT,
} from '../utils/constants';
import SettingsTransfer from './SettingsTransfer';
import themes from "../themes"

function SettingsGeneral() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const colors = useAppSelector((state) => state.settings.colors);
  const lang = useAppSelector((state) => state.settings.lang);
  const zoom = useAppSelector((state) => state.settings.zoom);
  const opacity = useAppSelector((state) => state.settings.opacity);
  const fonts = useAppSelector((state) => state.settings.fonts);
  const customCSS = useAppSelector((state) => state.settings.customCSS);

  const items = useMemo(
    () => [
      {
        title: t('Theme'),
        render: () => (
          <SSelect
            className='settings-theme'
            value={theme}
            onChange={(v) => dispatch(updateTheme(v))}
            map={MAP_THEMES}
          />
        ),
      },
      {
        title: t('Colors'),
        render: () => (
          <SInputColors 
            onChange={(key, value) => {
              dispatch(updateColor({key, value}))
            }} 
            values={JSON.parse(JSON.stringify(colors[theme])) || []}
          />
        ),
        hidden: !themes[theme].colors
      },
      {
        title: t('Language'),
        render: () => (
          <SSelect
            value={lang}
            onChange={(v) => dispatch(updateLang(v))}
            map={MAP_LANG}
          />
        ),
      },
      {
        title: t('UI Scale'),
        render: () => (
          <SInputNumber
            value={zoom}
            onChange={(v) => dispatch(updateZoom(v))}
            min={0.5}
            max={4}
            step={0.1}
            accuracy={1}
          />
        ),
      },
      {
        title: t('Opacity'),
        render: () => (
          <SInputNumber
            value={opacity}
            onChange={(v) => dispatch(updateOpacity(v))}
            min={0.1}
            max={1}
            step={0.1}
            accuracy={1}
          />
        ),
      },
      {
        title: t('Font Family'),
        render: () => (
          <>
            <SSelect
              className='settings-font-family'
              value={fonts.family}
              onChange={(family) => dispatch(updateFonts({ family }))}
              map={MAP_FONT_FAMILY}
              position='top'
            />
            <SSelect
              className='settings-font-weight'
              value={fonts.weight}
              onChange={(weight) => dispatch(updateFonts({ weight }))}
              map={MAP_FONT_WEIGHT}
              position='top'
            />
          </>
        ),
      },
      {
        title: t('Custom CSS'),
        render: () => (
          <SInput
            className='settings-custom-css'
            value={customCSS}
            onChange={(v) => dispatch(updateCustomCSS(v))}
          />
        ),
      },
      {
        title: t('Transfer Settings'),
        render: () => <SettingsTransfer />,
        observe: false,
      },
    ],
    [t, dispatch, theme, lang, zoom, opacity, fonts, customCSS]
  );

  return (
    <div className='settings-general'>
      {items.map(({ title, render, hidden }) => (
        !hidden && <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsGeneral;
