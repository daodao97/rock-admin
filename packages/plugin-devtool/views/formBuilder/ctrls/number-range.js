export default {
  type: 'number-range',
  name: '数字区间',
  default: {
    type: 'number-range',
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
            type: 'input',
            field: 'unit',
            label: '单位'
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
