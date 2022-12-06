<template>
  <n-card :bordered="false" class="proCard">
    <!-- :dataSource="list" -->
    <BasicTable
      title="Test List"
      titleTooltip="Test List Table"
      :columns="columns"
      :pagination="pagination"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :request="loadDataTable"
    >
      <template #toolbar>
        <n-button type="info" dashed> Add </n-button>
      </template>
      <template #filter>
        <FormKit type="form" submit-label="Search" @submit="submitHandler" v-model="filter">
          <!-- @submit="submitHandler" v-model="createTestParams" -->
          <FormKitSchema :schema="schemas" />
        </FormKit>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import useTestListColumns from './useTestListColumns';
  import testListFormKitSchema from './testListFormKitSchema.ts';
  const { columns, actionColumn, list, loadDataTable, filter } = useTestListColumns();
  // Form Kit schemas setting
  const { schemas } = testListFormKitSchema();
  const actionRef = ref();
  function submitHandler() {
    actionRef.value.reload();
  }
</script>
