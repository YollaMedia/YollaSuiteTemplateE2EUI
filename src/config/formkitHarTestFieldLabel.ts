export default {
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
      children: ['Label'],
    },
    {
      $el: 'p',
      attrs: {
        class: 'w-1/5 text-center font-bold',
      },
      children: ['Input Type'],
    },
    {
      $el: 'p',
      attrs: {
        class: 'w-1/5 text-center font-bold',
      },
      children: ['Default Value/Placeholder'],
    },
    {
      $el: 'p',
      attrs: {
        class: 'w-1/5 text-center font-bold',
      },
      children: ['Validation Required'],
    },
    {
      $el: 'p',
      attrs: {
        class: 'w-1/5 text-center font-bold',
      },
      children: ['Regex Validator'],
    },
  ],
};
