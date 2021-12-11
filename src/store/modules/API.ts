import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import { makeAutoObservable } from 'mobx';
import { Store } from '..';

const cleanData: ExtendData = {
  isActive: false,
  encounter: {} as never,
  limitBreak: undefined,
  combatant: [],
};

class API {
  rootStore: Store = null as never;

  /** @mobx state */

  overlay = new OverlayAPI();
  data: ExtendData = cleanData;

  /** @mobx computed */

  get active() {
    return this.data.isActive;
  }
  get encounter() {
    return this.data.encounter;
  }
  get lb() {
    return this.data.limitBreak;
  }
  get combatant() {
    return this.data.combatant;
  }

  /**
   * @constructor
   */
  constructor(rootStore: Store) {
    // add overlay callback
    this.overlay.addListener('CombatData', (data) => {
      if (data.extendData) {
        this.updateCombat(data.extendData);
      }
    });
    // start overlay
    this.overlay.startEvent();

    // init mobx
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }

  /** @mobx actions */

  /**
   * update new combat data
   */
  updateCombat(payload: ExtendData) {
    if (
      payload.isActive !== undefined &&
      payload.encounter &&
      payload.combatant
    ) {
      this.data = payload;
      this.rootStore.settings.toggleShowCombatants(true);
    }
  }
}

export default API;
