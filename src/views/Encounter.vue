<template>
  <div class="status-container">
    <div class="status">
      <div class="status-duration" :class="active && 'active'">
        <span>{{ duration }}</span>
      </div>
      <div class="status-content">
        <div class="zone">
          <span>{{ zoneName }}</span>
        </div>
        <div class="numbers">
          <span>{{ totalDPS }}</span>
          <span class="counter">DPS</span>
        </div>
      </div>
      <div class="status-buttons">
        <div class="buttons-end" @click="handleClearOverlay">
          <IRefresh color="#ffffff" />
        </div>
        <div class="buttons-settings" @click="updateShowSettings">
          <ISetting color="#ffffff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// deps
import { OverlayAPI } from 'ffxiv-overlay-api';
import { computed } from 'vue';
import { logInfo } from '../utils/loggers.js';
// hooks
import useCombatData from '../hooks/useCombatData.js';
import useSettings from '../hooks/useSettings.js';
// icons
import IRefresh from '../assets/svgs/IRefresh.vue';
import ISetting from '../assets/svgs/ISetting.vue';

/**
 * encounter bar
 * @param {OverlayAPI} overlay overlay instance
 */
export default {
  name: 'Encounter',
  props: {
    overlay: {
      type: OverlayAPI,
      required: true,
    },
  },
  setup(props) {
    // active status
    const { active } = useCombatData();

    // encounter datas
    const { encounter, updateCombatData } = useCombatData();
    const duration = computed(() => encounter.value?.duration || '00:00');
    const zoneName = computed(() => encounter.value?.zoneName || 'Skyline Overlay');
    const totalDPS = computed(() => encounter.value?.dps || 0);

    /**
     * clear overlay data
     */
    const handleClearOverlay = () => {
      logInfo('overlay cleared');
      typeof props.overlay.endEncounter === 'function' && props.overlay.endEncounter();
      updateCombatData({});
    };

    // control settings
    const { updateShowSettings } = useSettings();

    return {
      active,
      duration,
      zoneName,
      totalDPS,
      handleClearOverlay,
      updateShowSettings,
      // icons
      IRefresh,
      ISetting,
    };
  },
};
</script>

<style lang="scss" src="./Encounter.scss">
</style>
