<template>
  <div class="player-container">
    <Player
      class="player-item"
      v-for="(value, key) of combatant"
      :key="key"
      :playerName="key"
      :data="value"
    />
  </div>
</template>

<script>
// hooks
import useCombatData from '../hooks/useCombatData.js';
// components
import Player from '../components/Player.vue';

/**
 * all combatants wrapper
 */
export default {
  name: 'Combatant',
  components: {
    Player,
  },
  setup() {
    // get combat data
    const { combatant } = useCombatData();

    return {
      combatant,
    };
  },
};
</script>

<style lang="scss" scoped src="./Combatant.scss">
</style>