export interface ITestCaseStoreState {
  search: string;
  list: [];
  caseValue: {
    case_name: string;
    test_suite: string[];
    description: string;
    fields: ICreateTestCaseFieldParams[];
  };
}
enum TestCaseSuitEnum {
  'har_test',
  'e2e_test',
}

enum TestCaseFieldTypeEnum {
  'string',
  'int',
  'float',
  'boolean',
  'object',
}

interface ICreateTestCaseFieldParams {
  name: string;
  type: TestCaseFieldTypeEnum;
  default_value: string;
  required: boolean;
  regex_validator: string;
}

export interface ICreateTestCaseParams {
  case_name: string;
  description: string;
  test_suite: TestCaseSuitEnum;
  default_value: string;
  fields: ICreateTestCaseFieldParams[];
}
