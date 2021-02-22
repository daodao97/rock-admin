export default {
  type: 'checkbox',
  name: '复选框',
  default: {
    type: 'checkbox',
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
    },
    {
      type: 'sub-form',
      field: 'props',
      props: {
        options: {
          labelPosition: 'top'
        },
        formItems: [
          {
            type: 'number',
            field: 'max',
            label: '最大选中数'
          },
          {
            type: 'number',
            field: 'min',
            label: '最小选中数'
          },
          {
            type: 'switch',
            field: 'disabled',
            label: '禁用'
          }
        ]
      }
    }
  ]
}
