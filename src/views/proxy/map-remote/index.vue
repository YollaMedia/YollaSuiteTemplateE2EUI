<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Proxy Map Remote List" />
    </div>
    <n-card :bordered="false" class="proCard">
      <n-grid :cols="5" :x-gap="40">
        <n-gi span="1">
          <n-input v-model:value="filter" type="text" placeholder="Search" />
          <n-list bordered>
            <n-list-item class="list-item" v-for="i in 1" :key="i">
              <n-space align="center" justify="space-between">
                <router-link :to="{ path: `/proxy/map-remote/${i}` }">
                  <n-space align="center">
                    <n-avatar round style="display: flex; align-items: center"> {{ i }} </n-avatar>
                    <n-space vertical style="gap: 0" justify="center">
                      <n-text type="dark" class="mb-0" style="font-size: 12px"> Name</n-text>
                      <n-text type="tertiary" style="font-size: 12px"> Time</n-text>
                    </n-space>
                  </n-space>
                </router-link>
                <n-space>
                  <n-switch size="small" />
                  <n-button type="primary" circle size="tiny" @click.prevent="clickHandler(i)">
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </n-space>
            </n-list-item>
          </n-list>
          <n-button type="primary" style="width: 100%"> + New Map Rule </n-button>
        </n-gi>
        <n-gi span="2">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Redirect Rule</n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>
          <div class="BasicForm">
            <BasicForm
              submitButtonText="Save"
              layout="horizontal"
              :gridProps="{ cols: 1 }"
              :schemas="schemas"
              @submit="handleSubmit"
              labelWidth="100px"
              :showResetButton="false"
            >
              <template #statusSlot="{ model, field }">
                <!-- <n-input v-model:value="model[field]" placeholder="Description" type="textarea" /> -->
                <Codemirror
                  :style="{ height: '200px', width: '100%', outline: 'none !important' }"
                  v-model="model[field]"
                />
              </template>
            </BasicForm>
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Codemirror } from 'vue-codemirror';
  import { BasicForm, FormSchema } from '@/components/Form/index';
  import { CloseOutlined } from '@vicons/antd';
  import { useMessage, FormItemRule } from 'naive-ui';
  let route = useRoute();
  //Remove map remote handler
  function clickHandler(id) {
    console.log(id);
  }
  let filter = ref('');
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

  // function handleReset(values: Recordable) {
  //   console.log(values);
  // }
</script>

<style scoped>
  .list-item {
    display: flex;
    align-items: center;
  }
</style>
