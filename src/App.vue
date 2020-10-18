<template>
  <StatusBar :combatData="combatData"></StatusBar>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import OverlayAPI from 'ffxiv-overlay-api';
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
/* mutations */
import { UPDATE_COMBAT_DATA } from './store/mutations.js';
/* components */
import StatusBar from './components/StatusBar.vue';

export default {
  name: 'App',
  components: {
    StatusBar,
  },
  setup() {
    /* combat data */
    const { combatData, updateCombatData } = useCombatData();

    /* init overlay api and start polling data */
    const { overlay } = useOverlayAPI(updateCombatData);
    onMounted(() => {
      overlay.startEvent();
    });

    return {
      combatData,
    };
  },
};

function useCombatData() {
  const store = useStore();
  const combatData = computed(() => store.state.combatData);
  const updateCombatData = (combatData) => {
    store.commit(UPDATE_COMBAT_DATA, combatData);
  };
  return {
    combatData,
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
