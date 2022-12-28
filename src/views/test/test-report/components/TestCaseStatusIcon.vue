<template>
  <n-icon class="" :size="18" :component="data" />
</template>

<script lang="ts" setup>
  import { ITestCaseResult } from '/#/test';
  import {
    CloseOutlined,
    CheckOutlined,
    ExclamationOutlined,
    IssuesCloseOutlined,
  } from '@vicons/antd';
  import { computed } from 'vue';

  type TPropData = {
    testCaseResult: ITestCaseResult;
  };

  const props = defineProps<TPropData>();

  const data = computed(() => {
    if (props.testCaseResult.error) {
      return IssuesCloseOutlined;
    } else if (props.testCaseResult.failure) {
      return CloseOutlined;
    } else {
      return CheckOutlined;
    }
  });
</script>
