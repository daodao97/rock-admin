export default {
  type: 'icon-select',
  name: '图标选择器',
  default: {
    type: 'icon-select',
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
