<template>
  <div class="status">
    <div class="status-shadow">
      <div class="status-content">
        <div class="duration">
          <span v-text="duration"></span>
        </div>
        <div class="zone">
          <span v-text="zone"></span>
        </div>
        <div class="numbers">
          <span v-text="totalDPS"></span>
          <span class="counter">DPS</span>
        </div>
      </div>
      <div class="status-buttons">
        <div class="buttons-end" v-html="icons.refresh"></div>
        <div class="buttons-settings" v-html="icons.settings"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import spliter from '../plugins/spliter.js';
import iRefresh from '../assets/svgs/refresh.js';
import iSettings from '../assets/svgs/settings.js';

export default {
  name: 'Encounter',
  props: {
    encounter: Object,
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
    return { icons, duration, zone, totalDPS };
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.status {
  margin-top: 0.3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-sm;
}
.status-shadow {
  position: relative;
  flex: 0 0 30rem;
  display: flex;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: skew(-30deg);
    background-color: var(--color-bg);
  }
}
.status-content {
  flex: 1 0 auto;
  position: relative;
  margin: 0.25rem 0.75rem;
  display: flex;
  flex-wrap: nowrap;
  color: var(--color-text);
  text-shadow: var(--shadow-text);
  height: 1.1rem;
  line-height: 1.1rem;
}

.duration {
  flex: 0 0 auto;
  width: 3.25rem;
}
.zone {
  flex: 1 1 auto;
  text-align: left;
}
.numbers {
  flex: 0 0 auto;
}

.status-buttons {
  background-color: var(--color-cover);
  position: relative;
  height: 1.6rem;
  width: 3.2rem;
  margin-right: 0.75rem;
  display: flex;
  & > div {
    position: relative;
    flex: 0 0 auto;
    height: 1.6rem;
    width: 1.6rem;
    &:hover {
      background-color: var(--color-cover);
    }
  }
  ::v-deep svg {
    height: 1.1rem;
    width: 1.1rem;
    margin: 0.25rem;
    fill: #ffffff;
  }
}
</style>