<template>
  <FormKit
    id="testCaseFormId"
    type="form"
    :submit-label="submitLabel"
    :actions="useSubmit"
    :disabled="disabled"
    v-model="formModelValue"
    @submit="submit"
  >
    <slot name="top"></slot>
    <div :class="formClass">
      <FormKit v-for="(item, id) in usedSchema" :key="id" v-bind="item">
        <div v-if="item.children.length > 0" class="w-full flex">
          <FormKit v-for="(i, idx) in item.children" :key="idx" v-bind="i" />
        </div>
      </FormKit>
    </div>
    <slot name="bottom"></slot>
  </FormKit>
</template>

<script lang="ts" setup>
  import type { ComponentType, IOptions } from './types';
  import { YollaCodemirror } from '@/components/YollaFormKit';
  import { createInput } from '@formkit/vue';
  import { toRef, computed, onBeforeUnmount } from 'vue';
  import { reset } from '@formkit/core';
  const codemirror = createInput(YollaCodemirror);

  export interface IFormKitProps {
    type: ComponentType;
    label?: string;
    help?: string;
    name?: string;
    value?: string;
    modelValue?: string;
    options?: IOptions[];
    placeholder?: string;
    outerClass?: string;
    wrapperClass?: string;
    innerClass?: string;
    validation?: string;
    options?: {};
    fieldsetClass?: string;
    optionsClass?: string;
    optionClass?: string;
    legendClass?: string;
    children?: [];
    decoratorClass?: string;
  }

  export interface ISchema {
    disabled?: boolean;
    submitLabel?: string;
    modelValue?: object;
    useSubmit: boolean;
    formClass?: string;
    schema: IFormKitProps[];
    submit?: () => {};
  }
  const props = defineProps<ISchema>();
  // Let FormKit use code mirror.
  const usedSchema = computed(() => {
    const usedSchem = props.schema.map((i) => {
      if (i.type === 'codemirror') {
        i.type = codemirror;
        return i;
      } else if (i.type === 'el') {
        i.type = {
          schema: [
            {
              $el: i.elType,
              children: i.children,
              attrs: {
                class: i.class,
              },
            },
          ],
        };
      }
      return i;
    });
    return usedSchem;
  });
  const formModelValue = toRef(props, 'modelValue');

  // reset form kit before unmount, because of repeater's bug.
  onBeforeUnmount(() => {
    reset('testCaseFormId');
  });
</script>

<style lang="less" scoped></style>
