import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CloudServerOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
const routeName = 'Test';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: routeName,
    redirect: '/test/har-test',
    component: Layout,
    meta: {
      title: 'Test',
      icon: renderIcon(CloudServerOutlined),
      ignoreAuth: true,
      sort: 1,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Test List',
          // permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/test/list/index.vue'),
      },
      {
        path: 'har-test/new',
        name: `test_har_test`,
        meta: {
          title: 'Create Har Test',
          // permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/test/har-test/index.vue'),
      },
      {
        path: 'har-test/:id',
        name: `edit_har_test`,
        meta: {
          title: 'Create Har Test',
          // permissions: ['proxy_servers'],
          hidden: true,
          affix: true,
        },
        component: () => import('@/views/test/har-test/index.vue'),
      },
      {
        path: 'test-case/new',
        name: `${routeName}_test_case_new`,
        meta: {
          title: 'Create Test Case',
          // permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/test/test-case/index.vue'),
      },
      {
        path: 'test-case/:id',
        name: `${routeName}_test_case_dynamic`,
        meta: {
          title: 'Test Case',
          // permissions: ['proxy_servers'],
          isRoot: true,
          hidden: true,
        },
        component: () => import('@/views/test/test-case/index.vue'),
      },
    ],
  },
];

export default routes;
