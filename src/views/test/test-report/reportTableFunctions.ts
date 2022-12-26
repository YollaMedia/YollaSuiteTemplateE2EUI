import { h } from 'vue';
import { NTag, NButton, DataTableColumns } from 'naive-ui';
import { ITestCaseResult } from '/#/test';
import ReportTableColumnName from '@/views/test/test-report/components/ReportTableColumnName.vue';
import TestCaseResult from '@/views/test/test-report/components/TestCaseResult.vue';
import TestCaseStatusIcon from '@/views/test/test-report/components/TestCaseStatusIcon.vue';
// import TestCaseProperties from '@/views/test/test-report/components/TestCaseProperties.vue';

// {
//   sendMail,
// }: {
//   sendMail: (rowData: ITestCaseBase) => void;
// }

export const testCaseResultTypes = [
  {
    name: 'Passed',
    color: '#41B883',
    bgColor: 'bg-green-500',
    type: 'success',
  },
  {
    name: 'Failure',
    color: '#E46651',
    bgColor: 'bg-red-500',
    type: 'info',
  },
  {
    name: 'Skipped',
    color: '#00D8FF',
    bgColor: 'bg-blue-500',
    type: 'warning',
  },
  {
    name: 'Error',
    color: '#f0a020',
    bgColor: 'bg-yellow-500',
    type: 'error',
  },
];

export const createColumns = (): DataTableColumns<ITestCaseResult> => {
  return [
    // {
    //   type: 'selection',
    // },
    {
      title: '#',
      key: '_index',
      width: 40,
      render: (_, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: '',
      key: '@classname',
      width: 20,
      render(rowData) {
        return h(TestCaseStatusIcon, {
          testCaseResult: rowData,
        });
      },
      // filterOptionValue: 'failure',
      filter(value, row) {
        console.log('filter value', value);
        switch (value) {
          case 'error':
            return !!row.error;
          case 'success':
            return !row.error && !row.failure && !row.skipped;
          case 'failure':
            return !!row.failure;
          case 'skipped':
            return !!row.skipped;
          default:
            break;
        }

        return true;
      },
      // sortOrder: false,
      // sorter: 'default',
      // sorter (rowA, rowB) {
      //   return rowA.age - rowB.age
      // },
    },
    {
      title: 'Name',
      key: '@name',
      render(rowData) {
        let message = '';

        if (rowData.error) {
          message = rowData.error['@message'];
        } else if (rowData.failure) {
          message = rowData.failure['@message'];
        }

        return h(ReportTableColumnName, {
          title: rowData['@name'],
          subTitle: message,
        });
      },
      // filterOptionValue: null,
      filter(value, row) {
        return value ? !!~row['@name'].indexOf(value.toString()) : true;
      },
    },
    // {
    //   title: 'Properties',
    //   key: 'properties',
    //   // width: 20,
    //   render(rowData) {
    //     return h(TestCaseProperties, {
    //       testCaseResult: rowData,
    //     });
    //   },
    // },
    {
      type: 'expand',
      expandable: (rowData) => !!(rowData.failure || rowData.error || rowData.properties),
      renderExpand: (rowData) => {
        return h(TestCaseResult, {
          testCaseResult: rowData,
        });
      },
    },
    {
      title: 'Time',
      key: '@time',
      width: 60,
    },
    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         size: 'small',
    //         onClick: () => sendMail(row),
    //       },
    //       { default: () => 'Send Email' }
    //     );
    //   },
    // },
  ];
};

export const rowClassName = function (row: ITestCaseResult) {
  if (row.failure || row.error) {
    return 'bg-red-100';
  }

  return '';
};
