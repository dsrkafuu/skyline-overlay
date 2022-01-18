import { makeAutoObservable } from 'mobx';
import { Store } from '..';
import lang from '../../lang';
import { LangMapKey } from '../../utils/constants';
import { getLS } from '../../utils/storage';

interface PartialSettingsWithLang {
  lang?: LangMapKey;
}

interface TranslationData {
  [key: string]: string;
}

const defaultData: TranslationData = lang.en.translation;

class Translation {
  rootStore: Store = null as never;

  /** @mobx state */

  data: TranslationData = defaultData;

  /**
   * @constructor
   */
  constructor(rootStore: Store) {
    this.rootStore = rootStore;

    let initialLang: LangMapKey;
    // get initial language from storage & browser
    const settings = (getLS('settings') || {}) as PartialSettingsWithLang;
    const detectedLang = navigator.language.substring(0, 2);
    // settings exist & valid
    if (settings.lang && Object.keys(lang).includes(settings.lang)) {
      initialLang = settings.lang;
    }
    // settings not exist or not valid
    else {
      // detected lang is supported
      if (Object.keys(lang).includes(detectedLang)) {
        initialLang = detectedLang as LangMapKey;
        this.rootStore.settings.updateLang(detectedLang as LangMapKey);
      }
      // detected lang not supported
      else {
        initialLang = 'en';
        this.rootStore.settings.updateLang('en');
      }
    }
    // set initial language
    this.setTranslation(initialLang);

    // init mobx
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }

  /** @mobx actions */

  /**
   * set language
   */
  setTranslation(targetLang: LangMapKey) {
    // ensure language exists
    const targetData = (lang[targetLang] || {}).translation || defaultData;
    this.data = Object.assign({}, defaultData, targetData);
    document.documentElement.setAttribute('lang', targetLang);
  }
}

export default Translation;
