import { reactive, h, ref } from 'vue';
import { DeleteOutlined, EditOutlined } from '@vicons/antd';
import { TableAction } from '@/components/Table';
import { useProxyServersStore } from '@/store/modules/proxyServers';
// import { storeToRefs } from 'pinia';
import { useDialog } from 'naive-ui';
import { useRouter } from 'vue-router';
export default function () {
  // Create for refresh table
  const actionRef = ref();
  const store = useProxyServersStore();
  // Get server list
  const loadDataTable = async () => {
    const payLoad = {};
    const data = await store.getServers(payLoad);
    return data;
  };
  // const { list } = storeToRefs(store);
  const dialog = useDialog();
  const router = useRouter();
  const columns = [
    {
      title: 'Name',
      key: 'name',
      defaultSortOrder: false,
    },
    {
      title: 'IP Address',
      key: 'ip',
    },
    {
      title: 'Proxy Port',
      key: 'proxy_port',
    },
    {
      title: 'API Port',
      key: 'api_port',
    },
    {
      title: 'Description',
      key: 'description',
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
  function handleDelete(record) {
    dialog.error({
      title: 'Alert',
      content: `Do you want to delete ${record.name}`,
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        store.deleteServer(record.id);
        actionRef.value.reload();
      },
      onNegativeClick: () => {},
    });
  }
  // route to /proxy/create/${id}
  function handleEdit(record) {
    router.push(`/proxy/create/${record.id}`);
  }
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
  // route to /proxy/create
  function addServer() {
    router.push('/proxy/create');
  }
  return { columns, actionColumn, addServer, loadDataTable, actionRef };
}
