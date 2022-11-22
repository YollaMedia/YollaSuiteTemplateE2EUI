<template> <Codemirror @change="changeHandler" :value="props.context._value" /> </template>

<script setup>
  import { Codemirror } from 'vue-codemirror';
  const props = defineProps({
    context: Object,
  });
  function changeHandler(e) {
    props.context.node.input(e);
  }
</script>
