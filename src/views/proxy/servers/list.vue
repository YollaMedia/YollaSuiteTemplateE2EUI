<template>
  <n-card :bordered="false" class="proCard">
    <!-- :request="loadDataTable" -->
    <!-- @update:checked-row-keys="onCheckedRow" -->
    <BasicTable
      title="Server List"
      titleTooltip="Server List Table"
      :columns="columns"
      :pagination="pagination"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :request="loadDataTable"
    >
      <template #toolbar>
        <n-button type="info" dashed @click="addServer"> Add </n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import useColumns from './useColumns';
  const { columns, actionColumn, addServer, loadDataTable } = useColumns();
</script>

<style lang="less" scoped></style>
