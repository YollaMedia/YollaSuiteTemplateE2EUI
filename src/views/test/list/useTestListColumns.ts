import { reactive, h } from 'vue';
import { EditOutlined, DatabaseOutlined } from '@vicons/antd';
import { TableAction } from '@/components/Table';
import { useTestStore } from '@/store/modules/test';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
export default function () {
  const router = useRouter();
  const store = useTestStore();
  const loadDataTable = async (params) => {
    const payLoad = { ...params, ...store.filter };
    const data = await store.getTests(payLoad);
    data.data.forEach((i) => {
      i.created_at = new Date(i.created_at).toLocaleString();
    });
    return data;
  };

  const { list, filter } = storeToRefs(store);
  const columns = [
    {
      title: 'ID',
      key: 'id',
      defaultSortOrder: false,
    },
    {
      title: 'Page URL',
      key: 'test_page',
    },
    {
      title: 'Created at',
      key: 'created_at',
    },
  ];
  const actionColumn = reactive({
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
        label: 'Report',
        type: 'error',
        // 配置 color 会覆盖 type
        color: 'red',
        icon: DatabaseOutlined,
        onClick: toReport.bind(null, record),
        // 根据业务控制是否显示 isShow 和 auth 是并且关系
        ifShow: () => {
          return true;
        },
        // 根据权限控制是否显示: 有权限，会显示，支持多个
        auth: ['basic_list'],
      },
      {
        label: 'Edit',
        type: 'info',
        icon: EditOutlined,
        onClick: handleEdit.bind(null, record),
        ifShow: () => {
          return true;
        },
        auth: ['basic_list'],
      },
    ];
  }
  function toReport(record) {
    router.push({ name: 'Test_test_report', params: { id: record.id } });
  }
  // route to /proxy/create/${id}
  function handleEdit(record) {
    router.push({ name: 'edit_har_test', params: { id: record.id } });
  }
  return { columns, actionColumn, loadDataTable, filter };
}
