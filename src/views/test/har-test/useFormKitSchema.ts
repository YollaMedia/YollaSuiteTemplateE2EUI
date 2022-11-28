export default function () {
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
  return { schemas };
}
