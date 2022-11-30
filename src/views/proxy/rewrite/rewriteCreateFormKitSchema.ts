import { YollaCodemirror } from '../../../components/YollaFormKit';
import { createInput } from '@formkit/vue';
import { rewriteTypes } from './helper';
console.log(rewriteTypes);
export default function () {
  const codemirror = createInput(YollaCodemirror);
  const schemas = [
    {
      $formkit: 'text',
      id: 'name',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter a name',
      validation: 'required',
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
      validation: 'required',
    },
    {
      $formkit: 'repeater',
      id: 'repeater',
      name: 'rules',
      label: 'Create Rules',
      addLabel: 'Insert A New Rule',
      children: [
        {
          $formkit: 'dropdown',
          name: 'type',
          label: 'Type',
          options: rewriteTypes,
          placeholder: 'Choose a type.',
          validation: 'required',
        },
        {
          $formkit: 'checkbox',
          label: 'Where',
          name: 'where',
          options: ['Request', 'Response'],
          // help: 'Select your pizza toppings',
        },
        {
          $el: 'p',
          attrs: {
            class: 'font-bold',
          },
          children: ['Match'],
        },
        {
          $formkit: 'text',
          id: 'match_name',
          name: 'match_name',
          label: 'Name',
        },
        {
          $formkit: 'checkbox',
          label: 'Regx',
          name: 'match_name_regx',
          // validation: 'accepted',
        },
        {
          $formkit: 'text',
          id: 'match_value',
          name: 'match_value',
          label: 'Value',
        },
        {
          $formkit: 'checkbox',
          label: 'Regx',
          name: 'match_value_regx',
          // validation: 'accepted',
        },
        {
          $el: 'p',
          attrs: {
            class: 'font-bold',
          },
          children: ['Replace'],
        },
        {
          $formkit: 'text',
          id: 'replace_name',
          name: 'replace_name',
          label: 'Name',
        },
        {
          $formkit: 'checkbox',
          label: 'Regx',
          name: 'replace_name_regx',
          // validation: 'accepted',
        },
        {
          $formkit: 'text',
          id: 'replace_value',
          name: 'replace_value',
          label: 'Value',
        },
        {
          $formkit: 'checkbox',
          label: 'Regx',
          name: 'replace_value_regx',
          // validation: 'accepted',
        },
      ],
    },
  ];
  return { schemas };
}
