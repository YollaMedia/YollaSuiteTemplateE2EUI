import { defineStore } from 'pinia';

export const useCodeMirrorStore = defineStore({
  id: 'code-mirror',
  state: () => ({
    value: '',
  }),
  actions: {
    setValue(value) {
      this.value = value;
    },
  },
});
