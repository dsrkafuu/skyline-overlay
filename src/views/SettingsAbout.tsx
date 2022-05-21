import { useCallback } from 'react';
import { date } from '../assets/meta';
import { useAppSelector, useTranslation } from '../hooks';
import themes from '../themes';

function SettingsAbout() {
  const t = useTranslation();

  const toDate = useCallback((date: Date, lang: string) => {
    try {
      return date.toLocaleString(lang);
    } catch {
      return date.toLocaleString();
    }
  }, []);

  const lang = useAppSelector((state) => state.settings.lang);
  const theme = useAppSelector((state) => state.theme.theme);
  const parsedDate = toDate(new Date(date), lang);
  const themeAuthor = themes[theme].data.author;

  return (
    <div className='settings-about'>
      <div className='settings-row'>
        <span className='settings-title'>
          {t('Need Help', 0)}
          <a
            className='g-link'
            href='https://github.com/dsrkafuu/skyline-overlay#add-translations'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('Need Help', 1)}
          </a>
          {t('Need Help', 2)}
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>
          {t('Request Issue', 0)}
          <a
            className='g-link'
            href='https://github.com/dsrkafuu/skyline-overlay/issues'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('Request Issue', 1)}
          </a>
          {t('Request Issue', 2)}
        </span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Build Date')}</span>
        <span className='settings-title'>{parsedDate}</span>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Theme Credits')}</span>
        <a
          className='g-link'
          href={themeAuthor.link}
          target='_blank'
          rel='noopener noreferrer'
        >
          {themeAuthor.name}
        </a>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{`Copyright ${new Date().getFullYear()} Apache-2.0 License`}</span>
        <a
          className='g-link'
          href='https://dsrkafuu.net'
          target='_blank'
          rel='noopener noreferrer'
        >
          DSRKafuU
        </a>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>Copyright 2015 MIT License</span>
        <a
          className='g-link'
          href='https://github.com/ionic-team/ionicons'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ionicons
        </a>
      </div>
      <div className='settings-row'>
        <span className='settings-title'>
          Copyright 2010 SQUARE ENIX CO., LTD.
        </span>
        <a
          className='g-link'
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

export default SettingsAbout;
