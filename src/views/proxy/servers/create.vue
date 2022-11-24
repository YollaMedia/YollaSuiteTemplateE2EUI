<template>
  <div style="width: 100%">
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Create Server" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm w-1/2">
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
  import { FormKitSchema, createInput } from '@formkit/vue';
  import { getNode } from '@formkit/core';
  import { YollaCodemirror } from '../../../components/YollaFormKit';
  import { createServer, getServer, updateServer } from '@/api/proxy/server';
  import { useRouter, useRoute } from 'vue-router';
  import { ICreateServerPayload } from '/#/proxyServers';
  // Naive UI message Instance
  const message = useMessage();
  // Vue Router, Route Instance
  const router = useRouter();
  const route = useRoute();
  // Get route parameter
  const id: string | string[] = route.params.id;
  // If id has value, modify set to true
  let modify: Ref<boolean> = ref(id ? true : false);
  // Form Kit schemas setting
  const codemirror = createInput(YollaCodemirror);
  const schemas = [
    {
      $formkit: 'text',
      id: 'name',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter a name',
      validation: 'required',
    },
    {
      $formkit: 'text',
      id: 'ip',
      name: 'ip',
      label: 'IP Address',
      placeholder: 'Hostname with protocol',
      validation: 'required',
    },
    {
      $formkit: 'number',
      label: 'Proxy Port',
      id: 'proxy_port',
      name: 'proxy_port',
      value: 10080,
      validation: 'required',
    },
    {
      $formkit: 'number',
      help: 'What temperature should the house be?',
      label: 'API Port',
      id: 'api_port',
      name: 'api_port',
      value: 10088,
      validation: 'required',
    },
    {
      $cmp: codemirror,
      props: {
        context: '$node.context',
      },
      id: 'description',
      name: 'description',
      $formkit: codemirror,
      label: 'Description',
      validation: 'required',
    },
  ];
  // Use if to get old value
  if (id) {
    getServer(route.params.id).then((res) => {
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
  function createPayload(values): ICreateServerPayload {
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
    createServer(payload).then(() => {
      router.push('/proxy/servers');
    });
  }
  // Modify old setting
  function updateServerHandler(values) {
    let payload = createPayload(values);
    updateServer(payload, id).then(() => {
      router.push('/proxy/servers');
    });
  }
  function submitHandler(values) {
    modify.value ? updateServerHandler(values) : createServerHandler(values);
  }
</script>

<style lang="less" scoped>
  .BasicForm {
    // width: 50%;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
