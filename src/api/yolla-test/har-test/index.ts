import { http } from '@/utils/http/axios';

export function uploadHarTest(form) {
  return http.request({
    url: '/test/upload',
    method: 'post',
    params: form,
  });
}
