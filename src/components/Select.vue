<template>
  <div class="select">
    <div :class="['select-on', modelValue && 'active']" @click="handleClick(true)">
      <ICheck :color="modelValue ? '#333333' : '#ffffff'" />
    </div>
    <div :class="['select-off', !modelValue && 'active']" @click="handleClick(false)">
      <IClose :color="!modelValue ? '#333333' : '#ffffff'" />
    </div>
  </div>
</template>

<script>
// icons
import ICheck from '../assets/svgs/ICheck.vue';
import IClose from '../assets/svgs/IClose.vue';

/**
 * custom select component, use with `v-model`
 */
export default {
  name: 'Select',
  components: {
    ICheck,
    IClose,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    // handle value change
    const handleClick = (value) => {
      if (props.modelValue !== value) {
        context.emit('update:modelValue', value);
      }
    };
    return {
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped src="./Select.scss">
</style>