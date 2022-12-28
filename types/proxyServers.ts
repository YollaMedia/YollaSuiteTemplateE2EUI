export interface ICreateServerPayload {
  name: string;
  ip: string;
  proxy_port: number;
  api_port: number;
  description: string;
}

export interface IStoreState {
  serversDataTable: serversDataTable;
  list: [];
  createServerPayload: ICreateServerPayload;
}

interface serversDataTable {
  page: string;
  pageCount: string;
  pageSize: string;
  list: [];
}
