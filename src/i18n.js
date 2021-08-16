import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { isDev } from './utils/env';
import { getLS } from './utils/storage';

import lang from './lang';

// get initial language from storage , if not exist then auto detected
let _settings=(getLS('settings') || {});
if(!_settings.lang){
  _settings.lang = navigator.language.substr(0,2);
  setLS('settings',_settings);
}
const lng = _settings.lang;
document.documentElement.setAttribute('lang', lng);

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
