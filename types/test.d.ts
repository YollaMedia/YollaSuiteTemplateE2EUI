export type TGetReportParams = {
  report_folder: string;
};

// export type TTestResultFilterFormData = {
//   keyword: string;
//   type: string;
// };

// export type TTestResultFilterFormProp = {
//   filterValue: TTestResultFilterFormData;
// };

// export type DataTableFilterState = {
//   [key: string]: Array<string | number> | string | number | null | undefined
// };

export interface ITestCaseFailureMessage {
  '@message': string;
  '#text': string;
}

export interface ITestCaseProperty {
  '@name': string;
  '@value': string;
}

export interface ITestCaseProperties {
  property: ITestCaseProperty[];
}

export interface ITestCaseResult {
  '@classname': string;
  '@name': string;
  '@time': string;
  failure?: ITestCaseFailureMessage;
  error?: ITestCaseFailureMessage;
  skipped?: ITestCaseFailureMessage;
  properties?: ITestCaseProperties;
}

export interface ITestSuite {
  '@name': string;
  '@errors': number;
  '@failures': number;
  '@skipped': number;
  '@tests': number;
  '@time': number;
  '@timestamp': string;
  '@hostname': string;
  testcase: ITestCaseResult[];
}

export interface ITestSuites {
  testsuite: ITestSuite;
}

export interface ITestReport {
  id?: number;
  testsuites: ITestSuites;
}

export interface IProxyConfig {
  mode: string;
}

export interface IProxy {
  config: IProxyConfig;
  host: string;
}

export interface ITestConfig {
  id?: number;
  test_type: string;
  created_at?: number;
  ended_at?: number;
  scheduled_at?: number;
  started_at?: number;
  page_title?: string;
  proxy: IProxy;
  report_date: string;
  report_folder?: string;
  test_cases: any[];
  test_page: string[];
  test_runner: {
    api: string;
  };
  test_suite: string;
}

export interface ITestResult {
  config: ITestConfig;
  report: ITestReport;
}
