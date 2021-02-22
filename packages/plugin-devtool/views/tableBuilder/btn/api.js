export default {
  type: 'api',
  name: '接口请求',
  default: {
    type: 'api',
    target: '',
    text: '请求'
  },
  builder: [
    {
      type: 'input',
      field: 'target',
      label: 'API地址',
      info: '此处填写接口path即可'
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
            type: 'input',
            field: 'text',
            label: '文案'
          },
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
          },
          {
            type: 'input',
            field: 'api',
            label: 'API地址',
            info: '此处填写接口path即可'
          },
          {
            type: 'select',
            field: 'method',
            label: '请求类型',
            options: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'DELETE', label: 'DELETE' },
              { value: 'PUT', label: 'PUT' }
            ]
          }
        ]
      }
    }
  ]
}
