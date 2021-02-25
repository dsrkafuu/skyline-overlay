import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

function SettingsAbout() {
  const { t } = useTranslation(); // i18n

  return (
    <div className='settings-about'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Thanks for Using')}</span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>
          <Trans i18nKey='Request Issue'>
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
          </Trans>
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
