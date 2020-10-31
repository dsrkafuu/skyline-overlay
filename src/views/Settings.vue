<template>
  <div class="settings-container" v-if="showSettings">
    <div class="settings">
      <div class="settings-content">DEV: {{ showRanks }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
// hooks
import useSettings from '../hooks/useSettings.js';

/**
 * settings container
 */
export default {
  name: 'Settings',
  setup() {
    // show settings
    const { showSettings } = useSettings();

    // settings
    const { settings, updateSettings } = useSettings();
    // show ranks
    const showRanks = computed(() => settings.value.showRanks);

    setInterval(() => {
      updateSettings({ showRanks: !showRanks.value });
    }, 1000);

    return {
      showSettings,
      showRanks,
    };
  },
};
</script>

<style lang="scss" scoped src="./Settings.scss">
</style>