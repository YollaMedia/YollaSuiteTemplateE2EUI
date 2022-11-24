import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CloudServerOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
const routeName = 'proxy';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/proxy',
    name: routeName,
    redirect: '/proxy/servers',
    component: Layout,
    meta: {
      title: 'Proxy',
      icon: renderIcon(CloudServerOutlined),
      ignoreAuth: true,
      // permissions: [
      //   'proxy_servers',
      //   'proxy_servers',
      //   'proxy_rewrite_rules',
      //   'proxy_redirect_rules',
      //   'proxy_map',
      //   'proxy_map_remote',
      // ],
      sort: 0,
    },
    children: [
      {
        path: 'servers',
        name: `${routeName}_servers`,
        meta: {
          title: 'Proxy Servers',
          // permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/list.vue'),
      },
      {
        path: 'create',
        name: `${routeName}_create_servers`,
        meta: {
          title: 'Proxy Create Servers',
          // permissions: [],
          hidden: true,
          affix: true,
        },
        component: () => import('@/views/proxy/servers/create.vue'),
      },
      {
        path: 'create/:id',
        name: `${routeName}_edit_server`,
        meta: {
          title: 'Proy Edit Servers',
          // permissions: [],
          hidden: true,
          affix: true,
        },
        component: () => import('@/views/proxy/servers/create.vue'),
      },
      {
        path: 'rewrite/new',
        name: `${routeName}_rewrite_rules`,
        meta: {
          title: 'Rewrite Rules',
          // permissions: ['proxy_rewrite_rules'],
          isRoot: true,
        },
        component: () => import('@/views/proxy/rewrite/index.vue'),
      },
      {
        path: 'rewrite/:id',
        name: `${routeName}_rewrite_rules_dynamic`,
        meta: {
          title: 'Rewrite Rules',
          // permissions: ['proxy_rewrite_rules'],
          isRoot: true,
          hidden: true,
        },
        component: () => import('@/views/proxy/rewrite/index.vue'),
      },
      {
        path: 'redirect',
        name: `${routeName}_redirect_rules`,
        meta: {
          title: 'Redirect Rules',
          // permissions: ['proxy_redirect_rules'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/list.vue'),
      },
      {
        path: 'map',
        name: `${routeName}_map`,
        meta: {
          title: 'Map to File',
          // permissions: ['proxy_map'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/list.vue'),
      },
      {
        path: 'map-remote/new',
        name: `${routeName}_map_remote`,
        meta: {
          title: 'Proxy Map Remote',
          // permissions: ['proxy_map_remote'],
          isRoot: true,
        },
        component: () => import('@/views/proxy/map-remote/index.vue'),
      },
      {
        path: 'map-remote/:id',
        name: `${routeName}_map_remote_dynamic`,
        meta: {
          title: 'Proxy Map Remote',
          // permissions: ['proxy_map_remote'],
          isRoot: true,
          hidden: true,
        },
        component: () => import('@/views/proxy/map-remote/index.vue'),
      },
    ],
  },
];

export default routes;
