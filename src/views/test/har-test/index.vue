<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="New Har Test" header-style="padding-bottom:0;" />
    </div>
    <n-card :bordered="false" class="mt-1">
      <div class="w-full my-0">
        <!-- <FormKit
          type="form"
          submit-label="Save"
          @submit="submitHandler"
          v-model="createTestParams"
          :disabled="disbled"
        >
          <FormKitSchema :schema="schemas" />
        </FormKit> -->
        <YInputs
          :useSubmit="true"
          :schema="schema"
          @submit="submitHandler"
          submitLabel="Save"
          :modelValue="createTestParams"
        >
          <template #bottom>
            <p class="font-bold text-lg mb-2">Default Test Cases Fields</p>
            <div class="border-2 p-2">
              <YInputs :useSubmit="false" :schema="defaultSchemas" />
            </div>
          </template>
        </YInputs>
      </div>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { YInputs } from '@/components/YInputs';
  import { ref, reactive } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import useFormKitSchema from './testHarTestFormKitSchema';
  import { useTestHarTestStore } from '@/store/modules/testHarTest';
  const route = useRoute();
  const router = useRouter();

  const { adjustForm, getHarTest } = useTestHarTestStore();
  const store = useTestHarTestStore();
  // reset store---------------------------------
  store.$reset();
  // set createTestParams------------------------
  const { createTestParams } = storeToRefs(store);
  // Get route id, to check disabled or not.-----
  const { id } = route.params;
  let disbled: Ref<boolean> = ref(false);
  if (id && id != 'new') {
    disbled.value = true;
    getHarTest(id);
  }
  //---------------------------------------------

  // Form Kit schemas setting--------------------
  // const { schemas } = useFormKitSchema();
  const { testRunnerDropdown, defaultSchemas } = useFormKitSchema();
  const schema = reactive([
    {
      type: 'text',
      name: 'test_page',
      label: 'Page URL',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      type: 'text',
      name: 'page_title',
      label: 'Page Title',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      type: 'dropdown',
      name: 'test_runner',
      label: 'Test Runner',
      options: testRunnerDropdown,
      placeholder: 'Choose a Test Runner.',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
    {
      type: 'file',
      id: 'har_file',
      name: 'har_file',
      label: 'Har File (Upload .har file)',
      validation: 'required',
      wrapperClass: 'w-1/4',
    },
  ]);
  //---------------------------------------------
  // submit handler -----------------------------
  function submitHandler(values) {
    console.log(values);
    // adjustForm(values, () => {
    //   router.push({ name: 'Test_list' });
    // });
  }
  //---------------------------------------------
</script>

<style lang="less" scoped></style>
