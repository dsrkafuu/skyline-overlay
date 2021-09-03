import { makeAutoObservable } from 'mobx';
import i18n from '@/i18n';
import { setLS, getLS } from '@/utils/storage';

/**
 * save settings to local storage
 * @param {Object} settings
 */
function saveSettings(settings) {
  const savedSettings = getLS('settings') || {};
  const newSettings = { ...savedSettings, ...settings };
  setLS('settings', newSettings);
}

/**
 * get a unified function to update value
 * @param {string} key
 */
function getAction(key) {
  /**
   * @param {boolean|string|number} payload
   */
  return function (payload) {
    this[key] = payload;
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
  showTickers = true;
  showHPS = false;
  extendDetail = false;

  // display
  showRanks = false; // show rank number before id
  hlYou = true; // highlight 'YOU'
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
    const savedSettings = getLS('settings') || {};
    for (const key of Object.keys(savedSettings)) {
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
  /**
   * @param {{ key: string, value: number }} payload
   */
  updateSortRule(payload) {
    const { key, value } = payload;
    console.log(this);
    this.sortRule = { key, value };
    saveSettings({ sortRule: { key, value } });
  }
  /**
   * @param {number} payload
   */
  updatePlayerLimit(payload) {
    if (payload > 0) {
      this.playerLimit = payload;
      saveSettings({ playerLimit: payload });
    }
  }
  updateShowLB = getAction('showLB');
  updateShowTickers = getAction('showTickers');
  updateShowHPS = getAction('showHPS');
  updateExtendDetail = getAction('extendDetail');

  /* display */
  updateShowRanks = getAction('showRanks');
  updateHlYou = getAction('hlYou');
  updateYouName = getAction('youName');
  /**
   * @param {{ first: boolean, last: boolean }} payload
   */
  updateShortName(payload) {
    const { first, last } = payload;
    this.shortName = { first, last };
    saveSettings({ shortName: { first, last } });
  }
  updateShortNumber = getAction('shortNumber');
  updateBlurName = getAction('blurName');

  /* layout */
  /**
   * @param {string} payload
   */
  updateTheme(payload) {
    this.theme = payload;
    if (payload === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', payload);
    }
    saveSettings({ theme: payload });
  }
  /**
   * @param {string} payload
   */
  updateLang(payload) {
    this.lang = payload;
    i18n.changeLanguage(payload);
    document.documentElement.setAttribute('lang', payload);
    saveSettings({ lang: payload });
  }
  /**
   * @param {number} payload
   */
  updateZoom(payload) {
    this.zoom = payload;
    document.documentElement.style.fontSize = `${Math.floor(100 * payload) || 100}px`;
    saveSettings({ zoom: payload });
  }
  /**
   * @param {number} payload
   */
  updateCustomCSS(payload) {
    this.customCSS = payload;
    const customStyles = document.querySelector('#skyline-ccss');
    if (customStyles) {
      customStyles.innerHTML = payload;
    }
    saveSettings({ customCSS: payload });
  }
}

export default Settings;
