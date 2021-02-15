import React from 'react';

function SettingsAbout() {
  return (
    <div className='settings-about'>
      <div className='settings-row'>
        <span className='settings-title'>{`Copyright ${new Date().getFullYear()} Apache-2.0 License`}</span>
        <a className='s-link' href='https://dsrkafuu.co' target='_blank' rel='noreferrer'>
          DSRKafuU
        </a>
      </div>
    </div>
  );
}

export default SettingsAbout;
