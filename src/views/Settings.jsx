import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Settings.scss';
import SettingsAbout from './SettingsAbout';
import SettingsData from './SettingsData';
import SettingsDisplay from './SettingsDisplay';
import SettingsGeneral from './SettingsGeneral';
import useStore from '@/hooks/useStore';

const Settings = observer(() => {
  const { t } = useTranslation();

  const Components = useMemo(
    () => [
      { title: t('About'), component: <SettingsAbout /> },
      { title: t('Data'), component: <SettingsData /> },
      { title: t('Display'), component: <SettingsDisplay /> },
      { title: t('General'), component: <SettingsGeneral /> },
    ],
    [t]
  );

  const transRef = useRef(); // ref for react-transition-group
  const [activeTab, setActiveTab] = useState(0);

  // settings data
  const {
    settings: { showSettings },
  } = useStore();

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
              className={cn('settings-tabitem', { active: index === activeTab })}
              key={`tab-${val.title}`}
              onClick={() => setActiveTab(index)}
            >
              {val.title}
            </div>
          ))}
        </div>
        <div className='settings-content'>{Components[activeTab].component}</div>
      </div>
    </CSSTransition>
  );
});

export default Settings;
