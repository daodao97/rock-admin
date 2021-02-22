import input from './ctrls/input'
import number from './ctrls/number'
import numberRange from './ctrls/number-range'
import select from './ctrls/select'
import radio from './ctrls/radio'
import xswitch from './ctrls/switch'
import code from './ctrls/code'
import json from './ctrls/json'
import upload from './ctrls/upload'
import template from './ctrls/template'
import iconSelect from './ctrls/icon-select'
import subForm from './ctrls/sub-form'
import checkbox from './ctrls/checkbox'

const ctrlMaps = {}

export function regCtrl(options) {
  ctrlMaps[options.type] = options
}

regCtrl(input)
regCtrl(select)
regCtrl(number)
regCtrl(numberRange)
regCtrl(xswitch)
regCtrl(subForm)
regCtrl(radio)
regCtrl(checkbox)
regCtrl(code)
regCtrl(json)
regCtrl(upload)
regCtrl(iconSelect)
regCtrl(template)

export const ctrls = ctrlMaps

export const baseSchema = {
  options: {
    labelPosition: 'top',
    submitButton: false,
    cancelButton: false
  },
  formItems: [
    {
      type: 'input',
      field: 'saveApi',
      label: '保存接口'
    },
    {
      type: 'switch',
      field: 'inline',
      label: '行布局'
    },
    {
      type: 'radio',
      field: 'labelPosition',
      label: 'label位置',
      options: [
        { value: 'right', label: '右' },
        { value: 'left', label: '左' },
        { value: 'top', label: '上' }
      ]
    },
    {
      type: 'input',
      field: 'labelWidth',
      label: 'label宽度',
      value: '100px'
    },
    {
      type: 'switch',
      field: 'showSubmitButton',
      label: '显示提交按钮',
      value: true
    },
    {
      type: 'sub-form',
      field: 'submitButton',
      label: '提交按钮',
      props: {
        options: {
          labelPosition: 'top'
        },
        formItems: [
          {
            type: 'input',
            field: 'text',
            label: '文案',
            value: '提交'
          },
          {
            type: 'select',
            field: 'type',
            label: '按钮类型',
            options: [
              { value: 'primary', label: 'primary' }
            ]
          }
        ]
      }
    },
    {
      type: 'switch',
      field: 'showCancelButton',
      label: '显示取消按钮',
      value: true
    },
    {
      type: 'sub-form',
      field: 'cancelButton',
      label: '取消按钮',
      props: {
        options: {
          labelPosition: 'top'
        },
        formItems: [
          {
            type: 'input',
            field: 'text',
            label: '文案',
            value: '取消'
          },
          {
            type: 'select',
            field: 'type',
            label: '按钮类型',
            options: [
              { value: 'primary', label: 'primary' }
            ]
          }
        ]
      }
    }
  ]
}

export const ctrlFormDefaultOptions = {
  labelPosition: 'top',
  submitButton: false,
  cancelButton: false
}
