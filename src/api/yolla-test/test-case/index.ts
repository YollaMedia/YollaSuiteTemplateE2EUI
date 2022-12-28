import { http } from '@/utils/http/axios';

export function getTestCases() {
  return http.request({
    url: '/test/test-case',
    method: 'get',
  });
}

export function getTestCase(id) {
  return http.request({
    url: `/test/test-case/${id}`,
    method: 'get',
  });
}

export function createTestCase(params) {
  return http.request({
    url: '/test/test-case',
    method: 'post',
    params,
  });
}

export function deleteTestCase(id) {
  return http.request({
    url: `/test/test-case/${id}`,
    method: 'delete',
  });
}

export function updateTestCase(id, params) {
  return http.request({
    url: `/test/test-case/${id}`,
    method: 'put',
    params,
  });
}
