import { YollaCodemirror } from '../../../components/YollaFormKit';
import { createInput } from '@formkit/vue';
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
      $formkit: 'text',
      id: 'ip',
      name: 'ip',
      label: 'IP Address',
      placeholder: 'Hostname with protocol',
      validation: 'required',
    },
    {
      $formkit: 'number',
      label: 'Proxy Port',
      id: 'proxy_port',
      name: 'proxy_port',
      value: 10080,
      validation: 'required',
    },
    {
      $formkit: 'number',
      help: 'What temperature should the house be?',
      label: 'API Port',
      id: 'api_port',
      name: 'api_port',
      value: 10088,
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
  ];
  return { schemas };
}
