<template>
  <div>
    <h6>{{ props.title }}</h6>
    <code class="text-xs text-gray-400" v-if="props.subTitle">{{ props.subTitle }}</code>
  </div>
</template>

<script lang="ts" setup>
  // import { ITestCaseResult } from '/#/test';
  import { computed, toRefs, defineProps } from 'vue';

  type TData = {
    title: string;
    subTitle?: string;
  };

  // export default {
  //   props: {
  //     title: String,
  //     subTitle: String,
  //   },
  //   setup(props) {
  //     // const { title } = toRefs(props);
  //   },
  // };
  const props = defineProps<TData>();

  // const testCaseResultRef = toRefs(props);

  // const data: TData = computed((): TData => {
  //   return {
  //     title: testCaseResultRef.testCaseResult.value['@name'],
  //     subTitle: 'SubTitle',
  //   };
  // });
</script>
