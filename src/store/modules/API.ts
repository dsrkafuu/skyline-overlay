import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import cloneDeep from 'lodash/cloneDeep';
import { makeAutoObservable } from 'mobx';

import { logInfo } from '../../utils/loggers';

const cleanData: ExtendData = {
  isActive: false,
  encounter: {} as never,
  limitBreak: undefined,
  combatant: [],
};

class API {
  /** @mobx state */

  overlay = new OverlayAPI({
    extendData: true,
    silentMode: true,
    seperateLB: true,
  });
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
   */
  updateOverlay(payload: OverlayAPI) {
    if (this.overlay) {
      this.overlay.removeAllListener('CombatData');
    }
    this.overlay = payload;
  }
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
