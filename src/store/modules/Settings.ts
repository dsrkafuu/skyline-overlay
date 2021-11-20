import { makeAutoObservable } from 'mobx';
import i18n from '../../i18n';
import { setLS, getLS } from '../../utils/storage';

interface SavedPartialSettings {
  [key: string]: unknown;
}

/**
 * save settings to local storage
 */
function saveSettings(settings: { [key: string]: unknown }) {
  const savedSettings = (getLS('settings') || {}) as SavedPartialSettings;
  const newSettings = { ...savedSettings, ...settings };
  setLS('settings', newSettings);
}

/**
 * get a unified function to update value
 */
function getAction<T>(key: keyof Settings) {
  return function (payload: T) {
    // @ts-expect-error incompatible T
    (this[key] as T) = payload;
    saveSettings({ [key]: payload });
  };
}

class Settings {
  /** @mobx state */

  // settings container display
  showSettings = false;
  minimalMode = false;

  // data
  sortRule = { key: 'dps', value: -1 }; // sort data
  playerLimit = 8; // combatant limit
  showLB = true;
  petMergeID = ''; // merge pet data when using global client with cn language patch
  showHPS = false;
  extendDetail = false;
  bottomDisp = 'maxhit';

  // display
  showRanks = false; // show rank number before id
  hlYou = true; // highlight 'YOU'
  showTickers = true;
  youName = 'YOU'; // which to represent as 'YOU'
  shortName = { first: false, last: false };
  shortNumber = false;
  blurName = false;

  // general
  theme = 'default';
  lang = 'en';
  zoom = 1;
  customCSS = '#root {}';

  /** @mobx computed */

  /**
   * @constructor
   */
  constructor() {
    // merge saved settings into default settings
    const savedSettings = (getLS('settings') || {}) as SavedPartialSettings;
    for (const key of Object.keys(savedSettings)) {
      // @ts-expect-error merge SavedPartialSettings into Settings
      this[key] = savedSettings[key];
    }

    // apply initial theme
    document.body.setAttribute('data-theme', this.theme);
    // apply initial lang
    document.documentElement.setAttribute('lang', this.lang);
    // apply initial zoom
    document.documentElement.style.fontSize = `${Math.floor(100 * this.zoom) || 100}px`;
    // apply initial custom style
    const customStyles = document.createElement('style');
    customStyles.setAttribute('id', 'skyline-custom-css');
    customStyles.innerHTML = this.customCSS;
    document.head.appendChild(customStyles);

    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** @mobx actions */

  toggleSettings() {
    this.showSettings = !this.showSettings;
    saveSettings({ showSettings: this.showSettings });
  }
  toggleMinimalMode() {
    this.minimalMode = !this.minimalMode;
    saveSettings({ minimalMode: this.minimalMode });
  }

  // data
  updateSortRule(payload: { key: string; value: number }) {
    const { key, value } = payload;
    this.sortRule = { key, value };
    saveSettings({ sortRule: { key, value } });
  }
  updatePlayerLimit(payload: number) {
    if (payload > 0) {
      this.playerLimit = payload;
      saveSettings({ playerLimit: payload });
    }
  }
  updateShowLB = getAction('showLB');
  updatePetMergeID = getAction('petMergeID');
  updateShowHPS = getAction('showHPS');
  updateExtendDetail = getAction('extendDetail');
  updateBottomDisp = getAction('bottomDisp');

  /* display */
  updateShowRanks = getAction('showRanks');
  updateHlYou = getAction('hlYou');
  updateShowTickers = getAction('showTickers');
  updateYouName = getAction('youName');
  updateShortName(payload: { first: boolean; last: boolean }) {
    const { first, last } = payload;
    this.shortName = { first, last };
    saveSettings({ shortName: { first, last } });
  }
  updateShortNumber = getAction('shortNumber');
  updateBlurName = getAction('blurName');

  /* layout */
  updateTheme(payload: string) {
    this.theme = payload;
    if (payload === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', payload);
    }
    saveSettings({ theme: payload });
  }
  updateLang(payload: string) {
    this.lang = payload;
    i18n.changeLanguage(payload);
    document.documentElement.setAttribute('lang', payload);
    saveSettings({ lang: payload });
  }
  updateZoom(payload: number) {
    this.zoom = payload;
    document.documentElement.style.fontSize = `${Math.floor(100 * payload) || 100}px`;
    saveSettings({ zoom: payload });
  }
  updateCustomCSS(payload: string) {
    this.customCSS = payload;
    const customStyles = document.querySelector('#skyline-ccss');
    if (customStyles) {
      customStyles.innerHTML = payload;
    }
    saveSettings({ customCSS: payload });
  }
}

export default Settings;
