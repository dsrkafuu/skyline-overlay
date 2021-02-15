import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Settings.scss';

import SettingsAbout from './SettingsAbout';
import SettingsData from './SettingsData';
import SettingsLayout from './SettingsLayout';

const Components = [
  { title: 'About', component: <SettingsAbout /> },
  { title: 'Data', component: <SettingsData /> },
  { title: 'Layout', component: <SettingsLayout /> },
];

function Settings() {
  const transRef = useRef();
  const [activeTab, setActiveTab] = useState(0);

  // settings data
  const showSettings = useSelector((state) => state.settings.showSettings);

  return (
    <CSSTransition
      classNames='fade'
      in={showSettings}
      timeout={150}
      unmountOnExit
      nodeRef={transRef}
    >
      <div className='settings' ref={transRef}>
        <div className='settings-tab'>
          {Components.map((val, index) => (
            <div
              className={classNames('settings-tabitem', { active: index === activeTab })}
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
}

export default Settings;
