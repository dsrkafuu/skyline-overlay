import { createStore } from 'vuex';
// mutations
import { UPDATE_COMBAT_DATA, SWITCH_SETTINGS, UPDATE_SETTINS } from './mutations.js';

const store = createStore({
  state: {
    combatData: {},
    showSettings: false,
    settings: {
      showRanks: false,
      youName: 'YOU',
    },
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
    // update settings
    [UPDATE_SETTINS](state, payload) {
      state.settings = Object.assign({}, state.settings, payload);
    },
  },
});

export default store;
