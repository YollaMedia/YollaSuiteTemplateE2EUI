import { defineStore } from 'pinia';
import { getTests as APIGetTests } from '@/api/yolla-test/index';
export const useTestStore = defineStore({
  id: 'test',
  state: () => ({
    list: [],
    filter: {
      type: '',
      from: '',
      to: '',
    },
    // pagination: {
    //   pageSize: 10,
    // },
  }),
  actions: {
    getTests(payLoad) {
      return APIGetTests(payLoad);
    },
  },
});
