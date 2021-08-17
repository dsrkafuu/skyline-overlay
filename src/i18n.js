import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { isDev } from './utils/env';
import { getLS, setLS } from './utils/storage';

import lang from './lang';
const langs = Object.keys(lang);

// get initial language from storage , if not exist then auto detected
let lng = 'en';
const settings = getLS('settings') || {};
if (!settings.lang) {
  const sysLang = navigator.language.substr(0, 2);
  if (langs.includes(sysLang)) {
    settings.lang = sysLang;
    lng = sysLang;
    setLS('settings', settings);
  }
}

i18n.use(initReactI18next).init({
  resources: lang,
  // get initial language from storage
  lng,
  fallbackLng: 'en',
  keySeparator: false,

  debug: isDev(),
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
