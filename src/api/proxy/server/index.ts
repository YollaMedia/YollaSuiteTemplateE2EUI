import { http } from '@/utils/http/axios';

//Get Proxy Servers List
export function getServers(params) {
  return http.request({
    url: '/proxy/servers',
    method: 'get',
    params,
  });
}

export function getServer(id) {
  return http.request({
    url: `/proxy/servers/${id}`,
    method: 'get',
  });
}

export function updateServer(params, id) {
  return http.request({
    url: `/proxy/servers/${id}`,
    method: 'put',
    params,
  });
}

export function createServer(params) {
  return http.request({
    url: `/proxy/servers`,
    method: 'post',
    params,
  });
}

export function deleteServer(id) {
  return http.request({
    url: `/proxy/servers/${id}`,
    method: 'delete',
  });
}
