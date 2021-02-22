export default {
  type: 'form',
  name: '弹框表单',
  default: {
    type: 'form',
    target: '',
    text: '弹框表单'
  },
  builder: [
    {
      type: 'input',
      field: 'text',
      label: '文案'
    },
    {
      type: 'radio',
      field: 'container',
      label: '模式',
      options: [
        { value: 'dialog', label: '模态框' },
        { value: 'drawer', label: '抽屉' }
      ],
      value: 'dialog'
    },
    {
      type: 'radio',
      field: 'schema_type',
      label: '表单类型',
      options: [
        { value: 0, label: '本地' },
        { value: 1, label: '远程' }
      ],
      value: 1
    },
    {
      type: 'input',
      field: 'infoApi',
      label: 'formSchema接口',
      depend: {
        field: 'schema_type',
        value: 1
      }
    },
    {
      type: 'json',
      field: 'form-items',
      label: '表单控件'
    },
    {
      type: 'input',
      field: 'saveApi',
      label: '保存接口'
    }
  ]
}
