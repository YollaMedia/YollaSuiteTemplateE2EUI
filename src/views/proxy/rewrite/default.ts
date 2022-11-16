import { IRewriteSetting } from '/#/rewriteConfig';
export const defaultRewriteSetting: IRewriteSetting = {
  type: '',
  where: [],
  matchName: { value: '', regx: [] },
  matchVaule: { value: '', regx: [] },
  replaceName: { value: '', regx: [] },
  replaceVaule: { value: '', regx: [] },
};

export function copyRewriteSetting(): IRewriteSetting {
  return JSON.parse(JSON.stringify(defaultRewriteSetting));
}
