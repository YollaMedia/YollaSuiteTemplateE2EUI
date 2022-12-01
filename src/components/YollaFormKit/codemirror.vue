<template>
  <Codemirror @change="changeHandler" :modelValue="value" />
</template>

<script setup>
  import { useCodeMirrorStore } from '@/store/modules/codeMirror';
  import { Codemirror } from 'vue-codemirror';
  import { storeToRefs } from 'pinia';
  // Create store
  const store = useCodeMirrorStore();
  store.$reset();
  let { value } = storeToRefs(store);
  const props = defineProps({
    context: Object,
  });
  function changeHandler(e) {
    props.context.node.input(e);
  }
</script>
