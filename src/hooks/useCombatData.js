import { computed } from 'vue';
// store
import { useStore } from 'vuex';
import { UPDATE_COMBAT_DATA } from '../store/mutations.js';

/**
 * use combat data
 */
function useCombatData() {
  const store = useStore();

  // active status
  const active = computed(() => store.state.combatData?.isActive === 'true');

  // combat datas
  const combatant = computed(() => store.state.combatData?.extendData?.combatant);
  const encounter = computed(() => store.state.combatData?.extendData?.encounter);

  /**
   * update combat data
   * @param {Object} combatData
   */
  const updateCombatData = (combatData) => {
    store.commit(UPDATE_COMBAT_DATA, combatData);
  };

  return {
    active, // active status
    combatant,
    encounter,
    updateCombatData, // update combat data
  };
}

export default useCombatData;
