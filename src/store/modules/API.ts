import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import cloneDeep from 'lodash/cloneDeep';
import { makeAutoObservable } from 'mobx';

const cleanData: ExtendData = {
  isActive: false,
  encounter: {} as never,
  limitBreak: undefined,
  combatant: [],
};

class API {
  /** @mobx state */

  overlay = new OverlayAPI();
  data: ExtendData = cloneDeep(cleanData);

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
  constructor() {
    // add overlay callback
    this.overlay.addListener('CombatData', (data) => {
      if (data.extendData) {
        this.updateCombat(data.extendData);
      }
    });
    // start overlay
    this.overlay.startEvent();

    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
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
    }
  }
  /**
   * clear combat data
   */
  clearCombat() {
    this.data = cloneDeep(cleanData);
  }
}

export default API;
