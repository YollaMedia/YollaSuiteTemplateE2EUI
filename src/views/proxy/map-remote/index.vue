<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Proxy Map Remote" />
    </div>
    <n-card :bordered="false" class="proCard">
      <n-grid :cols="5" :x-gap="12">
        <n-gi span="1">
          <n-input v-model:value="filter" type="text" placeholder="Search" />
          <n-list bordered>
            <n-list-item class="list-item" v-for="i in 5" :key="i">
              <router-link to="/">
                <n-space align="center" justify="space-between">
                  <n-space align="center">
                    <n-avatar round style="display: flex; align-items: center"> {{ i }} </n-avatar>
                    <n-space vertical style="gap: 0">
                      <n-text type="dark" class="mb-0" style="font-size: 12px"> Name</n-text>
                      <n-text type="tertiary" style="font-size: 12px"> Time</n-text>
                    </n-space>
                  </n-space>
                  <n-button
                    color="red"
                    :circle="true"
                    size="tiny"
                    strong="true"
                    @click.prevent="clickHandler(i)"
                  >
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </router-link>
            </n-list-item>
          </n-list>
          <n-button type="error" style="width: 100%"> + New Map Rule </n-button>
        </n-gi>
        <n-gi span="4"
          ><n-card :bordered="false" class="mt-4 proCard">
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
                  <Codemirror
                    :style="{ height: '200px', width: '100%', outline: 'none !important' }"
                    v-model="model[field]"
                  />
                </template>
              </BasicForm>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { BasicForm, FormSchema } from '@/components/Form/index';
  import { CloseOutlined } from '@vicons/antd';
  import { useMessage, FormItemRule } from 'naive-ui';
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

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    align-items: center;
  }
</style>
