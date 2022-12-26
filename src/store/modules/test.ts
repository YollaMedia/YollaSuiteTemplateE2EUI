import { TGetReportParams, ITestReport, ITestConfig } from '/#/test';
import { defineStore } from 'pinia';
import { fetchTestReport } from '@/api/yolla-test/test-report/testReport';

export const useTestReportStore = defineStore({
  id: 'test_report',
  state: (): {
    testReports: ITestReport[];
    testReport: ITestReport | null;
    testConfig: ITestConfig | null;
    loading: boolean;
    error: Error | null;
  } => ({
    testReports: [],
    testReport: null,
    testConfig: null,
    loading: false,
    error: null,
  }),
  // getters: {
  //   getReportFolder: state => {
  //     return
  //   }
  // },
  actions: {
    async getTestReport(params: TGetReportParams) {
      this.error = null;
      this.testReport = null;
      this.loading = true;

      try {
        const result = await fetchTestReport(params);
        this.testReport = result.report;
        this.testConfig = result.config;
      } catch (error) {
        console.log(error);
        this.error = error as Error;
      } finally {
        this.loading = false;
      }
    },
  },
});
