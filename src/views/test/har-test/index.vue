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
      multiple: false,
    },
    {
      $formkit: 'file',
      id: 'har_file_refresh',
      name: 'har_file_refresh',
      label: 'Har File Refresh',
      placeholder: 'Upload Har File Refresh',
      multiple: false,
    },
  ];
  // Create form
  function createForm(values) {
    let { report_folder, har_file, har_file_refresh } = values;
    let form = new FormData();
    form.append('report_folder', report_folder);
    form.append('har_file', har_file[0].file);
    if (har_file_refresh) {
      form.append('har_file_refresh', har_file_refresh[0].file);
    }

    return form;
  }
  // Create a new one
  function uploadHarTestHandler(values) {
    let form = createForm(values);
    uploadHarTest(form).then(() => {
      message.success('Upload Successfully');
    });
  }
  // submit handler
  function submitHandler(values) {
    uploadHarTestHandler(values);
  }
</script>

<style lang="less" scoped></style>
