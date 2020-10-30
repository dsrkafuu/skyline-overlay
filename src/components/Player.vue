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
      <span v-text="data.maxHit"></span>
      <span v-if="data.maxHitDamage" v-text="`&nbsp;-&nbsp;${data.maxHitDamage}`"></span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import spliter from '../plugins/spliter.js';
import icons from '../plugins/icons.js';

/**
 * single play grid
 * @param {String} player player name
 * @param {Object} data player data object
 */
export default {
  name: 'Player',
  props: {
    player: String,
    data: Object,
  },
  setup(props) {
    // player dps
    const dps = computed(() => spliter(props.data.dps));

    return { icons, dps };
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.player {
  flex: 0 0 auto;
  width: 9rem;
  margin: 0 0.2rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  text-shadow: var(--shadow-text);

  // job type color
  &.job-dps .player-content {
    background-color: var(--color-dps);
  }
  &.job-tank .player-content {
    background-color: var(--color-tank);
  }
  &.job-heal .player-content {
    background-color: var(--color-heal);
  }
}

.player-id,
.player-maxhit {
  line-height: 1.5rem;
  font-size: $font-size-sm;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.player-maxhit {
  & > span:first-child {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > span:last-child {
    flex: 0 0 auto;
  }
}

.player-content {
  position: relative;
  padding: 0.25rem 0.6rem;
  box-shadow: var(--shadow-box);
  background-color: var(--color-bg);
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