<template>
  <div class="settings-container" v-if="showSettings">
    <div class="settings">
      <div class="settings-content">SETTINGS HERE</div>
    </div>
  </div>
</template>

<script>
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

    return {
      showSettings,
    };
  },
};
</script>

<style lang="scss" scoped src="./Settings.scss">
</style>