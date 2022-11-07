<template>
  <div sjtyle="width: 100%">
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Create Server" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm">
        <BasicForm
          submitButtonText="Create"
          resetButtonText="Reset"
          layout="horizontal"
          :gridProps="{ cols: 1 }"
          :schemas="schemas"
          @submit="handleSubmit"
          @reset="handleReset"
          labelWidth="100px"
        >
          <template #statusSlot="{ model, field }">
            <!-- <n-input v-model:value="model[field]" placeholder="Description" type="textarea" /> -->
            <Codemirror :style="{ height: '200px', width: '100%' }" v-model="model[field]" />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import { BasicForm, FormSchema } from '@/components/Form/index';
  import { useMessage, FormItemRule } from 'naive-ui';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: 'Name',
      isFull: true,
      // labelMessage: 'Enter name',
      componentProps: {
        placeholder: 'Please Enter Name',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please Enter Name', trigger: ['blur'] }],
    },
    {
      field: 'ip',
      component: 'NInput',
      label: 'IP Address',
      componentProps: {
        placeholder: 'Hostname with protocol',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please Enter IP Address', trigger: ['blur'] }],
    },
    {
      field: 'proxy',
      component: 'NInput',
      label: 'Proxy Port',
      defaultValue: 10080,
      componentProps: {
        placeholder: '0-65535',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [
        {
          required: true,
          message: 'Please Enter Proxy Port',
          trigger: ['blur'],
          validator: (rule: FormItemRule, value) => {
            return value > 0 && value < 65536;
          },
        },
      ],
    },
    {
      field: 'api',
      component: 'NInputNumber',
      label: 'API Port',
      defaultValue: 10088,
      componentProps: {
        placeholder: '0-65535',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [
        {
          required: true,
          message: 'Please Enter API Port',
          trigger: ['blur'],
          validator: (rule: FormItemRule, value) => {
            return value > 0 && value < 65536;
          },
        },
      ],
    },
    {
      field: 'description',
      label: 'Description',
      // Use slot to render unsurpported component
      slot: 'statusSlot',
      rules: [{ required: true, message: 'Please Enter Description', trigger: ['blur'] }],
    },
  ];

  const message = useMessage();

  function handleSubmit(values: Recordable) {
    console.log(values);
    message.success(JSON.stringify(values));
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped>
  .BasicForm {
    width: 50%;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
