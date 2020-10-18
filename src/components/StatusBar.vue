<template>
  <div class="status-bar">{{ combatData }}</div>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    combatData: Object,
  },
  setup(props) {},
};
</script>