import { computed } from 'vue';
// store
import { useStore } from 'vuex';
import { SWITCH_SETTINGS } from '../store/mutations.js';

/**
 * use settings
 */
function useSettings() {
  const store = useStore();

  // settings active status
  const showSettings = computed(() => store.state.showSettings);
  // update show settings
  const updateShowSettings = () => {
    store.commit(SWITCH_SETTINGS);
  };

  return {
    showSettings,
    updateShowSettings,
  };
}

export default useSettings;
