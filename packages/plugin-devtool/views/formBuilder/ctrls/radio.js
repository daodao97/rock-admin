export default {
  type: 'radio',
  name: '单选框',
  default: {
    type: 'radio',
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
