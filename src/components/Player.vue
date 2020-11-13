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
import { computed, toRefs } from 'vue';
import splitNumber from '../plugins/splitNumber.js';
import icons from '../plugins/icons.js';
// hooks
import useSettings from '../hooks/useSettings.js';

/**
 * single play grid
 * @param {String} playerName (ref) player name
 * @param {Object} data (reactive) data obj
 */
export default {
  name: 'Player',
  props: {
    index: { type: Number, required: true },
    playerName: { type: String, required: true },
    data: { type: Object, required: true },
  },
  setup(props) {
    // get settings
    const { settings } = useSettings();

    // player name
    const { index, playerName } = toRefs(props);
    const player = computed(() => {
      let name = playerName.value;
      // if custom name
      name === 'YOU' && (name = settings.value.youName);
      // prevent empty
      name === '' && (name = 'YOU');
      // if show ranks
      if (settings.value.showRanks) {
        return `${index.value}. ${name}`;
      } else {
        return name;
      }
    });

    // player dps
    const dps = computed(() => splitNumber(props.data.dps));

    return {
      player,
      dps,
      //icons
      icons,
    };
  },
};
</script>

<style lang="scss" scoped src="./Player.scss">
</style>