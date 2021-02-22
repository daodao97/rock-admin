export default {
  type: 'tpl',
  name: '模板',
  default: {
    type: 'tpl',
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
      type: 'input',
      field: 'tpl',
      label: '模板',
      info: '例如 <code>姓名: {name} 年龄:{age}</code>'
    }
  ]
}
