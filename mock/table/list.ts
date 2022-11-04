import { Random } from 'mockjs';
import { resultSuccess, doCustomTimes } from '../_util';

const tableList = (pageSize) => {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      // id: '@integer(10,999999)',
      // beginTime: '@datetime',
      // endTime: '@datetime',
      // address: '@city()',
      // name: '@cname()',
      // avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      // date: `@date('yyyy-MM-dd')`,
      // time: `@time('HH:mm')`,
      // 'no|100000-10000000': 100000,
      // 'status|1': [true, false],
      name: 'Clayton Test',
      ip_address: '127.0.0.1',
      proxy_port: '8080',
      api_port: '443',
      description: 'This is a test',
    });
  });
  return result;
};

export default [
  //表格数据列表
  {
    url: '/api/table/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 1 } = query;
      const list = tableList(Number(1));
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 1,
        list,
      });
    },
  },
];
