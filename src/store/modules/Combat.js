import { makeAutoObservable } from 'mobx';

class Combat {
  /** @mobx state */

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
    // init mobx
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** @mobx actions */

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

export default Combat;
