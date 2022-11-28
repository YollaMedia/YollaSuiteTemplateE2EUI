<template>
  <n-card :bordered="false" class="proCard">
    <!-- :request="loadDataTable" -->
    <!-- @update:checked-row-keys="onCheckedRow" -->
    <BasicTable
      title="Server List"
      titleTooltip="Server List Table"
      :columns="columns"
      :dataSource="list"
      :pagination="false"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
    >
      <template #toolbar>
        <n-button type="info" dashed @click="addServer"> Add </n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import useColumns from './useColumns';
  const { columns, actionColumn, addServer, list } = useColumns();
</script>

<style lang="less" scoped></style>
