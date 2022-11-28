import { defineStore } from 'pinia';
import {
  getServers as APIGetServers,
  deleteServer as APIDeleteServer,
  getServer as APIGetServer,
  createServer as APICreateServer,
  updateServer as APIUpdateServer,
} from '@/api/proxy/server';
import { ICreateServerPayload, IStoreState } from '/#/proxyServers';
export const useProxyServersStore = defineStore({
  id: 'proxy-servers',
  state: (): IStoreState => ({
    serversDataTable: { page: '', pageCount: '', pageSize: '', list: [] },
    list: [],
  }),
  actions: {
    createServer(params: ICreateServerPayload, callback: Function) {
      APICreateServer(params).then(() => {
        callback();
      });
    },
    getServer(id: string, callback: Function) {
      APIGetServer(id).then((res) => {
        callback(res);
      });
    },
    updateServer(params: ICreateServerPayload, id, callback: Function) {
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
    deleteServer(id: string) {
      const params = {};
      APIDeleteServer(id).then(() => {
        this.getServers(params);
      });
    },
  },
});
