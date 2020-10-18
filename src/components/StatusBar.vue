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
        <div class="buttons"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StatusBar',
  props: {
    encounter: Object,
  },
  setup(props) {
    // get display data
    const duration = computed(() => (props.encounter ? props.encounter.duration : '00:00'));
    const zone = computed(() => (props.encounter ? props.encounter.zoneName : 'Skyline Overlay'));
    const totalDPS = computed(() => (props.encounter ? props.encounter.dps : '0'));

    return {
      duration,
      zone,
      totalDPS,
    };
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
  position: relative;
  margin: 0.25rem 0.75rem;
  display: flex;
  flex-wrap: nowrap;
  color: var(--color-text);
  text-shadow: var(--shadow-text);
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
</style>