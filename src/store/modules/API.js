import OverlayAPI from 'ffxiv-overlay-api';
import { makeAutoObservable } from 'mobx';

import { logInfo } from '@/utils/loggers';

class API {
  /** @mobx state */

  overlay = new OverlayAPI({
    extendData: true,
    silentMode: true,
  });
  data = { isActive: false, encounter: {}, combatant: [] };

  /** @mobx computed */

  get active() {
    return this.data.isActive;
  }
  get encounter() {
    return this.data.encounter;
  }
  get combatant() {
    return this.data.combatant;
  }

  /**
   * @constructor
   */
  constructor() {
    // add overlay callback
    this.overlay.addListener('CombatData', (obj) => {
      this.updateCombat(obj.extendData);
    });
    // start overlay
    this.overlay.startEvent();
    logInfo('overlay api initialized');

    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** @mobx actions */

  /**
   * update overlay api instance
   * @param {OverlayAPI|null} payload
   */
  updateOverlay(payload) {
    if (payload === null || payload instanceof OverlayAPI) {
      if (this.overlay) {
        this.overlay.removeAllListener();
      }
      this.overlay = payload;
    }
  }
  /**
   * update new combat data
   * @param {{ isActive: boolean, encounter: any, combatant: Array<any> }} action
   */
  updateCombat(payload) {
    if (payload.isActive !== undefined && payload.encounter && payload.combatant) {
      this.data = payload;
    }
  }
  /**
   * clear combat data
   */
  clearCombat() {
    this.data = { isActive: false, encounter: {}, combatant: [] };
  }
}

export default API;
