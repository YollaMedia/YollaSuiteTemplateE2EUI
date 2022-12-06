import { http } from '@/utils/http/axios';
import qs from 'qs';

export function getTests(payLoad) {
  console.log(qs.stringify(payLoad));
  return http.request({
    url: `/test/har-test?${qs.stringify(payLoad)}`,
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // params: qs.stringify(payLoad),
  });
}
