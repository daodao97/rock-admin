export const baseSchema = {
  options: {
    labelPosition: 'top',
    submitButton: false,
    cancelButton: false
  },
  formItems: [
    {
      type: 'switch',
      field: 'showFilter',
      label: '搜索条件',
      value: true
    },
    {
      type: 'switch',
      field: 'showPagination',
      label: '页码',
      value: true
    },
    {
      type: 'switch',
      field: 'exportAble',
      label: '导出按钮'
    }
  ]
}
