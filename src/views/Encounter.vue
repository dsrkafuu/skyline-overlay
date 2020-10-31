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
        <div class="buttons-settings" @click="updateShowSettings">
          <img :src="svgSetting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, unref, toRefs } from 'vue';
import splitNumber from '../plugins/splitNumber.js';
import { logInfo } from '../plugins/logger.js';
// hooks
import useCombatData from '../hooks/useCombatData.js';
import useSettings from '../hooks/useSettings.js';
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
    const duration = computed(() => unref(encounter)?.duration || '00:00');
    const zone = computed(() => unref(encounter)?.zoneName || 'Skyline Overlay');
    const totalDPS = computed(() => splitNumber(unref(encounter)?.dps) || '0');

    // end encounter
    let flickEndEncounter = null;
    const { overlay } = toRefs(props);
    const handleEndEncounter = () => {
      if (flickEndEncounter) {
        clearTimeout(flickEndEncounter);
      }
      flickEndEncounter = setTimeout(() => {
        logInfo('Encounter ended');
        unref(overlay) && unref(overlay).endEncounter();
      }, FLICK_TIMEOUT);
    };

    // control settings
    const { updateShowSettings } = useSettings();

    return {
      active,
      duration,
      zone,
      totalDPS,
      handleEndEncounter,
      updateShowSettings,
      // icons
      svgRefresh,
      svgSetting,
    };
  },
};
</script>

<style lang="scss" scoped src="./Encounter.scss">
</style>