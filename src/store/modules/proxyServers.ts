import { defineStore } from 'pinia';
import {
  getServers as APIGetServers,
  deleteServer as APIDeleteServer,
  getServer as APIGetServer,
  createServer as APICreateServer,
  updateServer as APIUpdateServer,
} from '@/api/proxy/server';
export const useProxyServersStore = defineStore({
  id: 'proxy-servers',
  state: () => ({
    serversDataTable: { page: '', pageCount: '', pageSize: '', list: [] },
    list: [],
  }),
  actions: {
    createServer(params, callback: Function) {
      APICreateServer(params).then(() => {
        callback();
      });
    },
    getServer(id, callback: Function) {
      APIGetServer(id).then((res) => {
        callback(res);
      });
    },
    updateServer(params, id, callback: Function) {
      APIUpdateServer(params, id).then(() => {
        callback();
      });
    },
    getServers(params) {
      APIGetServers(params).then((res) => {
        this.serversDataTable.page = res.current_page;
        this.serversDataTable.pageCount = res.total;
        this.serversDataTable.pageSize = res.per_page;
        this.serversDataTable.list = res.data;
        this.list = res.data;
      });
    },
    deleteServer(id: String | Number) {
      const params = {};
      APIDeleteServer(id).then(() => {
        this.getServers(params);
      });
    },
  },
});
