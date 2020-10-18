<template>
  <div class="wrapper">
    <div class="status-bar-wrapper">
      <div class="status-bar">
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
    data: Object,
  },
  setup(props) {
    const dataStatus = computed(() => props.data && props.data.encounter);

    const duration = computed(() => {
      if (dataStatus.value) {
        return props.data.encounter.duration;
      } else {
        return '00:00';
      }
    });

    const zone = computed(() => {
      if (dataStatus.value) {
        return props.data.encounter.zoneName;
      } else {
        return 'Skyline Overlay';
      }
    });

    const totalDPS = computed(() => {
      if (dataStatus.value) {
        return props.data.encounter.dps;
      } else {
        return '0';
      }
    });

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

.wrapper {
  margin-top: 0.25rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-sm;
}
.status-bar-wrapper {
  position: relative;
  flex: 0 1 30rem;

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
.status-bar {
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

.counter {
  font-size: $font-size-xs;
  margin-left: 0.2rem;
}
</style>