<template>
  <PlayerContainer :combatant="combatant" />
  <StatusBar :encounter="encounter" />
</template>

<script>
import OverlayAPI from 'ffxiv-overlay-api';
import { reactive, computed, onMounted, unref } from 'vue';
import { useStore } from 'vuex';
/* mutations */
import { UPDATE_COMBAT_DATA } from './store/mutations.js';
/* components */
import StatusBar from './components/StatusBar.vue';
import PlayerContainer from './components/PlayerContainer.vue';

export default {
  name: 'App',
  components: {
    StatusBar,
    PlayerContainer,
  },
  setup() {
    /* all data */
    const { combatant, encounter, updateCombatData } = useCombatData();

    /* init overlay api and start polling data */
    const { overlay } = useOverlayAPI(updateCombatData);
    onMounted(() => {
      overlay.startEvent();
    });

    return {
      combatant,
      encounter,
    };
  },
};

function useCombatData() {
  const store = useStore();
  // get combatData
  const combatData = computed(() => store.state.combatData);
  // get combatant and encounter
  const dataObj = {};
  ['combatant', 'encounter'].forEach((key) => {
    dataObj[key] = computed(() => {
      if (combatData.value.type) {
        return combatData.value.extendData[key];
      }
      return null;
    });
  });
  // update function
  const updateCombatData = (combatData) => {
    store.commit(UPDATE_COMBAT_DATA, combatData);
  };
  return {
    combatant: dataObj.combatant,
    encounter: dataObj.encounter,
    updateCombatData,
  };
}

function useOverlayAPI(updateCombatData) {
  const overlay = new OverlayAPI({
    extendData: true,
    silentMode: true,
  });
  overlay.addListener('CombatData', (data) => {
    updateCombatData(data);
  });
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
  return { overlay };
}
</script>
