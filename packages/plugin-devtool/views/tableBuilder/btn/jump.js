export default {
  type: 'jump',
  name: '跳转',
  default: {
    type: 'jump',
    target: '',
    text: '按钮'
  },
  builder: [
    {
      type: 'input',
      field: 'target',
      label: '跳转地址',
      info: '可以是本地路由, 也可以是url'
    },
    {
      type: 'input',
      field: 'text',
      label: '文案'
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
            type: 'icon-select',
            field: 'icon',
            label: '图标'
          },
          {
            type: 'select',
            field: 'type',
            label: '类型',
            options: [
              { value: 'primary', label: 'primary' },
              { value: 'info', label: 'info' }
            ]
          }
        ]
      }
    }
  ]
}
