import './Settings.scss';
import SettingsAbout from './SettingsAbout';
import SettingsData from './SettingsData';
import SettingsDisplay from './SettingsDisplay';
import SettingsGeneral from './SettingsGeneral';
import SettingsHistory from './SettingsHistory';
import SettingsTheme from './SettingsTheme';
import { useAppSelector, useTranslation } from '@/hooks';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

function Settings() {
  const t = useTranslation();
  const showSettings = useAppSelector((state) => state.settings.showSettings);
  const layoutMode = useAppSelector((state) => state.settings.layoutMode);

  const panels = useMemo(
    () => [
      { type: 'history', title: t('History') },
      { type: 'about', title: t('About') },
      { type: 'data', title: t('Data') },
      { type: 'display', title: t('Display') },
      { type: 'general', title: t('General') },
      { type: 'theme', title: t('Theme') },
    ],
    [t]
  );

  const [activeType, setActiveType] = useState('history');

  let ActivePanel: React.FC;
  switch (activeType) {
    case 'history':
      ActivePanel = SettingsHistory;
      break;
    case 'data':
      ActivePanel = SettingsData;
      break;
    case 'display':
      ActivePanel = SettingsDisplay;
      break;
    case 'general':
      ActivePanel = SettingsGeneral;
      break;
    case 'theme':
      ActivePanel = SettingsTheme;
      break;
    default:
      ActivePanel = SettingsAbout;
  }

  return !showSettings ? null : (
    <div
      className={clsx({
        settings: true,
        'settings-reverse': layoutMode === 'reverse',
      })}
    >
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
        <ActivePanel />
      </div>
    </div>
  );
}

export default Settings;
