import { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Settings.scss';
import SettingsAbout from './SettingsAbout';
import SettingsData from './SettingsData';
import SettingsDisplay from './SettingsDisplay';
import SettingsGeneral from './SettingsGeneral';
import useStore from '../hooks/useStore';

function Settings() {
  const { t } = useTranslation();

  const Components = useMemo(
    () => [
      { title: t('About'), Component: SettingsAbout },
      { title: t('Data'), Component: SettingsData },
      { title: t('Display'), Component: SettingsDisplay },
      { title: t('General'), Component: SettingsGeneral },
    ],
    [t]
  );

  const transRef = useRef<HTMLDivElement>(null); // ref for react-transition-group
  const [activeTab, setActiveTab] = useState(0);

  // settings data
  const {
    settings: { showSettings },
  } = useStore();

  const ActiveComponent = Components[activeTab].Component;

  return (
    <CSSTransition
      classNames='fade'
      in={Boolean(showSettings)}
      timeout={150}
      unmountOnExit
      nodeRef={transRef}
    >
      <div className='settings' ref={transRef}>
        <div className='settings-tab'>
          {Components.map((val, index) => (
            <div
              className={cn('settings-tabitem', {
                active: index === activeTab,
              })}
              key={`tab-${val.title}`}
              onClick={() => setActiveTab(index)}
            >
              {val.title}
            </div>
          ))}
        </div>
        <div className='settings-content'>
          <ActiveComponent />
        </div>
      </div>
    </CSSTransition>
  );
}

export default observer(Settings);
