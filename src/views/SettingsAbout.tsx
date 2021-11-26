import React, { useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { date } from '../assets/version';
import useStore from '../hooks/useStore';

function SettingsAbout() {
  const { t } = useTranslation();

  /**
   * @param {Date} date
   * @param {string} lang
   */
  const toDate = useCallback((date, lang) => {
    try {
      return date.toLocaleString(lang);
    } catch {
      return date.toLocaleString();
    }
  }, []);

  const {
    settings: { lang },
  } = useStore();
  const parsedDate = toDate(new Date(date), lang);

  return (
    <div className='settings-about'>
      {/*
    <div className='settings-row'>
      <span className='settings-title'>{t('Thanks for Using')}</span>
    </div>
    */}
      <div className='settings-row'>
        <span className='settings-title'>
          <Trans i18nKey='Need Help'>
            We need
            <a
              className='s-link'
              href='https://github.com/dsrkafuu/skyline-overlay#add-translations'
              target='_blank'
              rel='noopener noreferrer'
            >
              help
            </a>
            from more community translators!
          </Trans>
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>
          <Trans i18nKey='Request Issue'>
            Please
            <a
              className='s-link'
              href='https://github.com/dsrkafuu/skyline-overlay/issues'
              target='_blank'
              rel='noopener noreferrer'
            >
              raise an issue
            </a>
            if you have questions or ideas.
          </Trans>
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Release Date')}</span>
        <span className='settings-title'>{parsedDate}</span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{`Copyright ${new Date().getFullYear()} MPL-2.0 License`}</span>
        <a className='s-link' href='https://dsrkafuu.net' target='_blank' rel='noopener noreferrer'>
          DSRKafuU
        </a>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>Copyright 2015 MIT License</span>
        <a
          className='s-link'
          href='https://github.com/ionic-team/ionicons'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ionicons
        </a>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>Copyright 2010 SQUARE ENIX CO., LTD.</span>
        <a
          className='s-link'
          href='https://www.finalfantasyxiv.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          FFXIV
        </a>
      </div>
    </div>
  );
}

export default observer(SettingsAbout);
