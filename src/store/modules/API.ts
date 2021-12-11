import OverlayAPI, { ExtendData } from 'ffxiv-overlay-api';
import { cloneDeep } from '../../utils/lodash';
import { makeAutoObservable } from 'mobx';
import Settings from './Settings';

const cleanData: ExtendData = {
  isActive: false,
  encounter: {} as never,
  limitBreak: undefined,
  combatant: [],
};

/** @mobx ext state */

let sets: Settings;

class API {
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
  constructor(settings: Settings) {
    sets = settings;

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
      sets.toggleShowCombatants(true);
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
