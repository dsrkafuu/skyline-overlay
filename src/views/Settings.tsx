import { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Settings.scss';
import SettingsAbout from './SettingsAbout';
import SettingsPanel, { SettingsPanelProps } from './SettingsPanel';
import { SInputNumber, SSelect, SInput, SSwitch } from '../components';
import {
  MAP_LANG,
  MAP_THEMES,
  MAP_BOTTOM_DISP,
  MAP_SHORT_NAME,
  MAP_SORT_RULE,
} from '../utils/constants';
import useStore from '../hooks/useStore';
import { IChevronDown, IChevronUp } from '../assets/icons';

export type SettingsType = 'about' | 'general' | 'data' | 'display';

function Settings() {
  const { t } = useTranslation();
  const { settings: s } = useStore();

  const transRef = useRef<HTMLDivElement>(null); // ref for react-transition-group

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
                  value={s.sortKey}
                  onChange={(val) => s.updateSortKey(val)}
                  map={MAP_SORT_RULE}
                />
                <SSwitch
                  value={s.sortRule < 0}
                  onChange={(value) => s.updateSortRule(value ? -1 : 1)}
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
            title: t('Pet-Merging ID'),
            render: () => (
              <SInput
                value={s.petMergeID}
                onChange={(value) => s.updatePetMergeID(value)}
              />
            ),
          },
          {
            title: t('Show HPS'),
            render: () => (
              <SSwitch
                value={s.showHPS}
                onChange={(value) => s.updateShowHPS(value)}
              />
            ),
          },
          {
            title: t('Extend Detail'),
            render: () => (
              <SSwitch
                value={s.extendDetail}
                onChange={(value) => s.updateExtendDetail(value)}
              />
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
        ],
      },
      {
        type: 'display',
        title: t('Display'),
        items: [
          {
            title: t('Show Ranks'),
            render: () => (
              <SSwitch
                value={s.showRanks}
                onChange={(val) => s.updateShowRanks(val)}
              />
            ),
          },
          {
            title: t('Highlight Self'),
            render: () => (
              <SSwitch value={s.hlYou} onChange={(val) => s.updateHlYou(val)} />
            ),
          },
          {
            title: t('Show Tickers'),
            render: () => (
              <SSwitch
                value={s.showTickers}
                onChange={(val) => s.updateShowTickers(val)}
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
            title: t('Shorten Name'),
            render: () => (
              <SSelect
                value={s.shortName}
                onChange={(val) => s.updateShortName(val)}
                map={MAP_SHORT_NAME}
              />
            ),
          },
          {
            title: t('Shorten Number'),
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
                className='settings-ccss'
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

  return (
    <CSSTransition
      classNames='fade'
      in={Boolean(s.showSettings)}
      timeout={150}
      unmountOnExit
      nodeRef={transRef}
    >
      <div className='settings' ref={transRef}>
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
    </CSSTransition>
  );
}

export default observer(Settings);
