export enum RewriteTypes {
  ADD_HEADER = 'Add Header',
  MODIFY_HEADER = 'Modify Header',
  REMOVE_HEADER = 'Remove Header',
  HOST = 'Host',
  PATH = 'Path',
  URL = 'Url',
  ADD_QUERY_PARAM = 'Add Query Params',
  MODIFY_QUERY_PARAM = 'Modify Query Params',
  REMOVE_QUERY_PARAM = 'Remove Query Params',
  RESPONSE_STATUS = 'Response Status',
  BODY = 'Body',
}

export interface IMatchTypeInterface {
  label: RewriteTypes;
  value: RewriteTypes;
}

export interface IRewriteSetting {
  type: string;
  where: any[];
  matchName: { value: string; regx: any[] };
  matchVaule: { value: string; regx: any[] };
  replaceName: { value: string; regx: any[] };
  replaceVaule: { value: string; regx: any[] };
}
