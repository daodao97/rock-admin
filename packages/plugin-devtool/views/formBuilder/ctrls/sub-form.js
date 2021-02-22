export default {
  type: 'sub-form',
  name: '子表单',
  default: {
    type: 'sub-form',
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
            type: 'switch',
            field: 'repeat',
            label: '可重复'
          },
          {
            type: 'sub-form',
            field: 'form-items',
            label: '子表单控件',
            props: {
              options: {
                labelPosition: 'top'
              },
              repeat: true,
              formItems: [
                {
                  type: 'input',
                  field: 'label',
                  label: 'label'
                },
                {
                  type: 'select',
                  field: 'type',
                  label: '类型',
                  options: [
                    { value: 'input', label: '文本框' }
                  ]
                }
              ]
            }
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
