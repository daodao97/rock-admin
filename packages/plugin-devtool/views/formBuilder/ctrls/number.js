export default {
  type: 'number',
  name: '数字',
  default: {
    type: 'number',
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
      label: '属性',
      props: {
        options: {
          labelPosition: 'top'
        },
        formItems: [
          {
            type: 'number',
            field: 'min',
            label: '最小值'
          },
          {
            type: 'number',
            field: 'man',
            label: '最大值'
          }
        ]
      }
    }
  ]
}
