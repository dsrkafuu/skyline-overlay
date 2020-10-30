<template>
  <Combatant />
  <Encounter :overlay="overlay" />
  <Settings />
</template>

<script>
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
    // init overlay api and start polling data
    const { updateCombatData } = useCombatData();
    const { overlay } = useOverlayAPI(updateCombatData);
    onMounted(() => {
      overlay.startEvent();
    });

    return {
      overlay,
    };
  },
};
</script>
