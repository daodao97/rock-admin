import { cloneDeep } from 'lodash'

export default {
  type: 'select',
  name: '下拉框',
  default: {
    type: 'select',
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
      type: 'radio',
      field: 'optionType',
      label: '备选项类型',
      value: 0,
      options: [
        { value: 0, label: 'local' },
        { value: 1, label: 'remote' }
      ]
    },
    {
      type: 'sub-form',
      field: 'options',
      label: '备选项',
      props: {
        repeat: true,
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
      depend: {
        field: 'optionType',
        value: 0
      }
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
            field: 'selectApi',
            label: '备选项接口',
            depend: {
              field: '.optionType',
              value: 1
            }
          },
          {
            type: 'switch',
            field: 'multiple',
            label: '多选'
          },
          {
            type: 'number',
            field: 'multipleLimit',
            label: '最大选中数',
            depend: {
              field: 'multiple',
              value: true
            }
          },
          {
            type: 'switch',
            field: 'filterable',
            label: '允许过滤'
          }
        ]
      }
    }
  ],
  trans(item) {
    const tmp = cloneDeep(item)
    if (item.optionType === 0) {
      if (tmp.props && tmp.props.selectApi !== undefined) {
        delete tmp.props.selectApi
      }
    } else if (item.optionType === 1) {
      if (tmp.options) {
        delete tmp.options
      }
    }
    delete tmp.optionType
    return tmp
  }
}
