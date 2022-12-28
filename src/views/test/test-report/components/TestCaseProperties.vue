<template>
  <n-descriptions label-placement="top" :column="4">
    <n-descriptions-item label="AA"> BB </n-descriptions-item>
  </n-descriptions>
</template>

<script lang="ts" setup>
  import { ITestCaseResult } from '/#/test';

  type TPropData = {
    testCaseResult: ITestCaseResult;
  };

  const props = defineProps<TPropData>();
</script>
