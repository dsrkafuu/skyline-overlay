import React from 'react';

function SettingsAbout() {
  return (
    <div className='settings-about'>
      <div className='settings-row'>
        <span className='settings-title'>
          Thanks for using the overlay which is still in dev stage.
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>
          Please
          <a
            className='s-link'
            href='https://github.com/dsrkafuu/skyline-overlay/issues'
            target='_blank'
            rel='noreferrer'
          >
            raise an issue
          </a>
          if you have questions or ideas.
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{`Copyright ${new Date().getFullYear()} Apache-2.0 License`}</span>
        <a className='s-link' href='https://dsrkafuu.su' target='_blank' rel='noreferrer'>
          DSRKafuU
        </a>
      </div>
    </div>
  );
}

export default SettingsAbout;
