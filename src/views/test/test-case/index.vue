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
                    class="text-primary"
                    @click="handleDelete(i.id, i.case_name)"
                  >
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </n-space>
            </n-list-item>
          </n-list>
          <router-link :to="{ name: 'Test_test_case_new' }">
            <n-button type="primary" class="text-primary" style="width: 100%">
              + New Rewrite Rule
            </n-button>
          </router-link>
        </n-gi>
        <n-gi span="4" class="mb-6">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Create/Edit Test Case </n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>
          <FormKit type="form" submit-label="Save" @submit="submitHandler" v-model="caseValue">
            <FormKitSchema :schema="schemas" />
          </FormKit>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script setup>
  // import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { CloseOutlined } from '@vicons/antd';
  import useFormKitSchema from './testTestCaseFormKitSchema';
  import { useTestTestCaseStore } from '@/store/modules/testTestCase';
  import { useDialog } from 'naive-ui';
  // Search input
  // const search = ref('');
  // get test cases store data
  let { list, caseValue, search, searchFiltered } = storeToRefs(useTestTestCaseStore());
  const dialog = useDialog();
  // Form Kit Schema
  const { schemas } = useFormKitSchema();
  const { getTestCases, createTestCase, getTestCase, deleteTestCase, updateTestCase } =
    useTestTestCaseStore();
  const route = useRoute();
  // Get Case ID
  const id = route.params.id;
  if (id !== 'new' && id) {
    getTestCase(id);
  }

  function createTestCaseHandler(values) {
    createTestCase(values);
  }

  function updateTestCaseHandler(values) {
    updateTestCase(id, values);
  }

  function submitHandler(values) {
    id !== 'new' && id ? updateTestCaseHandler(values) : createTestCaseHandler(values);
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
