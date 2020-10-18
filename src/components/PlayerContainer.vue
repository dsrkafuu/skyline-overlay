<template>
  <div class="player-container">
    <Player
      class="player-item"
      v-for="(value, key) of combatant"
      :key="key"
      :player="key"
      :data="value"
    />
  </div>
</template>

<script>
import Player from './Player.vue';
import { computed } from 'vue';

export default {
  name: 'PlayerContainer',
  components: {
    Player,
  },
  props: {
    combatant: Object,
  },
};
</script>

<style lang="scss" scoped>
.player-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>