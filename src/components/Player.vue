<template>
  <div class="player" :class="`job-${data.jobType}`">
    <div class="player-id" v-text="player"></div>
    <div class="player-content">
      <span class="player-icon">
        <img :src="icons[data.job] || icons.ffxiv" />
      </span>
      <div class="player-data">
        <span class="player-num" v-text="dps"></span>
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
    const dps = computed(() => spliter(props.data.dps));
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
  width: 8.5rem;
  margin: 0 0.2rem;
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
}

.player-content {
  position: relative;
  padding: 0.25rem 0.6rem;
  box-shadow: var(--shadow-box);
}
.player-data {
  height: 1.25rem;
  line-height: 1.25rem;
  text-align: right;
}

.player-icon {
  position: absolute;
  left: 0;
  top: 0.025rem;
  left: 0.35rem;
  width: 1.7rem;
  height: 1.7rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>