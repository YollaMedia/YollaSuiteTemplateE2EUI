import { YollaCodemirror } from '../../../components/YollaFormKit';
import { createInput } from '@formkit/vue';
import { string } from 'vue-types';
export default function () {
  const codemirror = createInput(YollaCodemirror);
  const schemas = [
    {
      $formkit: 'text',
      id: 'name',
      name: 'case_name',
      label: 'Case Name',
      placeholder: 'Enter a name',
      validation: 'required',
      innerClass: 'w-2/5',
    },
    {
      $el: 'p',
      attrs: {
        class: 'font-bold mb-1',
      },
      children: ['Test Suite'],
    },
    {
      $cmp: 'nSpace',
      children: [
        {
          $formkit: 'checkbox',
          name: 'test_suite',
          // options: ['e2e_test', 'har_test'],
          options: {
            e2e_test: 'E2E TEST',
            har_test: 'HAR TEST',
          },
          fieldsetClass: 'border-none',
          optionsClass: 'flex',
          optionClass: 'mr-3',
        },
      ],
    },

    {
      $cmp: codemirror,
      wrapperClass: 'max-w-full',
      props: {
        context: '$node.context',
      },
      id: 'description',
      name: 'description',
      $formkit: codemirror,
      label: 'Description',
      labelClass: 'mb-2',
      innerClass: 'w-2/5',
    },
    {
      $el: 'p',
      attrs: {
        class: 'font-bold mb-1',
      },
      children: ['Fields'],
    },
    {
      $el: 'div',
      attrs: {
        class: 'flex px-[17px]',
      },
      children: [
        {
          $el: 'p',
          attrs: {
            class: 'w-1/5 text-center font-bold',
          },
          children: ['FIELD NAME'],
        },
        {
          $el: 'p',
          attrs: {
            class: 'w-1/5 text-center font-bold',
          },
          children: ['Type'],
        },
        {
          $el: 'p',
          attrs: {
            class: 'w-1/5 text-center font-bold',
          },
          children: ['DEFAULT VALUE'],
        },
        {
          $el: 'p',
          attrs: {
            class: 'w-1/5 text-center font-bold',
          },
          children: ['ACTIONS'],
        },
        {
          $el: 'p',
          attrs: {
            class: 'w-1/5 text-center font-bold',
          },
          children: ['Regex Validator'],
        },
      ],
    },
    {
      $formkit: 'repeater',
      id: 'repeater',
      name: 'fields',
      contentClass: 'flex flex-row',
      fieldsetClass: 'border-none',
      children: [
        {
          $formkit: 'text',
          id: 'name',
          name: 'name',
          // label: 'Case Name',
          placeholder: 'URL',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0',
        },
        {
          $formkit: 'dropdown',
          name: 'type',
          // label: 'Type',
          options: ['string', 'int', 'float', 'boolean', 'object'],
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          wrapperClass: 'w-full',
        },
        {
          $formkit: 'text',
          id: 'default_value',
          name: 'default_value',
          // label: 'Default',
          placeholder: 'default value',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0',
        },
        {
          $formkit: 'checkbox',
          label: 'required',
          name: 'required',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
        },
        {
          $formkit: 'text',
          id: 'regex_validator',
          name: 'regex_validator',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0',
        },
      ],
    },
  ];
  return { schemas };
}
