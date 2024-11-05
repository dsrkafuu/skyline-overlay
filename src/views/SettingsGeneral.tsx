import { useMemo } from 'react';
import { SInput, SInputNumber, SSelect } from '../components';
import { useAppDispatch, useAppSelector, useTranslation } from '../hooks';
import {
  updateCustomCSS,
  updateFonts,
  updateLang,
  updateLayoutMode,
  updateOpacity,
  updateZoom,
} from '../store/slices/settings';
import {
  MAP_LANG,
  MAP_FONT_FAMILY,
  MAP_FONT_WEIGHT,
  MAP_LAYOUT_MODE,
} from '../utils/maps';
import SettingsTransfer from './SettingsTransfer';

function SettingsGeneral() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.settings.lang);
  const zoom = useAppSelector((state) => state.settings.zoom);
  const opacity = useAppSelector((state) => state.settings.opacity);
  const layoutMode = useAppSelector((state) => state.settings.layoutMode);
  const fonts = useAppSelector((state) => state.settings.fonts);
  const customCSS = useAppSelector((state) => state.settings.customCSS);

  const items = useMemo(
    () => [
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
        title: t('Layout Mode'),
        render: () => (
          <SSelect
            value={layoutMode}
            onChange={(v) => dispatch(updateLayoutMode(v))}
            map={MAP_LAYOUT_MODE}
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
    [t, dispatch, lang, zoom, opacity, fonts, customCSS, layoutMode]
  );

  return (
    <div className='settings-general'>
      {items.map(({ title, render }) => (
        <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsGeneral;
