export default {
  type: 'input',
  name: '文本框',
  default: {
    type: 'input',
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
            field: 'maxlength',
            label: '最大字符数'
          },
          {
            type: 'switch',
            field: 'showWordLimit',
            label: '显示限制词数'
          },
          {
            type: 'input',
            field: 'mask',
            label: 'mask',
            info: '<a href="https://github.com/RobinHerbots/Inputmask" target="_blank" class="el-link el-link--primary">文档</a>'
          }
        ]
      }
    }
  ]
}
