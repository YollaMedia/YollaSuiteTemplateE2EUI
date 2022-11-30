<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Create Server" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm w-1/2 pt-[20px] my-0 mx-auto">
        <FormKit type="form" submit-label="Save" @submit="submitHandler">
          <FormKitSchema :schema="schemas" />
        </FormKit>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { FormKitSchema } from '@formkit/vue';
  import { getNode } from '@formkit/core';
  import { useRouter, useRoute } from 'vue-router';
  import { ICreateServerPayload } from '/#/proxyServers';
  import { useProxyServersStore } from '@/store/modules/proxyServers';
  import useFormKitSchema from './serversCreateFormKitSchema';
  // Create store
  const store = useProxyServersStore();
  // Naive UI message Instance
  const message = useMessage();
  // Vue Router, Route Instance
  const router = useRouter();
  const route = useRoute();
  // Get route parameter
  const id: string = route.params.id;
  // If id has value, modify set to true
  let modify: Ref<boolean> = ref(id ? true : false);
  // Form kit schema
  const { schemas } = useFormKitSchema();

  // Use if to get old value
  if (id) {
    store.getServer(id, (res) => {
      for (const key in res) {
        schemas.forEach((i) => {
          if (i.name === key) {
            const node = getNode(key);
            node?.input(res[key]);
          }
        });
      }
    });
  }
  // Create payload
  function createPayload(values: ICreateServerPayload): ICreateServerPayload {
    let { name, ip, proxy_port, api_port, description } = values;
    let payload: ICreateServerPayload = {
      name,
      ip,
      proxy_port,
      api_port,
      description,
    };
    return payload;
  }
  // Create a new one
  function createServerHandler(values) {
    let payload = createPayload(values);
    store.createServer(payload, () => {
      // message.success('Successfully');
      router.push({ name: 'proxy_servers' });
    });
  }
  // Modify old setting
  function updateServerHandler(values) {
    let payload = createPayload(values);
    store.updateServer(payload, id, () => {
      // message.success('Successfully');
      router.push({ name: 'proxy_servers' });
    });
  }
  function submitHandler(values) {
    modify.value ? updateServerHandler(values) : createServerHandler(values);
  }
</script>

<style lang="less" scoped></style>
