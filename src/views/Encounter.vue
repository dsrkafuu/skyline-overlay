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
        <div class="buttons-end" v-html="icons.refresh" @click="handleEndEncounter"></div>
        <div class="buttons-settings" v-html="icons.settings"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
// plugins
import spliter from '../plugins/spliter.js';
import { logInfo } from '../plugins/logger.js';
// constants
import { FLICK_TIMEOUT } from '../store/constants.js';
// icons
import iRefresh from '../assets/svgs/refresh.js';
import iSettings from '../assets/svgs/settings.js';

export default {
  name: 'Encounter',
  props: {
    overlay: Object,
    encounter: Object,
    active: Boolean,
  },
  setup(props) {
    // get display data
    const duration = computed(() => (props.encounter ? props.encounter.duration : '00:00'));
    const zone = computed(() => (props.encounter ? props.encounter.zoneName : 'Skyline Overlay'));
    const totalDPS = computed(() => (props.encounter ? spliter(props.encounter.dps) : '0'));

    // icons
    const icons = {
      refresh: iRefresh,
      settings: iSettings,
    };

    // end encounter
    let flickEndEncounter = null;
    const handleEndEncounter = () => {
      if (flickEndEncounter) {
        clearTimeout(flickEndEncounter);
      }
      flickEndEncounter = setTimeout(() => {
        logInfo('Encounter ended');
        props.overlay.endEncounter();
      }, FLICK_TIMEOUT);
    };

    return { icons, duration, zone, totalDPS, handleEndEncounter };
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.status-container {
  margin-top: 0.3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-sm;
}
.status {
  flex: 0 0 30rem;
  display: flex;
  color: var(--color-text);
  text-shadow: var(--shadow-text);
}
.status-content {
  flex: 1 0 auto;
  padding: 0.25rem 0.75rem;
  display: flex;
  flex-wrap: nowrap;
  height: var(--height-status);
  line-height: 1.1rem;
  background-color: var(--color-bg);
}

.status-duration {
  height: var(--height-status);
  width: 3.25rem;
  line-height: var(--height-status);
  text-align: center;
  &:not(.active) {
    background-color: var(--color-cover);
  }
  &.active {
    background-color: var(--color-active);
  }
}

.status-buttons {
  cursor: pointer;
  background-color: var(--color-cover);
  position: relative;
  height: var(--height-status);
  width: 3.2rem;
  display: flex;
  & > div {
    position: relative;
    flex: 0 0 auto;
    height: var(--height-status);
    width: var(--height-status);
    &:hover {
      background-color: var(--color-cover);
    }
  }
  ::v-deep(svg) {
    height: 1.1rem;
    width: 1.1rem;
    margin: 0.25rem;
    fill: #ffffff;
  }
}

.zone {
  flex: 1 1 auto;
  text-align: left;
}
.numbers {
  flex: 0 0 auto;
}
</style>