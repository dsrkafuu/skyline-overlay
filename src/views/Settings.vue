<template>
  <div class="settings-container" v-if="showSettings">
    <div class="settings">
      <div class="settings-content">
        <div class="settings-line settings-select">
          <span>显示名次</span>
          <Switch v-model="showRanks">
            <template v-slot:true="{ color }">
              <ICheck :color="color" />
            </template>
            <template v-slot:false="{ color }">
              <IClose :color="color" />
            </template>
          </Switch>
        </div>
        <div class="settings-line settings-input">
          <span>自定义 ID</span>
          <Input v-model.trim="youName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// deps
import { computed } from 'vue';
// hooks
import useSettings from '../hooks/useSettings.js';
// components
import Switch from '../components/Switch.vue';
import Input from '../components/Input.vue';
// icons
import ICheck from '../assets/svgs/ICheck.vue';
import IClose from '../assets/svgs/IClose.vue';

/**
 * settings container
 */
export default {
  name: 'Settings',
  components: {
    Switch,
    Input,
    ICheck,
    IClose,
  },
  setup() {
    // show settings
    const { showSettings } = useSettings();

    // settings
    const { settings, updateSettings } = useSettings();
    /**
     * generat computed ref
     * @param {String} settingName
     */
    const genCompuetd = (settingName) =>
      computed({
        get: () => settings.value[settingName],
        set: (value) => {
          updateSettings({ [settingName]: value });
        },
      });

    // show ranks
    const showRanks = genCompuetd('showRanks');
    // YOU name
    const youName = genCompuetd('youName');

    return {
      showSettings,
      showRanks,
      youName,
    };
  },
};
</script>

<style lang="scss" src="./Settings.scss">
</style>
