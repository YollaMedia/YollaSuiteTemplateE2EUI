<template>
  <Codemirror @change="changeHandler" :modelValue="serverDataDescription" />
</template>

<script setup>
  import { useProxyServersStore } from '@/store/modules/proxyServers';
  import { Codemirror } from 'vue-codemirror';
  import { storeToRefs } from 'pinia';
  // Create store
  const store = useProxyServersStore();
  let { serverDataDescription } = storeToRefs(store);
  const props = defineProps({
    context: Object,
  });
  function changeHandler(e) {
    props.context.node.input(e);
  }
</script>
