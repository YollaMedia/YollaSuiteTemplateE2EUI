import { defineStore } from 'pinia';
import {
  getServers as APIGetServers,
  deleteServer as APIDeleteServer,
  getServer as APIGetServer,
  createServer as APICreateServer,
  updateServer as APIUpdateServer,
} from '@/api/proxy/server';
import { IStoreState } from '/#/proxyServers';
// import { useCodeMirrorStore } from '@/store/modules/codeMirror';
export const useProxyServersStore = defineStore({
  id: 'proxy-servers',
  state: (): IStoreState => ({
    serversDataTable: { page: '', pageCount: '', pageSize: '', list: [] },
    list: [],
    createServerPayload: {
      name: '',
      ip: '',
      proxy_port: 10080,
      api_port: 10088,
      description: '',
    },
  }),
  actions: {
    createServer(callback: Function) {
      APICreateServer(this.createServerPayload).then(() => {
        callback();
      });
    },
    getServer(id: string) {
      APIGetServer(id).then((res) => {
        this.createServerPayload = res;
      });
    },
    updateServer(id: string, callback: Function) {
      APIUpdateServer(this.createServerPayload, id).then(() => {
        callback();
      });
    },
    getServers(params) {
      return APIGetServers(params);
    },
    deleteServer(id: string) {
      APIDeleteServer(id);
    },
  },
});
