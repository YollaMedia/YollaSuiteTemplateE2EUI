<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Create/Edit Test Case" />
    </div>
    <n-card :bordered="false" class="proCard">
      <n-grid :cols="5" :x-gap="40">
        <!-- List item -->

        <n-gi span="1">
          {{ searchFiltered }}
          <n-input type="text" placeholder="Search" v-model:value="search" />
          <n-list bordered>
            <!-- rewrite list -->
            <n-list-item class="list-item" v-for="i in list" :key="i.id">
              <n-space align="center" justify="space-between">
                <router-link :to="{ path: `/test/test-case/${i.id}` }">
                  <n-space align="center">
                    <n-avatar round style="display: flex; align-items: center">
                      {{ i.id }}
                    </n-avatar>
                    <n-space vertical style="gap: 0">
                      <n-text type="dark" class="mb-0" style="font-size: 12px">
                        {{ i.case_name }}</n-text
                      >
                      <n-text type="tertiary" style="font-size: 12px">
                        {{ new Date(i.created_at).getFullYear() }}/
                        {{ new Date(i.created_at).getMonth() + 1 }}/
                        {{ new Date(i.created_at).getDate() }}-
                        {{ new Date(i.created_at).getHours() }}:
                        {{ new Date(i.created_at).getMinutes() }}
                      </n-text>
                    </n-space>
                  </n-space>
                </router-link>
                <!-- remove button and switch -->
                <n-space align="center">
                  <!-- <n-switch size="small" /> -->
                  <n-button
                    type="primary"
                    circle
                    size="tiny"
                    class="text-primary hover:bg-primary hover:text-white"
                    @click="handleDelete(i.id, i.case_name)"
                  >
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </n-space>
            </n-list-item>
          </n-list>
          <router-link :to="{ name: 'Test_test_case_new' }">
            <n-button
              type="primary"
              class="text-primary hover:bg-primary hover:text-white"
              style="width: 100%"
            >
              + New Rewrite Rule
            </n-button>
          </router-link>
        </n-gi>
        <n-gi span="4" class="mb-6">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Create/Edit Test Case </n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>

          <YInputs
            :useSubmit="true"
            :schema="schema"
            :modelValue="caseValue"
            :submit="submitHandler"
            submitLabel="Save"
          />
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script setup>
  import { YInputs } from '@/components/YInputs';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { CloseOutlined } from '@vicons/antd';
  import { useTestTestCaseStore } from '@/store/modules/testTestCase';
  import { useDialog } from 'naive-ui';
  // Search input
  // const search = ref('');
  // get test cases store data
  const store = useTestTestCaseStore();
  store.$reset();
  const { getTestCases, createTestCase, getTestCase, deleteTestCase, updateTestCase } = store;
  let { list, caseValue, search, searchFiltered } = storeToRefs(store);
  const dialog = useDialog();
  const schema = [
    {
      type: 'text',
      name: 'case_name',
      label: 'Case Name',
      placeholder: 'Enter a name',
      validation: 'required',
      innerClass: 'w-2/5 rounded-none',
    },
    {
      type: 'checkbox',
      label: 'Test Suite',
      name: 'test_suite',
      options: {
        e2e_test: 'E2E TEST',
        har_test: 'HAR TEST',
      },
      fieldsetClass: 'border-none p-0',
      optionsClass: 'flex',
      optionClass: 'mr-3',
      legendClass: 'text-sm p-0 mb-[4px]',
      decoratorClass: 'rounded-none',
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
      labelClass: 'mb-2',
      innerClass: 'w-2/5 rounded-none',
    },
    {
      type: 'repeater',
      name: 'fields',
      contentClass: 'flex flex-row',
      fieldsetClass: 'border-none p-0',
      addButtonClass: 'flex justify-end',
      children: [
        {
          type: 'text',
          name: 'name',
          label: 'Case Name',
          placeholder: 'URL',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0 rounded-none',
        },
        {
          type: 'dropdown',
          name: 'type',
          label: 'Type',
          options: ['string', 'int', 'float', 'boolean', 'object'],
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          wrapperClass: 'w-full',
          innerClass: 'rounded-none',
        },
        {
          type: 'text',
          name: 'default_value',
          label: 'Default',
          placeholder: 'default value',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0 rounded-none',
        },
        {
          type: 'checkbox',
          label: 'ACTIONS',
          label: 'Required',
          name: 'required',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          decoratorClass: 'rounded-none',
        },
        {
          type: 'text',
          label: 'Regex Validator',
          id: 'regex_validator',
          name: 'regex_validator',
          outerClass: '$reset mb-0 w-1/5 mx-1 flex justify-center items-center',
          innerClass: 'mb-0 rounded-none',
        },
      ],
    },
  ];

  const route = useRoute();
  // Get Case ID
  const id = route.params.id;
  if (id !== 'new' && id) {
    getTestCase(id);
  }

  function createTestCaseHandler() {
    createTestCase();
  }

  function updateTestCaseHandler() {
    updateTestCase(id);
  }

  function submitHandler() {
    id !== 'new' && id ? updateTestCaseHandler() : createTestCaseHandler();
  }
  function handleDelete(id, name) {
    dialog.error({
      title: 'Alert',
      content: `Do you want to delete ${name}`,
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        deleteTestCase(id);
      },
      onNegativeClick: () => {},
    });
  }
  // Get All Test Cases
  getTestCases();
</script>
