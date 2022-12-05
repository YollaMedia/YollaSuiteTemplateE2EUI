import { getServers as APIGetServers } from '@/api/proxy/server';
import { getTestCases as APIGetTestCases } from '@/api/test/test-case';
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
    $el: 'p',
    attrs: {
      class: 'font-bold mb-2',
    },
    children: [`Test Case #${idx + 1} : ${i.case_name}`],
  });
  // create form kit
  i.fields.forEach((field) => {
    if (field.type == 'string' || field.type == 'int' || field.type == 'float') {
      defaultSchemas.push({
        $formkit: 'text',
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        label: field.name,
        value: field.default_value,
        wrapperClass: 'w-1/4',
      });
    } else if (field.type == 'boolean') {
      defaultSchemas.push({
        $formkit: 'radio',
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        label: field.name,
        options: ['true', 'false'],
        value: field.default_value,
        optionsClass: 'flex',
        optionClass: 'w-1/2',
      });
    } else {
      defaultSchemas.push({
        value: field.default_value,
        wrapperClass: 'max-w-full',
        props: {
          context: '$node.context',
        },
        name: `${har_test_prefix}__${i.case_name}__${field.name}`,
        $formkit: codemirror,
        label: field.name,
        labelClass: 'mb-2',
        innerClass: 'w-1/4',
      });
    }
  });

  // defaultSchemas.push();
});
export default function () {
  const schemas = [
    {
      $formkit: 'text',
      id: 'test_page',
      name: 'test_page',
      label: 'Page URL',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      $formkit: 'text',
      id: 'page_title',
      name: 'page_title',
      label: 'Page Title',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      $formkit: 'autocomplete',
      name: 'test_runner',
      label: 'Test Runner',
      options: testRunnerDropdown,
      placeholder: 'Choose a Test Runner.',
      validation: 'required',
      // wrapperClass: 'w-1/4',
      multiple: true,
    },
    {
      $formkit: 'textarea',
      id: 'description',
      name: 'description',
      label: 'Description',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      $formkit: 'file',
      id: 'har_file',
      name: 'har_file',
      label: 'Har File (Upload .har file)',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      $el: 'p',
      attrs: {
        class: 'font-bold text-lg mb-2',
      },
      children: ['Default Test Cases Fields'],
    },
    {
      $el: 'div',
      attrs: {
        class: 'border-2 p-2',
      },
      children: [...defaultSchemas],
    },
  ];
  return { schemas };
}
