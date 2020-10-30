<template>
  <div class="status-container">
    <div class="status">
      <div class="status-duration" :class="active && 'active'">
        <span v-text="duration"></span>
      </div>
      <div class="status-content">
        <div class="zone">
          <span v-text="zone"></span>
        </div>
        <div class="numbers">
          <span v-text="totalDPS"></span>
          <span class="counter">DPS</span>
        </div>
      </div>
      <div class="status-buttons">
        <div class="buttons-end" @click="handleEndEncounter">
          <img :src="svgRefresh" />
        </div>
        <div class="buttons-settings">
          <img :src="svgSetting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import spliter from '../plugins/spliter.js';
import { logInfo } from '../plugins/logger.js';
// hooks
import useCombatData from '../hooks/useCombatData.js';
// constants
import { FLICK_TIMEOUT } from '../store/constants.js';
// icons
import svgRefresh from '../assets/svgs/refresh.svg';
import svgSetting from '../assets/svgs/setting.svg';

/**
 * encounter bar
 * @param {Object} overlay overlay instance
 */
export default {
  name: 'Encounter',
  props: {
    overlay: Object,
  },
  setup(props) {
    // active status
    const { active } = useCombatData();

    // encounter datas
    const { encounter } = useCombatData();
    const duration = computed(() => encounter.value?.duration || '00:00');
    const zone = computed(() => encounter.value?.zoneName || 'Skyline Overlay');
    const totalDPS = computed(() => spliter(encounter.value?.dps) || '0');

    // end encounter
    let flickEndEncounter = null;
    const handleEndEncounter = () => {
      if (flickEndEncounter) {
        clearTimeout(flickEndEncounter);
      }
      flickEndEncounter = setTimeout(() => {
        logInfo('Encounter ended');
        props.overlay && props.overlay.endEncounter();
      }, FLICK_TIMEOUT);
    };

    return {
      active,
      duration,
      zone,
      totalDPS,
      handleEndEncounter,
      // icons
      svgRefresh,
      svgSetting,
    };
  },
};
</script>

<style lang="scss" scoped src="./Encounter.scss">
</style>