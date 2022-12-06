import { defineStore } from 'pinia';
import { har_test_prefix } from '@/config/prefix.config';
import {
  createHarTest as APICreateHarTest,
  getHarTest as APIGetHarTest,
} from '@/api/yolla-test/har-test';
export const useTestHarTestStore = defineStore({
  id: 'har-test',
  state: () => ({
    createTestParams: {
      id: null,
      created_at: null,
      started_at: null,
      ended_at: null,
      scheduled_at: null,
      report_date: null,
      page_title: '',
      proxy: {},
      browser: {},
      test_page: '',
      test_runner: '',
      test_cases: [],
      test_suite: 'har_test',
    },
  }),
  actions: {
    createHarTest() {
      const form = new FormData();
      const formKeys = Object.keys(this.createTestParams);
      formKeys.forEach((key) => {
        if (key == 'har_file') {
          form.append(key, this.createTestParams[key][0].file);
        } else if (key == 'test_runner') {
          form.append(key, JSON.stringify([this.createTestParams[key]]));
        } else if (typeof this.createTestParams[key] == 'object') {
          form.append(key, JSON.stringify(this.createTestParams[key]));
        } else {
          form.append(key, this.createTestParams[key]);
        }
      });

      APICreateHarTest(form);
    },
    adjustForm(values) {
      const keys = Object.keys(values);
      const harTestReg = new RegExp(har_test_prefix);
      const adjustTestCases = {};
      keys.forEach((i) => {
        if (harTestReg.test(i)) {
          const [prefix, caseName, fieldName] = i.split('__');
          if (!adjustTestCases[caseName]) {
            adjustTestCases[caseName] = {
              [fieldName]: values[i],
            };
          } else {
            adjustTestCases[caseName][fieldName] = values[i];
          }
        }
      });
      const adjustTestCasesKeys = Object.keys(adjustTestCases);
      adjustTestCasesKeys.forEach((i) => {
        const testCase = { ...adjustTestCases[i] };
        testCase.name = i;
        this.createTestParams.test_cases.push(testCase);
      });
      this.createHarTest();
    },
    getHarTest(id) {
      APIGetHarTest(id).then((res) => {
        console.log(res);
      });
    },
  },
});
