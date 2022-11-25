<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Upload Har File" />
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
  // import { FormKitSchema, createInput } from '@formkit/vue';
  // import { getNode } from '@formkit/core';
  // import { YollaCodemirror } from '../../../components/YollaFormKit';
  import { useRouter, useRoute } from 'vue-router';
  import { uploadHarTest } from '@/api/yolla-test/har-test';
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
  // const codemirror = createInput(YollaCodemirror);
  const schemas = [
    {
      $formkit: 'text',
      id: 'report_folder',
      name: 'report_folder',
      label: 'Report Folder',
      placeholder: 'Enter a Report Folder',
      validation: 'required',
    },
    {
      $formkit: 'file',
      id: 'har_file',
      name: 'har_file',
      label: 'Har File',
      placeholder: 'Upload Har File',
      validation: 'required',
      multiple: true,
    },
    {
      $formkit: 'file',
      id: 'har_file_refresh',
      name: 'har_file_refresh',
      label: 'Har File Refresh',
      placeholder: 'Upload Har File Refresh',
      // validation: 'required',
    },
  ];
  // Use if to get old value
  // if (id) {
  //   getServer(route.params.id).then((res) => {
  //     for (const key in res) {
  //       schemas.forEach((i) => {
  //         if (i.name === key) {
  //           const node = getNode(key);
  //           node?.input(res[key]);
  //         }
  //       });
  //     }
  //   });
  // }
  // Create payload
  function createPayload(values) {
    let { report_folder, har_file, har_file_refresh } = values;
    let payload = {
      report_folder,
      har_file,
      har_file_refresh,
    };
    return payload;
  }
  // Create a new one
  function uploadHarTestHandler(values) {
    let payload = createPayload(values);
    uploadHarTest(payload).then(() => {
      message.success('Upload Successfully');
    });
  }
  // Modify old setting
  // function updateServerHandler(values) {
  //   let payload = createPayload(values);
  //   updateServer(payload, id).then(() => {
  //     router.push('/proxy/servers');
  //   });
  // }
  function submitHandler(values) {
    uploadHarTestHandler(values);
  }
</script>

<style lang="less" scoped>
  [data-type='file'] .formkit-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 2;
    color: transparent;
  }
</style>
