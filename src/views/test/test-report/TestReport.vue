<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Test Report" />
    </div>

    <!-- <div class="grid grid-cols-12 gap-6"> -->
    <div class="flex">
      <div class="flex-col w-56">
        <div class="grow flex flex-col justify-center">
          <div class="w-52">
            <Doughnut ref="chartRef" :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
      <div class="flex-col w-72">
        <div class="text-lg font-medium">completed</div>
        <p class="text-gray-400">
          <span>{{ testReport?.testsuites.testsuite['@tests'] }}</span> test cases done
        </p>
        <n-list>
          <n-list-item>
            <ul>
              <!-- <li>
                <button
                  type="button"
                  class="inline-block px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md"
                  >Success</button
                >
              </li> -->

              <li class="pb-4">
                <n-button
                  round
                  size="tiny"
                  class="w-14 text-white"
                  :class="testCaseResultTypes[0].bgColor"
                >
                  {{
                    Math.round(
                      (chartDatasetRef[0] / testReport?.testsuites.testsuite['@tests']) * 100
                    )
                  }}%
                </n-button>
                <n-icon class="mx-2" :size="18" :component="CheckOutlined" />
                <span>{{ chartDatasetRef[0] }}</span> {{ testCaseResultTypes[0].name }}
              </li>

              <li class="pb-4">
                <n-button
                  round
                  size="tiny"
                  class="w-14 text-white"
                  :class="testCaseResultTypes[1].bgColor"
                >
                  {{
                    Math.round(
                      (chartDatasetRef[1] / testReport?.testsuites.testsuite['@tests']) * 100
                    )
                  }}%
                </n-button>
                <n-icon class="mx-2" :size="18" :component="CloseOutlined" />
                <span>{{ chartDatasetRef[1] }}</span> {{ testCaseResultTypes[1].name }}
              </li>

              <li class="pb-4">
                <n-button
                  round
                  size="tiny"
                  class="w-14 text-white"
                  :class="testCaseResultTypes[2].bgColor"
                >
                  {{
                    Math.round(
                      (chartDatasetRef[2] / testReport?.testsuites.testsuite['@tests']) * 100
                    )
                  }}%
                </n-button>
                <n-icon class="mx-2" :size="18" :component="IssuesCloseOutlined" />
                <span>{{ chartDatasetRef[2] }}</span> {{ testCaseResultTypes[2].name }}
              </li>

              <li class="pb-4">
                <n-button
                  round
                  size="tiny"
                  class="w-14 text-white"
                  :class="testCaseResultTypes[3].bgColor"
                >
                  {{
                    Math.round(
                      (chartDatasetRef[3] / testReport?.testsuites.testsuite['@tests']) * 100
                    )
                  }}%
                </n-button>
                <n-icon class="mx-2" :size="18" :component="ExclamationOutlined" />
                <span>{{ chartDatasetRef[3] }}</span> {{ testCaseResultTypes[3].name }}
              </li>

              <li>
                <span class="inline-block w-14">&nbsp;</span>
                <n-icon class="mx-2" :size="18" />
                <span>{{ testReport?.testsuites.testsuite['@tests'] }}</span> Test Cases
              </li>
            </ul>
          </n-list-item>
        </n-list>
      </div>
      <div class="flex-col flex-1">
        <n-tabs type="line" size="small" :tabs-padding="20" pane-style="padding: 20px;">
          <n-tab-pane name="Fixures">
            <ul>
              <li class="pb-4">
                <span class="inline-block w-32 text-gray-400"> Page: </span>
                <span>{{ testConfig?.test_page }}</span>
              </li>
              <li class="pb-4">
                <span class="inline-block w-32 text-gray-400"> Type: </span>
                <span>{{ testConfig?.test_type }}</span>
              </li>
              <li class="pb-4">
                <span class="inline-block w-32 text-gray-400"> Create at: </span>
                <span>{{ testConfig?.created_at }}</span>
              </li>
              <li class="pb-4">
                <span class="inline-block w-32 text-gray-400"> Scheduled at: </span>
                <span>{{ testConfig?.scheduled_at }}</span>
              </li>
              <li class="pb-4">
                <span class="inline-block w-32 text-gray-400"> Finished at: </span>
                <span>{{ testConfig?.ended_at }}</span>
              </li>
            </ul>
          </n-tab-pane>
          <n-tab-pane name="Files"> Files </n-tab-pane>
        </n-tabs>
      </div>
    </div>

    <!-- <n-divider dashed /> -->

    <div class="border-y flex divide-x items-center">
      <div class="flex-col">
        <n-button size="small" class="w-18 mx-4 my-1" type="success"> PASSED </n-button>
      </div>
      <div class="flex-col flex-1 divide-y">
        <div> tbd </div>
        <div> tbd </div>
      </div>
    </div>

    <div>
      <n-tabs type="line" size="small" :tabs-padding="20">
        <n-tab-pane name="Test Cases">
          <TestCaseResultFilterForm
            v-model:modelValue="filterValue"
            @update:modelValue="onUpdateFilterValue"
          />

          <n-data-table
            ref="tableRef"
            :bordered="false"
            :columns="tableColumns"
            :data="tableData"
            :row-class-name="rowClassName"
          />
        </n-tab-pane>
        <n-tab-pane name="Test Configs">
          <pre>{{ testConfig }}</pre>
        </n-tab-pane>
        <n-tab-pane name="Screenshots"> screenshot </n-tab-pane>
        <n-tab-pane name="Ads"> ads </n-tab-pane>
        <n-tab-pane name="HAR Viewer"> HAR </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  // import type { Ref } from 'vue';
  import {
    useMessage,
    DataTableColumns,
    DataTableBaseColumn,
    DataTableFilterState,
  } from 'naive-ui';
  // import { useMessage } from 'naive-ui';
  import { storeToRefs } from 'pinia';
  // import { useRouter, useRoute, RouterLink } from 'vue-router';
  import { useTestReportStore } from '@/store/modules/test';
  // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { Chart as ChartJS, ChartData, ChartOptions, registerables } from 'chart.js';
  import { Doughnut } from 'vue-chartjs';
  import {
    CloseOutlined,
    CheckOutlined,
    ExclamationOutlined,
    IssuesCloseOutlined,
  } from '@vicons/antd';

  import {
    createColumns,
    rowClassName,
    testCaseResultTypes,
  } from '@/views/test/test-report/reportTableFunctions';

  import TestCaseResultFilterForm, {
    TTestResultFilterFormData,
  } from '@/views/test/test-report/components/TestCaseResultFilterForm.vue';

  // import { DataTableFilterState } from '/#/test';

  // ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(...registerables);

  const { testReport, testConfig, loading, error } = storeToRefs(useTestReportStore());
  const { getTestReport } = useTestReportStore();
  const message = useMessage();

  const chartRef = ref(null);
  const chartDatasetRef = ref([]);
  const tableRef = ref(null);

  // <TTestResultFilterFormData['filterValue']>

  const filterValue = ref<TTestResultFilterFormData>({
    keyword: '',
    type: 'all',
  });

  const chartData = computed<ChartData<'doughnut'>>(() => ({
    labels: testCaseResultTypes.map((t) => t.name),
    datasets: [
      {
        backgroundColor: testCaseResultTypes.map((t) => t.color),
        data: chartDatasetRef.value,
      },
    ],
  }));

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Test Result',
      },
    },
  };

  const tableData = computed(() => testReport.value?.testsuites.testsuite.testcase || []);
  const tableColumns = createColumns();

  const onUpdateFilterValue = function (value: TTestResultFilterFormData) {
    console.log(value);
    tableRef.value.filters({
      '@name': value.keyword,
      '@classname': value.type,
    });
  };

  // const handleUpdateFilter = function (
  //   filters: DataTableFilterState,
  //   sourceColumn: DataTableBaseColumn
  // ) {
  //   // addressColumn.filterOptionValue = filters[sourceColumn.key] as string;
  // };

  // const tableDataFilter = function (filters: DataTableFilterState | null) {
  //   console.log('filters', filters);
  //   return {
  //     '@name': 'error',
  //   };
  // };

  getTestReport({
    report_folder: 'tmp/report/2022-11-24/14-44-20/1',
  }).then(() => {
    let testsuite = testReport.value?.testsuites.testsuite;

    if (testsuite) {
      chartDatasetRef.value = [
        testsuite['@tests'] - testsuite['@errors'] - testsuite['@failures'] - testsuite['@skipped'],
        testsuite['@failures'],
        testsuite['@skipped'],
        testsuite['@errors'],
      ];
    }
  });
</script>

<style lang="less" scoped></style>
