export default {
  type: 'switch',
  name: '开关',
  default: {
    type: 'switch',
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
            field: 'activeText',
            label: '打开时的文字描述'
          },
          {
            type: 'input',
            field: 'inactiveText',
            label: '关闭时的文字描述'
          },
          {
            type: 'color',
            field: 'activeColor',
            label: '打开时的背景色'
          },
          {
            type: 'color',
            field: 'inactiveColor',
            label: '关闭时的背景色'
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
