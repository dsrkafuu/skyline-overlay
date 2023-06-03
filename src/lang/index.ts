import en from './en.json';
import ja from './ja.json';
import zh from './zh.json';
import de from './de.json';
import ko from './ko.json';
import fr from './fr.json';

export interface TranslationData {
  [key: string]: string | undefined;
}

export default {
  en: { text: en.LANG, translation: en as TranslationData },
  ja: { text: ja.LANG, translation: ja as TranslationData },
  zh: { text: zh.LANG, translation: zh as TranslationData },
  de: { text: de.LANG, translation: de as TranslationData },
  ko: { text: ko.LANG, translation: ko as TranslationData },
  fr: { text: fr.LANG, translation: fr as TranslationData }
};
