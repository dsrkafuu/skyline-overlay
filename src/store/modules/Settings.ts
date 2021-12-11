import { makeAutoObservable } from 'mobx';
import { Store } from '..';
import { setLS, getLS } from '../../utils/storage';
import { xssEscape } from '../../utils/lodash';
import {
  LangMapKey,
  ShortNameMapKey,
  SortRuleMapKey,
  ThemeMapKey,
  DisplayModeMapKey,
  DisplayContentMapKey,
  TickerAlignMapKey,
  TickerMapKey,
  BottomDispMapKey,
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

interface SortSettings {
  key: SortRuleMapKey;
  rule: -1 | 1;
}
interface PartialSortSettings {
  key?: SortRuleMapKey;
  rule?: -1 | 1;
}

interface DispContentSettings {
  left: DisplayContentMapKey;
  right: DisplayContentMapKey;
}
interface PartialDispContentSettings {
  left?: DisplayContentMapKey;
  right?: DisplayContentMapKey;
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
  rootStore: Store = null as never;

  /** @mobx state */

  // settings container display
  showCombatants = true;
  showSettings = false;
  blurName = false;

  // data
  sort: SortSettings = { key: 'dps', rule: -1 };
  playerLimit = 8; // combatant limit
  showLB = true;
  youName = 'YOU'; // which to represent as 'YOU'
  petMergeID = ''; // merge pet data when using global client with cn language patch
  bottomDisp: BottomDispMapKey = 'maxhit';

  // display
  dispMode: DisplayModeMapKey = 'single';
  dispContent: DispContentSettings = { left: 'hps', right: 'dps' };
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
  constructor(rootStore: Store) {
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
    customStyles.setAttribute('id', 'skyline-custom-css');
    customStyles.innerHTML = xssEscape(this.customCSS);
    document.head.appendChild(customStyles);

    // init mobx
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }

  /** @mobx actions */

  toggleShowCombatants(payload?: boolean) {
    if (payload !== undefined) {
      this.showCombatants = payload;
    } else {
      this.showCombatants = !this.showCombatants;
    }
    saveSettings({ showCombatants: this.showCombatants });
  }
  toggleSettings() {
    this.showSettings = !this.showSettings;
    saveSettings({ showSettings: this.showSettings });
  }
  toggleBlurName() {
    this.blurName = !this.blurName;
    saveSettings({ blurName: this.blurName });
  }

  // data
  updateSort(payload: PartialSortSettings) {
    this.sort = { ...this.sort, ...payload };
    saveSettings({ sort: this.sort });
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
  updateBottomDisp(payload: BottomDispMapKey) {
    this.bottomDisp = payload;
    saveSettings({ bottomDisp: payload });
  }

  /* display */
  updateDispMode(payload: DisplayModeMapKey) {
    this.dispMode = payload;
    saveSettings({ dispMode: payload });
  }
  updateDispContent(payload: PartialDispContentSettings) {
    this.dispContent = { ...this.dispContent, ...payload };
    saveSettings({ dispContent: this.dispContent });
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
    this.rootStore.translation.setTranslation(payload);
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
    const customStyles = document.querySelector('#skyline-custom-css');
    if (customStyles) {
      customStyles.innerHTML = xssEscape(payload);
    }
    saveSettings({ customCSS: payload });
  }
}

export default Settings;
