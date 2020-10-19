<template>
  <div class="player" :class="`job-${data.jobType}`">
    <div class="player-id" v-text="player"></div>
    <div class="player-shadow">
      <div class="player-content">
        <span class="player-icon">
          <img :src="icons[data.job] || icons.ffxiv" />
        </span>
        <span class="player-data" v-text="dps"></span>
        <span class="counter">DPS</span>
      </div>
    </div>
    <div class="player-bar-wrapper">
      <div class="player-bar-shadow">
        <div class="player-bar-content"></div>
      </div>
    </div>
    <div class="player-maxhit">
      <span v-text="maxHit"></span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import spliter from '../plugins/spliter.js';
import icons from '../plugins/icons.js';

export default {
  name: 'Player',
  props: {
    player: String,
    data: Object,
  },
  setup(props) {
    /* computed datas */
    const dps = spliter(props.data.dps);
    const maxHit = computed(() => {
      if (props.data.maxHitDamage) {
        return `${props.data.maxHit} - ${props.data.maxHitDamage}`;
      }
      return props.data.maxHit;
    });

    return { icons, dps, maxHit };
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/jobtypes.scss';

.player {
  flex: 0 0 auto;
  width: 10rem;
  margin: 0 0.3rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  text-shadow: var(--shadow-text);
}
.player-id,
.player-maxhit {
  margin: 0.25rem;
  font-size: $font-size-sm;
  text-align: center;
  white-space: nowrap;
  position: relative;
}

.player-shadow {
  position: relative;
  flex: 0 0 auto;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: skew(-30deg);
  }
}
.player-content {
  position: relative;
  margin: 0.25rem 0.8rem 0.25rem 0.6rem;
  height: 1.25rem;
  line-height: 1.25rem;
  text-align: right;
}

.player-icon {
  position: absolute;
  left: 0;
  top: -0.275rem;
  width: 1.75rem;
  height: 1.75rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>