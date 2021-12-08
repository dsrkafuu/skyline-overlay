import { makeAutoObservable } from 'mobx';
import lang from '../../lang';
import { LangMapKey } from '../../utils/constants';
import { getLS, setLS } from '../../utils/storage';

interface PartialSettingsWithLang {
  lang?: LangMapKey;
}

interface TranslationData {
  [key: string]: string;
}

const defaultData: TranslationData = lang.en.translation;

class Translation {
  /** @mobx state */

  data: TranslationData = defaultData;

  /**
   * @constructor
   */
  constructor() {
    // get initial language from storage , if not exist then auto detected
    const settings = (getLS('settings') || {}) as PartialSettingsWithLang;
    if (!settings.lang) {
      const detectedLang = navigator.language.substr(0, 2);
      if (Object.keys(lang).includes(detectedLang)) {
        // if detected language is supported
        settings.lang = detectedLang as LangMapKey;
        setLS('settings', settings);
      } else {
        // keep english as default
        settings.lang = 'en';
      }
    }
    this.setTranslation(settings.lang);
    document.documentElement.setAttribute('lang', settings.lang);

    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** @mobx actions */

  /**
   * set language
   */
  setTranslation(targetLang: LangMapKey) {
    this.data = Object.assign({}, defaultData, lang[targetLang].translation);
    document.documentElement.setAttribute('lang', targetLang);
  }
}

export default Translation;
