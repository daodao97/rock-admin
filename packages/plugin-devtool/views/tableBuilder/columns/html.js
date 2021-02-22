export default {
  type: 'html',
  name: 'HTML',
  default: {
    type: 'html',
    label: '表头',
    field: 'field_name'
  },
  builder: [
    {
      type: 'input',
      field: 'label',
      label: '字段名'
    },
    {
      type: 'input',
      field: 'field',
      label: '字段key'
    },
    {
      type: 'input',
      field: 'info',
      label: '提示'
    }
  ]
}
