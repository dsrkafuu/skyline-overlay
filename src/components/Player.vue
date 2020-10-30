<template>
  <div class="player" :class="`job-${data.jobType}`">
    <div class="player-id" v-text="playerName"></div>
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
import splitNumber from '../plugins/splitNumber.js';
import icons from '../plugins/icons.js';

/**
 * single play grid
 * @param {String} playerName player name
 * @param {Object} data data obj
 */
export default {
  name: 'Player',
  props: {
    playerName: String,
    data: Object,
  },
  setup(props) {
    // player dps
    const dps = computed(() => splitNumber(props.data.dps));

    return {
      dps,
      //icons
      icons,
    };
  },
};
</script>

<style lang="scss" scoped src="./Player.scss">
</style>