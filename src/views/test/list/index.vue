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
        <!-- <FormKit type="form" submit-label="Search" @submit="submitHandler" v-model="filter">
          <FormKitSchema :schema="schemas" />
        </FormKit> -->
        <YInputs
          :useSubmit="true"
          form-class="flex justify-content-around"
          :schema="schema"
          :modelValue="filter"
          :submit="submitHandler"
        />
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { YInputs } from '@/components/YInputs';
  import useTestListColumns from './useTestListColumns';
  import { useTestStore } from '@/store/modules/test';
  import { storeToRefs } from 'pinia';
  const store = useTestStore();
  const { filter } = storeToRefs(store);
  const { columns, actionColumn, loadDataTable } = useTestListColumns();
  const actionRef = ref();

  function submitHandler() {
    actionRef.value.reload();
  }

  // YInput Schema
  const schema = reactive([
    {
      type: 'dropdown',
      name: 'type',
      value: '',
      label: 'Type',
      placeholder: 'Choose a Type.',
      outerClass: '$reset grow mx-2',
      innerClass: 'rounded-none',
      options: [
        {
          label: 'Har Test',
          value: 'har_test',
        },
        {
          label: 'E2E Test',
          value: 'e2e_test',
        },
      ],
    },
    {
      type: 'date',
      name: 'from',
      label: 'From',
      outerClass: '$reset mb-0 grow mx-2',
      wrapperClass: 'max-w-full',
      innerClass: 'rounded-none',
    },
    {
      type: 'date',
      name: 'to',
      label: 'To',
      outerClass: '$reset mb-0 grow mx-2',
      wrapperClass: 'max-w-full',
      innerClass: 'rounded-none',
    },
  ]);
</script>
