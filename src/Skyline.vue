<template>
  <!-- combatant container -->
  <Combatant />
  <!-- encounter and control bar -->
  <Encounter :overlay="overlay" />
  <!-- settings -->
  <Settings />
</template>

<script>
// deps
import { onMounted } from 'vue';
// hooks
import useCombatData from './hooks/useCombatData.js';
import useOverlayAPI from './hooks/useOverlayAPI.js';
// components
import Combatant from './views/Combatant.vue';
import Encounter from './views/Encounter.vue';
import Settings from './views/Settings.vue';

export default {
  name: 'Skyline',
  components: {
    Combatant,
    Encounter,
    Settings,
  },
  setup() {
    // init overlay api
    const { updateCombatData } = useCombatData();
    const { overlay } = useOverlayAPI(updateCombatData);

    // start pulling data
    onMounted(() => {
      overlay.startEvent();
    });

    return {
      overlay,
    };
  },
};
</script>
