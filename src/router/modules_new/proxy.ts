import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CloudServerOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
const routeName = 'Proxy';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/proxy',
    name: routeName,
    redirect: '/proxy/servers',
    component: Layout,
    meta: {
      title: 'Proxy',
      icon: renderIcon(CloudServerOutlined),
      permissions: [
        'proxy_servers',
        'proxy_servers',
        'proxy_rewrite_rules',
        'proxy_redirect_rules',
        'proxy_map',
      ],
      sort: 0,
    },
    children: [
      {
        path: 'servers',
        name: `${routeName}_servers`,
        meta: {
          title: 'Proxy Servers',
          permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/servers.vue'),
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
        path: 'rerwite',
        name: `${routeName}_rewrite_rules`,
        meta: {
          title: 'Rewrite Rules',
          permissions: ['proxy_rewrite_rules'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/servers.vue'),
      },
      {
        path: 'redirect',
        name: `${routeName}_redirect_rules`,
        meta: {
          title: 'Redirect Rules',
          permissions: ['proxy_redirect_rules'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/servers.vue'),
      },
      {
        path: 'map',
        name: `${routeName}_map`,
        meta: {
          title: 'Map to File',
          permissions: ['proxy_map'],
          affix: true,
        },
        component: () => import('@/views/proxy/servers/servers.vue'),
      },
    ],
  },
];

export default routes;
