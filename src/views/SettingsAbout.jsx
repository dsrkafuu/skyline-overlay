import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { latest } from '@/assets/changelog';
import useSettings from '@/hooks/useSettings';

function SettingsAbout() {
  const { t } = useTranslation(); // i18n

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

  // data
  const [lang] = useSettings('lang');
  const date = useMemo(() => toDate(new Date(latest.date), lang), [lang, toDate]);

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
        <span className='settings-title'>{date}</span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{`Copyright ${new Date().getFullYear()} Apache-2.0 License`}</span>
        <a className='s-link' href='https://dsrkafuu.su' target='_blank' rel='noopener noreferrer'>
          DSRKafuU
        </a>
      </div>
    </div>
  );
}

export default memo(SettingsAbout);
