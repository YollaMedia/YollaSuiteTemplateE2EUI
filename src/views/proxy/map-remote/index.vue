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
                  <n-button
                    type="primary"
                    circle
                    size="tiny"
                    class="text-primary"
                    @click.prevent="clickHandler(i)"
                  >
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </n-space>
            </n-list-item>
          </n-list>
          <n-button type="primary" style="width: 100%" class="text-primary">
            + New Map Rule
          </n-button>
        </n-gi>
        <n-gi span="2">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Redirect Rule</n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>
          <!-- Form  -->
          <FormKit type="form" submit-label="Save" @submit="submitHandler">
            <FormKitSchema :schema="schemas" />
          </FormKit>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  // import { ref, reactive, markRaw } from 'vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { FormKitSchema, createInput } from '@formkit/vue';
  import { YollaCodemirror } from '../../../components/YollaFormKit';
  import { CloseOutlined } from '@vicons/antd';
  import { useMessage } from 'naive-ui';
  let route = useRoute();
  //Remove map remote handler
  function clickHandler(id) {
    console.log(id);
  }
  // Filter ref
  let filter = ref('');
  // Let codemirror can be used in formkit.
  const codemirror = createInput(YollaCodemirror);
  const schemas = [
    {
      $formkit: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter a name',
      validation: 'required',
    },
    {
      $cmp: codemirror,
      name: 'description',
      $formkit: codemirror,
      label: 'Description',
      validation: 'required',
    },
  ];
  const message = useMessage();
  // Submit event handler
  function submitHandler(values) {
    console.log(values);
    message.success(JSON.stringify(values));
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    align-items: center;
  }
</style>
