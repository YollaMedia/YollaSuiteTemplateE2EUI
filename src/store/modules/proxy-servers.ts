import { defineStore } from 'pinia';
import { getServers, deleteServer } from '@/api/proxy/server';
export const useProxyServersStore = defineStore({
  id: 'proxy-servers',
  state: () => ({
    serversDataTable: { page: '', pageCount: '', pageSize: '', list: [] },
    list: [],
  }),
  actions: {
    getServers(params) {
      getServers(params).then((res) => {
        this.serversDataTable.page = res.current_page;
        this.serversDataTable.pageCount = res.total;
        this.serversDataTable.pageSize = res.per_page;
        this.serversDataTable.list = res.data;
        this.list = res.data;
      });
    },
    deleteServer(id) {
      const params = {};
      deleteServer(id).then(() => {
        this.getServers(params);
      });
    },
  },
});
