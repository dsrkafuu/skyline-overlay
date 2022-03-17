import './Settings.scss';
import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import SettingsAbout from './SettingsAbout';
import SettingsPanel, { SettingsPanelProps } from './SettingsPanel';
import SettingsTransfer from './SettingsTransfer';
import { SInputNumber, SSelect, SInput, SSwitch } from '../components';
import {
  MAP_LANG,
  MAP_THEMES,
  MAP_BOTTOM_DISP,
  MAP_SHORT_NAME,
  MAP_SORT_RULE,
  MAP_TICKER,
  MAP_TICKER_ALIGN,
  MAP_DISPLAY_MODE,
  MAP_DISPLAY_CONTENT,
  MAP_FONT_FAMILY,
  MAP_FONT_WEIGHT,
} from '../utils/constants';
import { useStore, useTranslation } from '../hooks';
import { IChevronDown, IChevronUp } from '../assets/icons';

export type SettingsType = 'about' | 'general' | 'data' | 'display';

function Settings() {
  const t = useTranslation();
  const { settings, translation } = useStore();

  // render functions can safely access store
  // since they are wrapped in `Observer` in `SettingsPanel`
  const panels = useMemo<SettingsPanelProps[]>(
    () => [
      { type: 'about', title: t('About') },
      {
        type: 'data',
        title: t('Data'),
        items: [
          {
            title: t('Sort Rule'),
            render: () => (
              <>
                <SSelect
                  className='settings-sort-rule'
                  value={settings.sort.key}
                  onChange={(val) => settings.updateSort({ key: val })}
                  map={MAP_SORT_RULE}
                />
                <SSwitch
                  value={settings.sort.rule < 0}
                  onChange={(value) =>
                    settings.updateSort({ rule: value ? -1 : 1 })
                  }
                  ITrue={IChevronDown}
                  IFalse={IChevronUp}
                />
              </>
            ),
          },
          {
            title: t('Max Combatants'),
            render: () => (
              <SInputNumber
                value={settings.playerLimit}
                onChange={(value) => settings.updatePlayerLimit(value)}
                min={1}
                max={24}
                step={1}
                accuracy={0}
              />
            ),
          },
          {
            title: t('Show Limit Break'),
            render: () => (
              <SSwitch
                value={settings.showLB}
                onChange={(value) => settings.updateShowLB(value)}
              />
            ),
          },
          {
            title: t('Custom ID'),
            render: () => (
              <SInput
                value={settings.youName}
                onChange={(val) => settings.updateYouName(val)}
              />
            ),
          },
          {
            title: t('Pet-Merging ID'),
            render: () => (
              <SInput
                value={settings.petMergeID}
                onChange={(value) => settings.updatePetMergeID(value)}
              />
            ),
          },
          {
            title: t('Auto Short Number'),
            render: () => (
              <SSwitch
                value={settings.shortNumber}
                onChange={(val) => settings.updateShortNumber(val)}
              />
            ),
          },
        ],
      },
      {
        type: 'display',
        title: t('Display'),
        items: [
          {
            title: t('Display Mode'),
            render: () => (
              <SSelect
                value={settings.dispMode}
                onChange={(val) => settings.updateDispMode(val)}
                map={MAP_DISPLAY_MODE}
              />
            ),
          },
          {
            title: t('Display Content'),
            render: () => (
              <>
                <SSelect
                  className='settings-display-content'
                  value={settings.dispContent.left}
                  onChange={(val) => settings.updateDispContent({ left: val })}
                  disabled={settings.dispMode === 'single'}
                  map={MAP_DISPLAY_CONTENT}
                />
                <SSelect
                  className='settings-display-content'
                  value={settings.dispContent.right}
                  onChange={(val) => settings.updateDispContent({ right: val })}
                  map={MAP_DISPLAY_CONTENT}
                />
              </>
            ),
          },
          {
            title: t('Highlight Self'),
            render: () => (
              <SSwitch
                value={settings.hlYou}
                onChange={(val) => settings.updateHlYou(val)}
              />
            ),
          },
          {
            title: t('Tickers Display'),
            render: () => (
              <>
                <SSelect
                  className='settings-ticker-display'
                  value={settings.ticker.top}
                  onChange={(val) => settings.updateTicker({ top: val })}
                  map={MAP_TICKER}
                  position='top'
                />
                <SSelect
                  className='settings-ticker-display'
                  value={settings.ticker.bottom}
                  onChange={(val) => settings.updateTicker({ bottom: val })}
                  map={MAP_TICKER}
                  position='top'
                />
              </>
            ),
          },
          {
            title: t('Tickers Align'),
            render: () => (
              <>
                <SSelect
                  className='settings-ticker-align'
                  value={settings.tickerAlign.top}
                  onChange={(val) => settings.updateTickerAlign({ top: val })}
                  disabled={settings.ticker.top === 'none'}
                  map={MAP_TICKER_ALIGN}
                  position='top'
                />
                <SSelect
                  className='settings-ticker-align'
                  value={settings.tickerAlign.bottom}
                  onChange={(val) =>
                    settings.updateTickerAlign({ bottom: val })
                  }
                  disabled={settings.ticker.bottom === 'none'}
                  map={MAP_TICKER_ALIGN}
                  position='top'
                />
              </>
            ),
          },
          {
            title: t('Bottom Display'),
            render: () => (
              <SSelect
                value={settings.bottomDisp}
                onChange={(val) => settings.updateBottomDisp(val)}
                map={MAP_BOTTOM_DISP}
                position='top'
              />
            ),
          },
          {
            title: t('Shorten Name'),
            render: () => (
              <SSelect
                value={settings.shortName}
                onChange={(val) => settings.updateShortName(val)}
                map={MAP_SHORT_NAME}
                position='top'
              />
            ),
          },
        ],
      },
      {
        type: 'general',
        title: t('General'),
        items: [
          {
            title: t('Theme'),
            render: () => (
              <SSelect
                className='settings-theme'
                value={settings.theme}
                onChange={(val) => settings.updateTheme(val)}
                map={MAP_THEMES}
              />
            ),
          },
          {
            title: t('Language'),
            render: () => (
              <SSelect
                value={settings.lang}
                onChange={(val) => {
                  settings.updateLang(val);
                  translation.setTranslation(val);
                }}
                map={MAP_LANG}
              />
            ),
          },
          {
            title: t('UI Scale'),
            render: () => (
              <SInputNumber
                value={settings.zoom}
                onChange={(val) => settings.updateZoom(val)}
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
                value={settings.opacity}
                onChange={(val) => settings.updateOpacity(val)}
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
                  value={settings.fonts.family}
                  onChange={(family) => settings.updateFonts({ family })}
                  map={MAP_FONT_FAMILY}
                  position='top'
                />
                <SSelect
                  className='settings-font-weight'
                  value={settings.fonts.weight}
                  onChange={(weight) => settings.updateFonts({ weight })}
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
                value={settings.customCSS}
                onChange={(val) => settings.updateCustomCSS(val)}
              />
            ),
          },
          {
            title: t('Transfer Settings'),
            render: () => <SettingsTransfer />,
            observe: false,
          },
        ],
      },
    ],
    [settings, t, translation]
  );

  const [activeType, setActiveType] = useState<SettingsType>('about');
  const activePanelProps = useMemo<SettingsPanelProps>(
    () => panels.find((p) => p.type === activeType) || panels[0],
    [activeType, panels]
  );

  return settings.showSettings ? (
    <div className='settings'>
      <div className='settings-tab'>
        {panels.map(({ type, title }) => (
          <div
            className={clsx('settings-tabitem', {
              'settings-tabitem--active': type === activeType,
            })}
            key={`tab-${type}`}
            onClick={() => setActiveType(type)}
          >
            {title}
          </div>
        ))}
      </div>
      <div className='settings-content'>
        {activeType === 'about' ? (
          <SettingsAbout />
        ) : (
          <SettingsPanel {...activePanelProps} />
        )}
      </div>
    </div>
  ) : null;
}

export default observer(Settings);
