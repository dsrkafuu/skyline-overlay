import { createStore } from 'vuex';
// mutations
import { UPDATE_COMBAT_DATA, SWITCH_SETTINGS } from './mutations.js';

const store = createStore({
  state: {
    combatData: {},
    showSettings: false,
  },
  mutations: {
    // update combat data
    [UPDATE_COMBAT_DATA](state, payload) {
      state.combatData = payload;
    },
    // switch settings status
    [SWITCH_SETTINGS](state) {
      state.showSettings = !state.showSettings;
    },
  },
});

export default store;
