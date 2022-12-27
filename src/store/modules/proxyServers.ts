import { defineStore } from 'pinia';
import {
  getServers as APIGetServers,
  deleteServer as APIDeleteServer,
  getServer as APIGetServer,
  createServer as APICreateServer,
  updateServer as APIUpdateServer,
} from '@/api/proxy/server';
import { ICreateServerPayload, IStoreState } from '/#/proxyServers';
import { useCodeMirrorStore } from '@/store/modules/codeMirror';
export const useProxyServersStore = defineStore({
  id: 'proxy-servers',
  state: (): IStoreState => ({
    serversDataTable: { page: '', pageCount: '', pageSize: '', list: [] },
    list: [],
    // For code mirror component
    serverDataDescription: '',
  }),
  actions: {
    createServer(params: ICreateServerPayload, callback: Function) {
      APICreateServer(params).then(() => {
        callback();
      });
    },
    getServer(id: string, callback: Function) {
      APIGetServer(id).then((res) => {
        const store = useCodeMirrorStore();
        // For code mirror component
        store.setValue(res.description);
        callback(res);
      });
    },
    updateServer(params: ICreateServerPayload, id, callback: Function) {
      APIUpdateServer(params, id).then(() => {
        callback();
      });
    },
    getServers(params) {
      return APIGetServers(params);
      // APIGetServers(params).then((res) => {
      //   this.serversDataTable.page = res.current_page;
      //   this.serversDataTable.pageCount = res.total;
      //   this.serversDataTable.pageSize = res.per_page;
      //   this.serversDataTable.list = res.data;
      //   this.list = res.data;
      // });
    },
    deleteServer(id: string) {
      const params = {};
      APIDeleteServer(id).then(() => {
        this.getServers(params);
      });
    },
  },
});
