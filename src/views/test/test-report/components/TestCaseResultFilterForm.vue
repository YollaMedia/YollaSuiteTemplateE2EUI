<template>
  <n-form
    ref="formRef"
    class="flex justify-end items-center"
    :label-width="80"
    :on-submit="updateValue"
  >
    <div class="flex-col">
      <n-radio-group v-model:value="inputValue.type">
        <n-space>
          <n-radio label="All" value="all" />
          <n-radio label="Success" value="success" />
          <n-radio label="Failure" value="failure" />
          <n-radio label="Skipped" value="skipped" />
          <n-radio label="Error" value="error" />
        </n-space>
      </n-radio-group>
    </div>

    <div class="flex-col w-64">
      <n-input
        size="small"
        type="text"
        placeholder="Search"
        v-model:value="inputValue.keyword"
        :loading="false"
      >
        <!-- <template #suffix>
          <n-icon :component="IssuesCloseOutlined" />
        </template> -->
      </n-input>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref, computed, defineEmits } from 'vue';

  export type TTestResultFilterFormData = {
    keyword: string;
    type: string;
  };

  // @see https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
  // @see https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
  // @see https://stackoverflow.com/questions/66585688/what-is-the-difference-between-ref-toref-and-torefs
  const props = defineProps<{
    modelValue: TTestResultFilterFormData;
  }>();

  const inputValue = ref<TTestResultFilterFormData>({
    // keyword: '',
    // type: 'all',
    keyword: props.modelValue.keyword,
    type: props.modelValue.type,
  });

  const emit = defineEmits<{
    // (e: 'change:modelValue', id: number): void;
    (e: 'change:modelValue', value: TTestResultFilterFormData): void;
    (e: 'update:modelValue', value: TTestResultFilterFormData): void;
  }>();

  function updateValue(e: SubmitEvent) {
    e.preventDefault();
    emit('change:modelValue', inputValue.value);
    emit('update:modelValue', inputValue.value);
  }
</script>
