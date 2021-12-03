import { makeAutoObservable } from 'mobx';
import xss from 'xss';
import i18n from '../../i18n';
import { setLS, getLS } from '../../utils/storage';

interface PartialSettings {
  [key: string]: number | string | boolean;
}

/**
 * save settings to local storage
 */
function saveSettings(settings: PartialSettings) {
  const savedSettings = (getLS('settings') || {}) as PartialSettings;
  const newSettings = { ...savedSettings, ...settings };
  setLS('settings', newSettings);
}

class Settings {
  /** @mobx state */

  // settings container display
  showSettings = false;
  blurName = false;

  // data
  sortRule = -1; // sort data
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
  shortName = 'fstlst';
  shortNumber = false;

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
    const savedSettings = (getLS('settings') || {}) as PartialSettings;
    for (const key of Object.keys(savedSettings)) {
      // @ts-expect-error merge PartialSettings into Settings
      this[key] = savedSettings[key];
    }

    // apply initial theme
    document.body.setAttribute('data-theme', this.theme);
    // apply initial lang
    document.documentElement.setAttribute('lang', this.lang);
    // apply initial zoom
    document.documentElement.style.fontSize = `${
      Math.floor(100 * this.zoom) || 100
    }px`;
    // apply initial custom style
    const customStyles = document.createElement('style');
    customStyles.setAttribute('id', 'skyline-ccss');
    customStyles.innerHTML = xss(this.customCSS);
    document.head.appendChild(customStyles);

    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** @mobx actions */

  toggleSettings() {
    this.showSettings = !this.showSettings;
    saveSettings({ showSettings: this.showSettings });
  }
  toggleBlurName() {
    this.blurName = !this.blurName;
    saveSettings({ blurName: this.blurName });
  }

  // data
  updateSortRule(payload: number) {
    this.sortRule = payload;
    saveSettings({ sortRule: payload });
  }
  updatePlayerLimit(payload: number) {
    this.playerLimit = payload;
    saveSettings({ playerLimit: payload });
  }
  updateShowLB(payload: boolean) {
    this.showLB = payload;
    saveSettings({ showLB: payload });
  }
  updatePetMergeID(payload: string) {
    this.petMergeID = payload;
    saveSettings({ petMergeID: payload });
  }
  updateShowHPS(payload: boolean) {
    this.showHPS = payload;
    saveSettings({ showHPS: payload });
  }
  updateExtendDetail(payload: boolean) {
    this.extendDetail = payload;
    saveSettings({ extendDetail: payload });
  }
  updateBottomDisp(payload: string) {
    this.bottomDisp = payload;
    saveSettings({ bottomDisp: payload });
  }

  /* display */
  updateShowRanks(payload: boolean) {
    this.showRanks = payload;
    saveSettings({ showRanks: payload });
  }
  updateHlYou(payload: boolean) {
    this.hlYou = payload;
    saveSettings({ hlYou: payload });
  }
  updateShowTickers(payload: boolean) {
    this.showTickers = payload;
    saveSettings({ showTickers: payload });
  }
  updateYouName(payload: string) {
    this.youName = payload;
    saveSettings({ youName: payload });
  }
  updateShortName(payload: string) {
    this.shortName = payload;
    saveSettings({ shortName: payload });
  }
  updateShortNumber(payload: boolean) {
    this.shortNumber = payload;
    saveSettings({ shortNumber: payload });
  }

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
    document.documentElement.style.fontSize = `${
      Math.floor(100 * payload) || 100
    }px`;
    saveSettings({ zoom: payload });
  }
  updateCustomCSS(payload: string) {
    this.customCSS = payload;
    const customStyles = document.querySelector('#skyline-ccss');
    if (customStyles) {
      customStyles.innerHTML = xss(payload);
    }
    saveSettings({ customCSS: payload });
  }
}

export default Settings;
