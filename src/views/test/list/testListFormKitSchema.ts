export default function () {
  const schemas = [
    {
      $el: 'div',
      attrs: {
        class: 'flex justify-around align-center',
      },
      children: [
        {
          $formkit: 'dropdown',
          name: 'type',
          label: 'Type',
          options: [
            {
              label: 'Har Test',
              value: 'har_test',
            },
            {
              label: 'E2E Test',
              value: 'e2e_test',
            },
          ],
          placeholder: 'Choose a Type.',
          outerClass: '$reset grow mx-2',
        },
        {
          $formkit: 'date',
          name: 'from',
          label: 'From',
          outerClass: '$reset mb-0 grow mx-2',
          wrapperClass: 'max-w-full',
        },
        {
          $formkit: 'date',
          name: 'to',
          label: 'To',
          outerClass: '$reset mb-0 grow mx-2',
          wrapperClass: 'max-w-full',
        },
      ],
    },
  ];
  return { schemas };
}
