import { defineStore } from 'pinia';

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
    createHarTest(values) {
      const formData = this.createForm(values);
    },
    createForm(values) {
      const form = new FormData();
      const keys = Object.keys(values);
      keys.forEach((i) => {
        console.log(i, values[i]);
        if (i == 'har_file') {
          form.append(i, values[i][0].file);
        } else {
          form.append(i, values[i]);
        }
      });

      return form;
    },
  },
});
