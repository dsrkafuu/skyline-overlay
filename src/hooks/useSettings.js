import { computed } from 'vue';
// store
import { useStore } from 'vuex';
import { SWITCH_SETTINGS, UPDATE_SETTINS } from '../store/mutations.js';

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

  // settings
  const settings = computed(() => store.state.settings);
  // update settings
  const updateSettings = (value) => {
    store.commit(UPDATE_SETTINS, value);
  };

  return {
    showSettings,
    updateShowSettings,
    settings,
    updateSettings,
  };
}

export default useSettings;
