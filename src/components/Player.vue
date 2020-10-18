<template>
  <div class="player" :class="`job-${data.jobType}`">
    <div class="player-id" v-text="player"></div>
    <div class="player-shadow">
      <div class="player-content">
        <span class="player-icon" v-text="data.job"></span>
        <span class="player-data" v-text="data.dps"></span>
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
export default {
  name: 'Player',
  props: {
    player: String,
    data: Object,
  },
  setup(props) {
    /* computed datas */
    const maxHit = computed(() => {
      if (props.data.maxHitDamage) {
        return `${props.data.maxHit} - ${props.data.maxHitDamage}`;
      }
      return props.data.maxHit;
    });

    return {
      maxHit,
    };
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
}
.player-id,
.player-maxhit {
  font-size: $font-size-sm;
  text-align: center;
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
  margin: 0.25rem 0.8rem;
  color: var(--color-text);
  text-shadow: var(--shadow-text);
  display: flex;
  flex-direction: row-reverse;
}

.player-icon {
  position: absolute;
  left: 0;
  top: -0.5rem;
  width: 2.15rem;
  height: 2.15rem;
}
</style>