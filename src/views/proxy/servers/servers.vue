<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="Server List"
      titleTooltip="Server List Table"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <!-- <n-button type="primary" @click="reloadTable">Refresh Data</n-button> -->
        <n-button type="info" dashed @click="addServer"> Add </n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { reactive, ref, h } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './basicColumns';
  import { useDialog, useMessage } from 'naive-ui';
  import { DeleteOutlined, EditOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';

  const message = useMessage();
  const dialog = useDialog();
  const router = useRouter();
  const actionRef = ref();

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 150,
    title: 'Actions',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction as any, {
        style: 'text',
        actions: createActions(record),
      });
    },
  });

  function createActions(record) {
    return [
      {
        label: 'Delete',
        type: 'error',
        // 配置 color 会覆盖 type
        color: 'red',
        icon: DeleteOutlined,
        onClick: handleDelete.bind(null, record),
        // 根据业务控制是否显示 isShow 和 auth 是并且关系
        ifShow: () => {
          return true;
        },
        // 根据权限控制是否显示: 有权限，会显示，支持多个
        auth: ['basic_list'],
      },
      {
        label: 'Edit',
        type: 'primary',
        icon: EditOutlined,
        onClick: handleEdit.bind(null, record),
        ifShow: () => {
          return true;
        },
        auth: ['basic_list'],
      },
    ];
  }

  const loadDataTable = async (res) => {
    // return [];
    return await getTableList({ ...params, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function handleDelete(record) {
    console.log(record);
    dialog.info({
      title: 'Alert',
      content: `Do you want to delete ${record.name}`,
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        message.success('Successfully');
      },
      onNegativeClick: () => {},
    });
  }

  function handleEdit(record) {
    console.log(record);
    message.success('You click edit');
  }
  function addServer() {
    router.push('/proxy/create');
  }
</script>

<style lang="less" scoped></style>
