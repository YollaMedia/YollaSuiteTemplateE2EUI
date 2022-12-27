import { http } from '@/utils/http/axios';

export function getTests(payLoad) {
  return http.request({
    url: `/test/har-test`,
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: payLoad,
  });
}
