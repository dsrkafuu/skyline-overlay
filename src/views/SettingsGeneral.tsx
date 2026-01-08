import SettingsTransfer from './SettingsTransfer';
import { SInput, SInputNumber, SSelect, SSwitch } from '@/components';
import { useAppDispatch, useAppSelector, useTranslation } from '@/hooks';
import {
  updateCustomCSS,
  updateFonts,
  updateLang,
  updateLayoutMode,
  updateMock,
  updateOpacity,
  updateZoom,
} from '@/store/slices/settings';
import { MAP_LANG, MAP_FONT_FAMILY, MAP_LAYOUT_MODE } from '@/utils/maps';
import { useMemo } from 'react';

function SettingsGeneral() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const mock = useAppSelector((state) => state.settings.mock);
  const lang = useAppSelector((state) => state.settings.lang);
  const zoom = useAppSelector((state) => state.settings.zoom);
  const opacity = useAppSelector((state) => state.settings.opacity);
  const layoutMode = useAppSelector((state) => state.settings.layoutMode);
  const fonts = useAppSelector((state) => state.settings.fonts);
  const customCSS = useAppSelector((state) => state.settings.customCSS);

  const availableWeights = useMemo(() => {
    const family = fonts.family;
    const curFamily = MAP_FONT_FAMILY[family];
    const weightRange = curFamily ? curFamily.weights : [400, 400];
    const weights: { [key: string]: { text: string; parent: string } } = {};
    for (let w = weightRange[0]; w <= weightRange[1]; w += 100) {
      weights[`${w}`] = { text: `${w}`, parent: family };
    }
    return weights;
  }, [fonts.family]);
  const weightIsValid = fonts.weight in availableWeights;

  const items = useMemo(
    () => [
      {
        title: t('Mock Data'),
        render: () => (
          <SSwitch value={mock} onChange={(v) => dispatch(updateMock(v))} />
        ),
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
              value={weightIsValid ? `${fonts.weight}` : '400'}
              onChange={(weight) => dispatch(updateFonts({ weight: +weight }))}
              map={availableWeights}
              position='top'
              r3mode
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
    [
      t,
      mock,
      dispatch,
      lang,
      zoom,
      opacity,
      layoutMode,
      fonts.family,
      fonts.weight,
      weightIsValid,
      availableWeights,
      customCSS,
    ]
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
