<template>
  <div class="player" :class="`job-${data.jobType}`">
    <div class="player-id">{{ dispName }}</div>
    <div class="player-content">
      <span class="player-icon">
        <img :src="jobIcons[data.job] || jobIcons.ffxiv" />
      </span>
      <div class="player-data">
        <span class="player-num">{{ data.dps || 0 }}</span>
        <span class="counter">DPS</span>
      </div>
    </div>
    <div class="player-bar-wrapper">
      <div class="player-bar-shadow">
        <div class="player-bar-content"></div>
      </div>
    </div>
    <div class="player-maxhit">
      <span>{{ data.maxHit }}</span>
      <span v-if="data.maxHitDamage">
        {{ `&nbsp;-&nbsp;${data.maxHitDamage}` }}
      </span>
    </div>
  </div>
</template>

<script>
// deps
import { computed } from 'vue';
import jobIcons from '../plugins/jobIcons.js';
// hooks
import useSettings from '../hooks/useSettings.js';

/**
 * single play grid
 * @param {string} playerName (ref) player name
 * @param {Object} data (reactive) data obj
 */
export default {
  name: 'Player',
  props: {
    index: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // get settings
    const { settings } = useSettings();

    // player name
    const dispName = computed(() => {
      let dispName = props.data.name;
      // if custom name
      dispName === 'YOU' && (dispName = settings.value.youName);
      // prevent empty
      dispName === '' && (dispName = 'YOU');
      // if show ranks
      if (settings.value.showRanks) {
        return `${props.index}. ${dispName}`;
      } else {
        return dispName;
      }
    });

    return {
      dispName,
      // job icons
      jobIcons,
    };
  },
};
</script>

<style lang="scss" src="./Player.scss">
</style>
