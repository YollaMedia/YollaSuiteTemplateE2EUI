<template>
  <FormKit type="form" :submit-label="submitLabel" v-if="true" v-model="formModelValue">
    <div :class="formClass">
      <FormKit v-for="(item, id) in usedSchema" :key="id" v-bind="item" />
    </div>
  </FormKit>
  <!-- Do not use FormKit Submit -->
  <div v-else>
    <FormKit v-bind="item" v-for="(item, id) in schema" :key="id" v-model="item.modelValue" />
  </div>
</template>

<script lang="ts" setup>
  import type { ComponentType, IOptions } from './types';
  import { YollaCodemirror } from '../../../components/YollaFormKit';
  import { createInput } from '@formkit/vue';
  import { toRef, computed } from 'vue';
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
  }

  export interface ISchema {
    submitLabel?: string;
    modelValue?: object;
    useSubmit: boolean;
    formClass?: string;
    schema: IFormKitProps[];
  }
  const props = defineProps<ISchema>();
  const usedSchema = computed(() => {
    const usedSchem = props.schema.map((i) => {
      if (i.type === 'codemirror') {
        i.type = codemirror;
        return i;
      }
      return i;
    });
    return usedSchem;
  });
  const formModelValue = toRef(props, 'modelValue');
</script>

<style lang="less" scoped></style>
