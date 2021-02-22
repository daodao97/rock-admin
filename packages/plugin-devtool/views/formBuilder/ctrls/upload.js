export default {
  type: 'upload',
  name: '上传',
  default: {
    type: 'upload',
    label: 'label',
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
    }
  ]
}
