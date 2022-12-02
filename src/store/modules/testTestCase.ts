import { defineStore } from 'pinia';
import {
  createTestCase as APICreateTestCase,
  getTestCases as APIGetTestCases,
  getTestCase as APIGetCase,
  deleteTestCase as APIDeleteTestCase,
  updateTestCase as APIUpdateTestCase,
} from '@/api/test/test-case';
import { ITestCaseStoreState, ICreateTestCaseParams } from '/#/testTestCase';
import { useCodeMirrorStore } from '@/store/modules/codeMirror';

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
    createTestCase(params: ICreateTestCaseParams) {
      APICreateTestCase(params).then(() => {
        this.getTestCases();
      });
    },
    getTestCases() {
      APIGetTestCases().then((res) => {
        this.list = res.data;
      });
    },
    getTestCase(id: string | number) {
      APIGetCase(id).then((res) => {
        const store = useCodeMirrorStore();
        const { case_name, test_suite, description, fields } = res;
        this.caseValue.case_name = case_name;
        this.caseValue.test_suite = test_suite;
        this.caseValue.description = description;
        store.setValue(description);
        this.caseValue.fields = fields;
      });
    },
    deleteTestCase(id: string | number) {
      APIDeleteTestCase(id).then(() => {
        this.getTestCases();
      });
    },
    updateTestCase(id: string | number, params) {
      APIUpdateTestCase(id, params).then(() => {
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
