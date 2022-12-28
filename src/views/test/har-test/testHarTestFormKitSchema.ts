import { getServers as APIGetServers } from '@/api/proxy/server';
import { getTestCases as APIGetTestCases } from '@/api/yolla-test/test-case';
import { YollaCodemirror } from '../../../components/YollaFormKit';
import { createInput } from '@formkit/vue';
import { har_test_prefix } from '@/config/prefix.config';

const codemirror = createInput(YollaCodemirror);
// Get server to test runner dropdown list.
const proxyServers = await APIGetServers({});
const testRunnerDropdown = proxyServers.data.map((i) => {
  return { label: i.name, value: i.id };
});
// Get Test cases which is har test
const testCases = await APIGetTestCases();
const harDefaultTestCase = testCases.data.filter((i) => {
  return i.test_suite.indexOf('har_test') > -1;
});
// Change Test Case Fields into input.
const defaultSchemas: any[] = [];
harDefaultTestCase.forEach((i, idx) => {
  defaultSchemas.push({
    type: 'el',
    class: 'font-bold mb-2',
    children: `Test Case #${idx + 1} : ${i.case_name}`,
  });
  // create form kit which fields are from create test cases.
  i.fields.forEach((field) => {
    if (field.type == 'string' || field.type == 'int' || field.type == 'float') {
      defaultSchemas.push({
        type: 'text',
        // Use prefix for creating API payload easily.
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        label: field.name,
        value: field.default_value,
        wrapperClass: 'w-1/4',
      });
    } else if (field.type == 'boolean') {
      defaultSchemas.push({
        type: 'radio',
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        label: field.name,
        options: ['true', 'false'],
        value: field.default_value,
        optionsClass: 'flex',
        optionClass: 'w-1/2',
        fieldsetClass: 'w-1/4',
      });
    } else {
      defaultSchemas.push({
        value: field.default_value,
        wrapperClass: 'max-w-full',
        props: {
          context: '$node.context',
        },
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        type: codemirror,
        label: field.name,
        labelClass: 'mb-2',
        innerClass: 'w-1/4',
      });
    }
  });

  // defaultSchemas.push();
});
export default function () {
  return { testRunnerDropdown, defaultSchemas };
}
