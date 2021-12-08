import './Settings.scss';
import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import SettingsAbout from './SettingsAbout';
import SettingsPanel, { SettingsPanelProps } from './SettingsPanel';
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
} from '../utils/constants';
import { useStore, useTranslation } from '../hooks';
import { IChevronDown, IChevronUp } from '../assets/icons';

export type SettingsType = 'about' | 'general' | 'data' | 'display';

function Settings() {
  const t = useTranslation();
  const { settings: s } = useStore();

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
                  value={s.sort.key}
                  onChange={(val) => s.updateSort({ key: val })}
                  map={MAP_SORT_RULE}
                />
                <SSwitch
                  value={s.sort.rule < 0}
                  onChange={(value) => s.updateSort({ rule: value ? -1 : 1 })}
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
                value={s.playerLimit}
                onChange={(value) => s.updatePlayerLimit(value)}
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
                value={s.showLB}
                onChange={(value) => s.updateShowLB(value)}
              />
            ),
          },
          {
            title: t('Custom ID'),
            render: () => (
              <SInput
                value={s.youName}
                onChange={(val) => s.updateYouName(val)}
              />
            ),
          },
          {
            title: t('Pet-Merging ID'),
            render: () => (
              <SInput
                value={s.petMergeID}
                onChange={(value) => s.updatePetMergeID(value)}
              />
            ),
          },
          {
            title: t('Auto Short Number'),
            render: () => (
              <SSwitch
                value={s.shortNumber}
                onChange={(val) => s.updateShortNumber(val)}
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
                value={s.dispMode}
                onChange={(val) => s.updateDispMode(val)}
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
                  value={s.dispContent.left}
                  onChange={(val) => s.updateDispContent({ left: val })}
                  disabled={s.dispMode === 'single'}
                  map={MAP_DISPLAY_CONTENT}
                />
                <SSelect
                  className='settings-display-content'
                  value={s.dispContent.right}
                  onChange={(val) => s.updateDispContent({ right: val })}
                  map={MAP_DISPLAY_CONTENT}
                />
              </>
            ),
          },
          {
            title: t('Highlight Self'),
            render: () => (
              <SSwitch value={s.hlYou} onChange={(val) => s.updateHlYou(val)} />
            ),
          },
          {
            title: t('Tickers Display'),
            render: () => (
              <>
                <SSelect
                  className='settings-ticker-display'
                  value={s.ticker.top}
                  onChange={(val) => s.updateTicker({ top: val })}
                  map={MAP_TICKER}
                />
                <SSelect
                  className='settings-ticker-display'
                  value={s.ticker.bottom}
                  onChange={(val) => s.updateTicker({ bottom: val })}
                  map={MAP_TICKER}
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
                  value={s.tickerAlign.top}
                  onChange={(val) => s.updateTickerAlign({ top: val })}
                  disabled={s.ticker.top === 'none'}
                  map={MAP_TICKER_ALIGN}
                />
                <SSelect
                  className='settings-ticker-align'
                  value={s.tickerAlign.bottom}
                  onChange={(val) => s.updateTickerAlign({ bottom: val })}
                  disabled={s.ticker.bottom === 'none'}
                  map={MAP_TICKER_ALIGN}
                />
              </>
            ),
          },
          {
            title: t('Bottom Display'),
            render: () => (
              <SSelect
                value={s.bottomDisp}
                onChange={(val) => s.updateBottomDisp(val)}
                map={MAP_BOTTOM_DISP}
              />
            ),
          },
          {
            title: t('Shorten Name'),
            render: () => (
              <SSelect
                value={s.shortName}
                onChange={(val) => s.updateShortName(val)}
                map={MAP_SHORT_NAME}
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
                value={s.theme}
                onChange={(val) => s.updateTheme(val)}
                map={MAP_THEMES}
              />
            ),
          },
          {
            title: t('Language'),
            render: () => (
              <SSelect
                value={s.lang}
                onChange={(val) => s.updateLang(val)}
                map={MAP_LANG}
              />
            ),
          },
          {
            title: t('UI Scale'),
            render: () => (
              <SInputNumber
                value={s.zoom}
                onChange={(val) => s.updateZoom(val)}
                min={0.4}
                max={4}
                step={0.2}
                accuracy={1}
              />
            ),
          },
          {
            title: t('Custom CSS'),
            render: () => (
              <SInput
                className='settings-custom-css'
                value={s.customCSS}
                onChange={(val) => s.updateCustomCSS(val)}
              />
            ),
          },
        ],
      },
    ],
    [s, t]
  );

  const [activeType, setActiveType] = useState<SettingsType>('about');
  const activePanelProps = useMemo<SettingsPanelProps>(
    () => panels.find((p) => p.type === activeType) || panels[0],
    [activeType, panels]
  );

  return s.showSettings ? (
    <div className='settings'>
      <div className='settings-tab'>
        {panels.map(({ type, title }) => (
          <div
            className={cn('settings-tabitem', {
              active: type === activeType,
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
