export default {
  type: 'enum',
  name: '标签',
  default: {
    type: 'enum',
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
    },
    {
      type: 'sub-form',
      field: 'options',
      label: '映射',
      props: {
        options: {
          labelPosition: 'top'
        },
        formItems: [
          {
            type: 'input',
            field: 'value',
            label: 'value'
          },
          {
            type: 'input',
            field: 'label',
            label: 'label'
          }
        ]
      },
      value: []
    }
  ],
  trans(val) {
    val.options = val.options || []
    if (!val.label) {
      val.label = '表头'
    }
    return val
  }
}
