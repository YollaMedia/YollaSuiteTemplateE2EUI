import { generateClasses } from '@formkit/themes';
// Reference: https://formkit.com/essentials/styling
export default {
  config: {
    classes: generateClasses({
      global: {
        label: 'block mb-1 font-bold text-lg',
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs font-bold',
      },
      text: {
        outer: 'mb-5',
        inner:
          'w-full border border-gray-400 rounded mb-1 overflow-hidden focus-within:border-primary hover:border-primary',
        input:
          'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus-visible:outline-none',
      },
      number: {
        outer: 'mb-5',
        inner:
          'w-full border border-gray-400 rounded mb-1 overflow-hidden focus-within:border-primary hover:border-primary',
        input:
          'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus-visible:outline-none',
      },
      submit: {
        wrapper: 'flex justify-end mt-3',
        input:
          'hover:bg-primary hover:text-white text-primary text-sm px-2 py-1 rounded border-[1px] border-primary transition-all duration-500',
      },
    }),
  },
};
