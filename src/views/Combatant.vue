<template>
  <div class="player-container" v-if="combatant && combatant.length > 0">
    <Player
      class="player-item"
      v-for="(item, index) of combatant"
      :key="item.name"
      :index="index"
      :data="item"
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

<style lang="scss" src="./Combatant.scss">
</style>