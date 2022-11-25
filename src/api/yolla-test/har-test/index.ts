import { http } from '@/utils/http/axios';

export function uploadHarTest(params) {
  return http.request({
    url: '/test/upload',
    method: 'post',
    params,
  });
}
