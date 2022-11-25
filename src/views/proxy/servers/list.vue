<template>
  <div class="n-layout-page-header">
    <n-card :bordered="false" title="Server List" />
  </div>
  <div class="w-full flex justify-end px-4">
    <n-button type="info" ghost class="font-bold">
      <router-link to="/proxy/create">+ Add </router-link>
    </n-button>
  </div>
  <n-card :bordered="false" class="proCard">
    <n-data-table :columns="columns" :data="list" :bordered="true" />
  </n-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useProxyServersStore } from '@/store/modules/proxy-servers';
  // import { BasicTable, TableAction } from '@/components/Table';
  import useColumns from './useColumns';
  // import { DeleteOutlined, EditOutlined } from '@vicons/antd';
  const store = useProxyServersStore();
  let columns = useColumns();
  const { list } = storeToRefs(store);
  const params = {};

  //Get Server List
  store.getServers(params);
</script>

<style lang="less" scoped></style>
