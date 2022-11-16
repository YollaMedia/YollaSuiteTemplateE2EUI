import { RewriteTypes } from '../../../../types/rewriteConfig';

const rewriteTypesKeys = Object.keys(RewriteTypes);

export const rewriteTypes = rewriteTypesKeys.map((i) => {
  return RewriteTypes[i];
});
