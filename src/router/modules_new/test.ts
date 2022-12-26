import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CloudServerOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
import TestReport from '@/views/test/test-report/TestReport.vue';

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
        path: 'har-test',
        name: `${routeName}_har-test`,
        meta: {
          title: 'Test har-test',
          // permissions: ['proxy_servers'],
          affix: true,
        },
        component: () => import('@/views/test/har-test/index.vue'),
      },
      {
        path: 'test-report/:id',
        name: `${routeName}_test-report`,
        meta: {
          title: 'Test Reporting',
          affix: true,
        },
        component: TestReport,
      },
    ],
  },
];

export default routes;
