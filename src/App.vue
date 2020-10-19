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
  // update function
  const updateCombatData = (combatData) => {
    store.commit(UPDATE_COMBAT_DATA, combatData);
  };
  return {
    ...dataObj, // a plain object which has two ref that we can split
    updateCombatData,
  };
}

function useOverlayAPI(updateCombatData) {
  const overlay = new OverlayAPI({
    extendData: true,
    silentMode: false,
  });
  overlay.addListener('CombatData', (data) => {
    updateCombatData(data);
  });
  /* DEV - START */
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
