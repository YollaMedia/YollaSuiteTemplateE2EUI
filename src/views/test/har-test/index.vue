<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="New Har Test" header-style="padding-bottom:0;" />
    </div>
    <n-card :bordered="false" class="mt-1">
      <div class="w-full my-0">
        <FormKit
          type="form"
          submit-label="Save"
          @submit="submitHandler"
          v-model="createTestParams"
          :disabled="disbled"
        >
          <FormKitSchema :schema="schemas" />
        </FormKit>
      </div>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useMessage } from 'naive-ui';
  import useFormKitSchema from './testHarTestFormKitSchema';
  import { useTestHarTestStore } from '@/store/modules/testHarTest';
  // Naive UI message Instance
  const message = useMessage();
  const route = useRoute();
  const { adjustForm, getHarTest } = useTestHarTestStore();
  const { id } = route.params;
  let disbled: Ref<boolean> = ref(false);
  if (id && id != 'new') {
    disbled.value = true;
    getHarTest(id);
  }
  let { createTestParams } = storeToRefs(useTestHarTestStore());

  // Form Kit schemas setting
  const { schemas } = useFormKitSchema();
  // submit handler
  function submitHandler(values) {
    adjustForm(values);
  }
</script>

<style lang="less" scoped></style>
