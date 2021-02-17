import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { isDev } from './utils/env';
import { getLS } from './utils/storage';

import lang from './lang';

i18n.use(initReactI18next).init({
  resources: lang,
  // get initial language from storage
  lng: (getLS('settings') || {}).lang || 'en-US',
  fallbackLng: 'en-US',

  debug: isDev(),
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
