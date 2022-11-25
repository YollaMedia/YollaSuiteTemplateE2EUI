import { h } from 'vue';
import { useRouter } from 'vue-router';
import { useDialog, useMessage, NButton } from 'naive-ui';
import { useProxyServersStore } from '@/store/modules/proxy-servers';

export default function useColumns() {
  const store = useProxyServersStore();
  const router = useRouter();
  const message = useMessage();
  const dialog = useDialog();
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
    {
      title: 'Delete',
      key: 'actions',
      render(row: any) {
        return h('div', {}, [
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              class: 'hover:bg-primary hover:text-white text-primary',
              onClick: () => {
                dialog.error({
                  title: 'Alert',
                  content: `Do you want to delete ${row.name}`,
                  positiveText: 'Confirm',
                  negativeText: 'Cancel',
                  onPositiveClick: () => {
                    store.deleteServer(row.id);
                    store.getServers({});
                    message.success('Successfully');
                  },
                  onNegativeClick: () => {},
                });
              },
            },
            { default: () => 'Delete' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'info',
              class: 'hover:bg-info hover:text-white text-info ml-3',
              onClick: () => router.replace(`/proxy/create/${row.id}`),
            },
            { default: () => 'Edit' }
          ),
        ]);
      },
    },
  ];
  return columns;
}
