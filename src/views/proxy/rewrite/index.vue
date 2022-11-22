<template>
  <div>
    {{ match }}
    <p></p>
    <div>
      {{ dynamicForm }}
    </div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Proxy Rewrite Rule List" />
    </div>
    <n-card :bordered="false" class="proCard">
      <n-grid :cols="5" :x-gap="40">
        <!-- List item -->
        <n-gi span="1">
          <n-input v-model:value="filter" type="text" placeholder="Search" />
          <n-list bordered>
            <!-- rewrite list -->
            <n-list-item class="list-item" v-for="i in 1" :key="i">
              <n-space align="center" justify="space-between">
                <router-link :to="{ path: `/proxy/rewrite/${i}` }">
                  <n-space align="center">
                    <n-avatar round style="display: flex; align-items: center">
                      {{ i }}
                    </n-avatar>
                    <n-space vertical style="gap: 0">
                      <n-text type="dark" class="mb-0" style="font-size: 12px"> Name</n-text>
                      <n-text type="tertiary" style="font-size: 12px"> Time</n-text>
                    </n-space>
                  </n-space>
                </router-link>
                <!-- remove button and switch -->
                <n-space align="center">
                  <n-switch size="small" />
                  <n-button
                    type="primary"
                    circle
                    size="tiny"
                    class="text-primary"
                    @click.prevent="clickHandler(i)"
                  >
                    <CloseOutlined style="width: 14px" />
                  </n-button>
                </n-space>
              </n-space>
            </n-list-item>
          </n-list>
          <n-button type="primary" class="text-primary" style="width: 100%">
            + New Rewrite Rule
          </n-button>
        </n-gi>
        <n-gi span="2" class="mb-6">
          <n-h1 type="dark" class="mb-0" style="margin-bottom: -10px"> Rewrite Rule</n-h1>
          <n-p depth="3" class="mt-0 mb-4"> ID: ###, Created: ####-##-##, Updated: ####-##-##</n-p>
          <n-form>
            <n-form-item
              label="Name"
              :rule="{
                required: true,
                message: 'Please enter name',
                trigger: ['blur'],
              }"
            >
              <n-input v-model:value="name" clearable placeholder="Please enter name" />
            </n-form-item>
            <n-form-item
              label="Match MITM Filter"
              :rule="{
                required: true,
              }"
            >
              <Codemirror
                :style="{ height: '200px', width: '100%', outline: 'none !important' }"
                v-model="match"
              />
            </n-form-item>
          </n-form>
          <n-form label-placement="left">
            <n-space v-for="(item, index) in dynamicForm.rewriteSetting" :key="index" vertical>
              <n-space justify="space-between">
                <n-p class="mt-0 mb-4" style="font-weight: bold"> Rule #{{ index + 1 }} </n-p>
                <n-button
                  type="primary"
                  class="text-primary"
                  circle
                  size="tiny"
                  @click="removeItem(index)"
                >
                  <CloseOutlined style="width: 14px" />
                </n-button>
              </n-space>

              <n-form-item
                class="ml-6"
                label="Type"
                :rule="{
                  required: true,
                  message: 'Please enter name',
                  trigger: ['input', 'blur'],
                }"
              >
                <n-select
                  v-model:value="item.type"
                  placeholder="Select a type"
                  :options="matchType"
                />
              </n-form-item>
              <n-form-item
                class="ml-6"
                label="Where"
                :rule="{
                  required: false,
                }"
              >
                <n-checkbox-group v-model:value="item.where">
                  <n-space>
                    <n-checkbox value="Request"> Request </n-checkbox>
                    <n-checkbox value="Response"> Response </n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-p depth="3" class="mt-0 mb-4" style="font-weight: bold"> Match </n-p>
              <n-form-item
                class="ml-6"
                label="Name"
                :rule="{
                  required: false,
                }"
              >
                <n-input v-model:value="item.matchName.value" style="width: 50%" placeholder="" />
                <n-checkbox-group v-model:value="item.matchName.regx" class="ml-3">
                  <n-space>
                    <n-checkbox :value="true"> Regex </n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-form-item
                class="ml-6"
                label="Value"
                :rule="{
                  required: false,
                }"
              >
                <n-input v-model:value="item.matchVaule.value" style="width: 50%" placeholder="" />
                <n-checkbox-group v-model:value="item.matchVaule.regx" class="ml-3">
                  <n-space>
                    <n-checkbox :value="true"> Regex </n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-p depth="3" class="mt-0 mb-4" style="font-weight: bold"> Replace </n-p>
              <n-form-item
                class="ml-6"
                label="Name"
                :rule="{
                  required: false,
                }"
              >
                <n-input v-model:value="item.replaceName.value" style="width: 50%" placeholder="" />
                <n-checkbox-group v-model:value="item.replaceName.regx" class="ml-3">
                  <n-space>
                    <n-checkbox :value="true"> Regex </n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-form-item
                class="ml-6"
                label="Value"
                :rule="{
                  required: false,
                }"
              >
                <n-input
                  v-model:value="item.replaceVaule.value"
                  style="width: 50%"
                  placeholder=""
                />
                <n-checkbox-group v-model:value="item.replaceVaule.regx" class="ml-3">
                  <n-space>
                    <n-checkbox :value="true"> Regex </n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-hr style="border-color: gray" />
            </n-space>
          </n-form>
          <n-space justify="end">
            <n-button
              strong
              class="text-primary"
              type="primary"
              style="margin-left: auto"
              @click="addItem"
            >
              Insert a new rule
            </n-button>
          </n-space>
        </n-gi>
        <n-gi span="4">
          <n-space justify="end">
            <n-button
              class="text-primary"
              type="primary"
              style="margin-left: 12px"
              @click="handleSubmit"
            >
              Save
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import {
    RewriteTypes,
    IMatchTypeInterface,
    IRewriteSetting,
  } from '../../../../types/rewriteConfig';
  import { defaultRewriteSetting, copyRewriteSetting } from './default';
  import { rewriteTypes } from './helper';
  import { ref, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Codemirror } from 'vue-codemirror';
  import { CloseOutlined } from '@vicons/antd';
  import { useMessage } from 'naive-ui';
  // Route
  let route = useRoute();
  //Remove map remote handler
  function clickHandler(id) {
    console.log(id);
  }
  // Used for filter list.
  let filter = ref('');
  // v-model namd and match
  let name = ref('');
  let match = ref('');
  let matchType: IMatchTypeInterface = rewriteTypes.map((v) => ({
    label: v,
    value: v,
  }));

  const dynamicForm = reactive({
    rewriteSetting: [copyRewriteSetting()],
  });
  // Navie UI useMessage hook
  const message = useMessage();

  function handleSubmit(values: Recordable) {
    console.log(name.value, match.value, dynamicForm.rewriteSetting);
    // message.success(JSON.stringify(values));
  }
  function addItem() {
    dynamicForm.rewriteSetting.push(copyRewriteSetting());
  }
  function removeItem(index: number) {
    if (dynamicForm.rewriteSetting.length > 1) {
      dynamicForm.rewriteSetting.splice(index, 1);
    }
    dynamicForm.rewriteSetting = [];
    dynamicForm.rewriteSetting.push(copyRewriteSetting());
  }

  // function handleReset(values: Recordable) {
  //   console.log(name.value, match.value);
  // }
</script>

<style scoped>
  .list-item {
    display: flex;
    align-items: center;
  }
</style>
