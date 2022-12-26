import { http } from '@/utils/http/axios';
import { TGetReportParams, ITestResult } from '/#/test';

export function fetchTestReport(params: TGetReportParams): Promise<ITestResult> {
  return http.request({
    baseURL: 'http://localhost:5000',
    url: `/test/report`,
    method: 'get',
    params: params,
  });
}
