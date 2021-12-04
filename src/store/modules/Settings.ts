import { makeAutoObservable } from 'mobx';
import xss from 'xss';
import i18n from '../../i18n';
import { setLS, getLS } from '../../utils/storage';
import {
  LangMapKey,
  ShortNameMapKey,
  SortRuleMapKey,
  ThemeMapKey,
  TickerAlignMapKey,
  TickerMapKey,
} from '../../utils/constants';

interface PartialSettings {
  [key: string]: unknown;
}

/**
 * save settings to local storage
 */
function saveSettings(settings: PartialSettings) {
  const savedSettings = (getLS('settings') || {}) as PartialSettings;
  const newSettings = { ...savedSettings, ...settings };
  setLS('settings', newSettings);
}

interface TickerSettings {
  top: TickerMapKey;
  bottom: TickerMapKey;
}
interface PartialTickerSettings {
  top?: TickerMapKey;
  bottom?: TickerMapKey;
}

interface TickerAlignSettings {
  top: TickerAlignMapKey;
  bottom: TickerAlignMapKey;
}
interface PartialTickerAlignSettings {
  top?: TickerAlignMapKey;
  bottom?: TickerAlignMapKey;
}

class Settings {
  /** @mobx state */

  // settings container display
  showSettings = false;
  blurName = false;

  // data
  sortKey: SortRuleMapKey = 'dps'; // sort data
  sortRule: -1 | 1 = -1; // sort data
  playerLimit = 8; // combatant limit
  showLB = true;
  youName = 'YOU'; // which to represent as 'YOU'
  petMergeID = ''; // merge pet data when using global client with cn language patch
  extendDetail = false;
  bottomDisp = 'maxhit';

  // display
  showRanks = false; // show rank number before id
  hlYou = true; // highlight 'YOU'
  ticker: TickerSettings = { top: 'none', bottom: 'dps' };
  tickerAlign: TickerAlignSettings = { top: 'right', bottom: 'left' };
  shortName: ShortNameMapKey = 'fstlst';
  shortNumber = false;

  // general
  theme: ThemeMapKey = 'default';
  lang: LangMapKey = 'en';
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
  updateSortKey(payload: SortRuleMapKey) {
    this.sortKey = payload;
    saveSettings({ sortKey: payload });
  }
  updateSortRule(payload: -1 | 1) {
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
  updateYouName(payload: string) {
    this.youName = payload;
    saveSettings({ youName: payload });
  }
  updatePetMergeID(payload: string) {
    this.petMergeID = payload;
    saveSettings({ petMergeID: payload });
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
  updateTicker(payload: PartialTickerSettings) {
    this.ticker = { ...this.ticker, ...payload };
    saveSettings({ ticker: this.ticker });
  }
  updateTickerAlign(payload: PartialTickerAlignSettings) {
    this.tickerAlign = { ...this.tickerAlign, ...payload };
    saveSettings({ tickerAlign: this.tickerAlign });
  }
  updateShortName(payload: ShortNameMapKey) {
    this.shortName = payload;
    saveSettings({ shortName: payload });
  }
  updateShortNumber(payload: boolean) {
    this.shortNumber = payload;
    saveSettings({ shortNumber: payload });
  }

  /* layout */
  updateTheme(payload: ThemeMapKey) {
    this.theme = payload;
    if (payload === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', payload);
    }
    saveSettings({ theme: payload });
  }
  updateLang(payload: LangMapKey) {
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
