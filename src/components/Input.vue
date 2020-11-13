<template>
  <input class="input" :value="modelValue" @input="handleInput" type="text" autocomplete="off" />
</template>

<script>
/**
 * custom input component, use with `v-model`
 */
export default {
  name: 'Input',
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({}),
    },
  },
  setup(props, context) {
    // handle input change
    const handleInput = (e) => {
      let value = e.target.value;
      // if capitalize
      props.modelModifiers.capitalize && (value = value.toUpperCase());
      context.emit('update:modelValue', value);
    };
    return {
      handleInput,
    };
  },
};
</script>

<style lang="scss" scoped src="./Input.scss">
</style>