<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Proxy Rewrite Rule List" />
    </div>
    <n-card :bordered="false" class="proCard">
      <n-grid :cols="5" :x-gap="40">
        <!-- List item -->
        <n-gi span="1">
          <n-input v-model:value="filter" type="text" placeholder="Search" />
          <n-list bordered>
            <!-- rewrite list -->
            <n-list-item class="list-item" v-for="i in 1" :key="i">
              <n-space align="center" justify="space-between">
                <router-link :to="{ path: `/proxy/rewrite/${i}` }">
                  <n-space align="center">
                    <n-avatar round style="display: flex; align-items: center">
                      {{ i }}
                    </n-avatar>
                    <n-space vertical style="gap: 0">
                      <n-text type="dark" class="mb-0" style="font-size: 12px"> Name</n-text>
                      <n-text type="tertiary" style="font-size: 12px"> Time</n-text>
                    </n-space>
                  </n-space>
                </router-link>
                <!-- remove button and switch -->
                <n-space align="center">
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
          <n-button type="primary" class="text-primary" style="width: 100%">
            + New Rewrite Rule
          </n-button>
        </n-gi>
        <n-gi span="2" class="mb-6">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Rewrite Rule</n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>
          <FormKit type="form" submit-label="Save" @submit="submitHandler">
            <FormKitSchema :schema="schemas" />
          </FormKit>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import useFormKitSchema from './rewriteCreateFormKitSchema';
  import { FormKitSchema } from '@formkit/vue';
  // import {
  //   RewriteTypes,
  //   IMatchTypeInterface,
  //   IRewriteSetting,
  // } from '../../../../types/rewriteConfig';
  // import { defaultRewriteSetting, copyRewriteSetting } from './default';
  // import { rewriteTypes } from './helper';
  import { ref } from 'vue';
  // import { useRoute, useRouter } from 'vue-router';
  // import { Codemirror } from 'vue-codemirror';
  import { CloseOutlined } from '@vicons/antd';
  // import { useMessage } from 'naive-ui';
  // Form kit schema
  const { schemas } = useFormKitSchema();
  // Route
  // let route = useRoute();
  function clickHandler(id) {
    console.log(id);
  }
  // Used for filter list.
  let filter = ref('');

  function submitHandler(e) {
    console.log(e);
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    align-items: center;
  }
</style>
