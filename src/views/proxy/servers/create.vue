<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Create Server" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <div class="BasicForm w-1/2 pt-[20px] my-0 mx-auto">
        <!-- <FormKit type="form" submit-label="Save" @submit="submitHandler">
          <FormKitSchema :schema="schemas" />
        </FormKit> -->
        <YInputs
          :useSubmit="true"
          :schema="schema"
          :modelValue="createServerPayload"
          @submit="submitHandler"
          submitLabel="Save"
        />
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { YInputs } from '@/components/YInputs';
  import { ref, reactive } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter, useRoute } from 'vue-router';
  import { useProxyServersStore } from '@/store/modules/proxyServers';
  // Create store
  const store = useProxyServersStore();
  const { createServerPayload } = storeToRefs(store);
  // Vue Router, Route Instance
  const router = useRouter();
  const route = useRoute();
  // Get route parameter
  const id: string = route.params.id;
  // If id has value, modify set to true
  let modify: Ref<boolean> = ref(id ? true : false);

  // Use if to get old value
  // Reset store
  store.$reset();
  if (id) {
    store.getServer(id);
  }
  const schema = reactive([
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter a name',
      validation: 'required',
      innerClass: 'rounded-none',
    },
    {
      type: 'text',
      name: 'ip',
      label: 'IP Address',
      placeholder: 'Hostname with protocol',
      validation: 'required',
      innerClass: 'rounded-none',
    },
    {
      type: 'number',
      label: 'Proxy Port',
      name: 'proxy_port',
      value: 10080,
      validation: 'required',
      innerClass: 'rounded-none',
    },
    {
      type: 'number',
      label: 'API Port',
      name: 'api_port',
      value: 10088,
      validation: 'required',
      innerClass: 'rounded-none',
    },
    {
      type: 'codemirror',
      wrapperClass: 'max-w-full',
      props: {
        context: '$node.context',
      },
      name: 'description',
      label: 'Description',
      validation: 'required',
      innerClass: 'rounded-none',
    },
  ]);
  // Create a new one
  function createServerHandler() {
    store.createServer(() => {
      router.push({ name: 'proxy_servers' });
    });
  }
  // Modify old setting
  function updateServerHandler() {
    store.updateServer(id, () => {
      router.push({ name: 'proxy_servers' });
    });
  }
  function submitHandler() {
    modify.value ? updateServerHandler() : createServerHandler();
  }
</script>

<style lang="less" scoped></style>
