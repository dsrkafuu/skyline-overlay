<template>
  <div class="player">
    <div class="player-id">ID</div>
    <div class="player-shadow">
      {{ player }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    player: String,
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>