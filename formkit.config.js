import { generateClasses } from '@formkit/themes';
// Reference: https://formkit.com/essentials/styling
export default {
  theme: 'genesis',
  config: {
    classes: generateClasses({
      global: {
        label: '$reset block mb-1 font-bold text-lg',
        help: '$reset text-xs text-gray-500',
        messages: '$reset list-none p-0 mt-1 mb-0',
        message: '$reset text-red-500 mb-1 text-xs font-bold',
      },
      text: {
        outer: '$reset mb-5 w-full',
        wrapper: 'w-full max-w-full',
        help: 'self-start',
        messages: 'self-start',
        inner:
          '$reset w-full border border-gray-400 rounded mb-1 overflow-hidden focus-within:border-primary hover:border-primary',
        input:
          '$reset w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus-visible:outline-none',
      },
      number: {
        outer: '$reset mb-5 w-full',
        wrapper: 'w-full max-w-full',
        inner:
          '$reset w-full border border-gray-400 rounded mb-1 overflow-hidden focus-within:border-primary hover:border-primary',
        input:
          '$reset w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus-visible:outline-none',
      },
      submit: {
        wrapper: '$reset flex justify-end mt-3 max-w-full',
        input:
          '$reset hover:bg-primary hover:text-white text-primary text-sm px-2 py-1 rounded border-[1px] border-primary transition-all duration-500',
      },
    }),
  },
};
