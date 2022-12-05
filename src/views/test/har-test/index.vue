<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="New Har Test" header-style="padding-bottom:0;" />
    </div>
    <n-card :bordered="false" class="mt-1">
      <div class="w-full my-0">
        <FormKit type="form" submit-label="Save" @submit="submitHandler" v-model="createTestParams">
          <FormKitSchema :schema="schemas" />
        </FormKit>
      </div>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  // import { ref } from 'vue';
  // import type { Ref } from 'vue';
  // ex: let modify: Ref<boolean>
  import { storeToRefs } from 'pinia';
  import { useMessage } from 'naive-ui';
  import useFormKitSchema from './testHarTestFormKitSchema';
  import { useTestHarTestStore } from '@/store/modules/testHarTest';
  // Naive UI message Instance
  const message = useMessage();
  let { createTestParams } = storeToRefs(useTestHarTestStore());
  const { adjustForm } = useTestHarTestStore();
  // Form Kit schemas setting
  const { schemas } = useFormKitSchema();
  // Call API
  function uploadHarTestHandler(values) {
    let form = createForm(values);
    uploadHarTest(form).then(() => {
      message.success('Upload Successfully');
    });
  }
  // submit handler
  function submitHandler(values) {
    adjustForm(values);
  }
</script>

<style lang="less" scoped></style>
