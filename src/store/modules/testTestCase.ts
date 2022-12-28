import { defineStore } from 'pinia';
import {
  createTestCase as APICreateTestCase,
  getTestCases as APIGetTestCases,
  getTestCase as APIGetCase,
  deleteTestCase as APIDeleteTestCase,
  updateTestCase as APIUpdateTestCase,
} from '@/api/yolla-test/test-case';
import { ITestCaseStoreState } from '/#/testTestCase';

export const useTestTestCaseStore = defineStore({
  id: 'test-case',
  state: (): ITestCaseStoreState => ({
    search: '',
    list: [],
    caseValue: {
      case_name: '',
      test_suite: [],
      description: '',
      fields: [],
    },
  }),
  actions: {
    setInitialCaseValue() {
      this.caseValue = {
        case_name: '',
        test_suite: [],
        description: '',
        fields: [],
      };
    },
    createTestCase() {
      APICreateTestCase(this.caseValue).then(() => {
        this.getTestCases();
      });
    },
    getTestCases() {
      APIGetTestCases().then((res) => {
        this.list = res.data;
      });
    },
    getTestCase(id: string | number) {
      this.setInitialCaseValue();
      APIGetCase(id).then((res) => {
        this.caseValue = res;
      });
    },
    deleteTestCase(id: string | number) {
      APIDeleteTestCase(id).then(() => {
        this.getTestCases();
      });
    },
    updateTestCase(id: string | number) {
      APIUpdateTestCase(id, this.caseValue).then(() => {
        location.reload();
      });
    },
  },
  getters: {
    searchFiltered: (state) => {
      return state.search;
    },
  },
});
