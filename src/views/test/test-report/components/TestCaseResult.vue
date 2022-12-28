<template>
  <div :class="data.type == 'success' ? 'bg-green-50' : 'bg-red-100'">
    <h6>
      <NTag size="small" :bordered="false" :type="data.type">{{ data.tagText }}</NTag>
      <b class="mx-2"> {{ data.name }} </b>
    </h6>

    <n-blockquote v-if="data.properties && data.properties.length > 0">
      <div v-for="prop in data.properties" :key="prop['@name']">
        <n-divider dashed />
        <h6>{{ prop['@name'] }}</h6>
        <n-code class="text-xs" :code="prop['@value']" word-wrap language="sh" show-line-numbers />
      </div>
      <n-divider dashed />
    </n-blockquote>

    <n-blockquote v-if="data.message">
      <n-divider dashed />
      <code class="text-xs"> {{ data.message }} </code>
      <n-divider dashed />
      <n-code class="text-xs" :code="data.content" word-wrap language="sh" show-line-numbers />
    </n-blockquote>
  </div>
</template>

<script lang="ts" setup>
  import { ITestCaseResult, ITestCaseProperty } from '/#/test';
  import { computed, defineProps } from 'vue';
  import { NTag } from 'naive-ui';

  type TData = {
    name: string;
    message: string;
    content?: string;
    tagText?: string;
    type?: string;
    properties: ITestCaseProperty[];
  };

  type TPropData = {
    testCaseResult: ITestCaseResult;
  };

  const props = defineProps<TPropData>();

  const data = computed<TData>(() => {
    let result: TData = {
      name: `[${props.testCaseResult['@classname']}] ${props.testCaseResult['@name']}`,
      message: '',
      tagText: 'Passed',
      type: 'success',
      properties: props.testCaseResult.properties?.property || [],
    };

    if (props.testCaseResult.error) {
      result.message = props.testCaseResult.error['@message'];
      result.content = props.testCaseResult.error['#text'];
      result.tagText = 'Error';
      result.type = 'warning';
    } else if (props.testCaseResult.failure) {
      result.message = props.testCaseResult.failure['@message'];
      result.content = props.testCaseResult.failure['#text'];
      result.tagText = 'Failure';
      result.type = 'error';
    }

    return result;
  });
</script>
