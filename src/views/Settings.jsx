import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
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
  const [activeTab, setActiveTab] = useState(0);

  // settings data
  const showSettings = useSelector((state) => state.settings.showSettings);

  return (
    <Fragment>
      {showSettings && (
        <div className='settings'>
          <div className='settings-tab'>
            {Components.map((val, index) => (
              <div
                className={classNames('settings-tabitem', { active: index === activeTab })}
                key={val.title}
                onClick={() => setActiveTab(index)}
              >
                {val.title}
              </div>
            ))}
          </div>
          {Components[activeTab].component}
        </div>
      )}
    </Fragment>
  );
}

export default Settings;
