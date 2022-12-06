import { http } from '@/utils/http/axios';

export function createHarTest(form) {
  return http.request({
    url: '/test/har-test',
    method: 'post',
    params: form,
  });
}

export function getHarTest(id) {
  return http.request({
    url: `/test/har-test/${id}`,
    method: 'get',
  });
}
