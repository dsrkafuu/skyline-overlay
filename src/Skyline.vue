<template>
  <Combatant :combatant="combatant" />
  <Encounter :overlay="overlay" :encounter="encounter" :active="active === 'true' ? true : false" />
</template>

<script>
import OverlayAPI from 'ffxiv-overlay-api';
import { computed, onMounted } from 'vue';
// store
import { useStore } from 'vuex';
import { UPDATE_COMBAT_DATA } from './store/mutations.js';
// components
import Combatant from './views/Combatant.vue';
import Encounter from './views/Encounter.vue';

export default {
  name: 'Skyline',
  components: {
    Combatant,
    Encounter,
  },
  setup() {
    // all data from store
    const { combatant, encounter, active, updateCombatData } = useCombatData();
    // init overlay api and start polling data
    const { overlay } = useOverlayAPI(updateCombatData);
    onMounted(() => {
      overlay.startEvent();
    });

    return {
      overlay,
      combatant,
      encounter,
      active,
    };
  },
};

function useCombatData() {
  const store = useStore();
  // get combat data
  const dataObj = {};
  ['combatant', 'encounter'].forEach((key) => {
    dataObj[key] = computed(() => {
      if (store.state.combatData.type) {
        return store.state.combatData.extendData[key];
      }
      return null;
    });
  });
  const active = computed(() => store.state.combatData.isActive || 'false');
  // update function
  const updateCombatData = (combatData) => {
    store.commit(UPDATE_COMBAT_DATA, combatData);
  };
  return {
    ...dataObj, // a plain object which has two ref that we can split
    active,
    updateCombatData,
  };
}

function useOverlayAPI(updateCombatData) {
  const overlay = new OverlayAPI({
    extendData: true,
    silentMode: process.env.NODE_ENV === 'production',
  });
  overlay.addListener('CombatData', (data) => {
    updateCombatData(data);
  });
  /* DEV - START */
  process.env.NODE_ENV === 'development' &&
    fetch('https://raw.githubusercontent.com/amzrk2/ffxiv-overlay-api/master/test/fake_cn.json')
      .then((response) => {
        return response.json();
      })
      .then((fakeData) => {
        overlay.simulateData(fakeData);
        setTimeout(() => {
          // Disable simulation
          overlay.simulateData();
        }, 10000);
      });
  /* DEV - END */
  return { overlay };
}
</script>
