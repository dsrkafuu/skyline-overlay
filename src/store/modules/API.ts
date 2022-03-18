import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import { makeAutoObservable } from 'mobx';
import { Store } from '..';
import { cloneDeep } from '../../utils/lodash';

const cleanData: ExtendData = {
  isActive: false,
  encounter: {} as never,
  limitBreak: undefined,
  combatant: [],
};

// used to record last data for history
let lastData: ExtendData | null = null;
interface HistoryData extends ExtendData {
  time: number;
}

class API {
  rootStore: Store = null as never;

  /** @mobx state */

  overlay = new OverlayAPI();
  data: ExtendData = cleanData;
  historys: HistoryData[] = [];
  history: HistoryData | null = null;

  /** @mobx computed */

  get active() {
    return (this.history || this.data).isActive;
  }
  get encounter() {
    return (this.history || this.data).encounter;
  }
  get lb() {
    return (this.history || this.data).limitBreak;
  }
  get combatant() {
    return (this.history || this.data).combatant;
  }

  /**
   * @constructor
   */
  constructor(rootStore: Store) {
    this.rootStore = rootStore;

    // add overlay callback
    this.overlay.addListener('CombatData', (rawData) => {
      const data = rawData.extendData;
      if (data) {
        this.tryPushHistory(data);
        this.updateCombat(data);
      }
    });
    // start overlay
    this.overlay.startEvent();

    // init mobx
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }

  /** @mobx actions */

  /**
   * show a history data
   */
  showHistory(data: HistoryData | null) {
    this.history = data;
  }
  /**
   * update new combat data
   */
  updateCombat(payload: ExtendData) {
    this.data = payload;
    this.history && (this.history = null);
    this.rootStore.settings.toggleShowCombatants(true);
  }
  /**
   * push a history (active must be false) (5 max)
   */
  tryPushHistory(payload: ExtendData) {
    // if last data (false) this data (true) which indicates a new encounter
    // push last data (false) into a new history
    if (lastData && !lastData.isActive && payload.isActive) {
      this.historys.length >= 5 && this.historys.pop();
      this.historys.unshift({ time: Date.now(), ...lastData });
    }
    // record data for future use
    lastData = cloneDeep(payload);
  }
}

export default API;
