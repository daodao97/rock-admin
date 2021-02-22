import _ from 'lodash'
import { isBool } from '../../utils'
import VSelect from './VSelect.vue'
import VRadio from './VRadio.vue'
import VCheckbox from './VChecbox.vue'
import VNumberRange from './VNumberRange.vue'
import VJson from './VJson.vue'
import VIconSelect from './VIconSelect.vue'
import VSubForm from './VSubForm.vue'
import VUpload from './VUpload.vue'
import VInput from './VInput.vue'
import VCascader from './VCascader.vue'
import VCascaderPanel from './VCascaderPanel.vue'
import { getToken } from '../../utils/auth'

export const componentMap = {
  input: 'v-input',
  number: 'el-input-number',
  radio: 'v-radio',
  checkbox: 'v-checkbox',
  'number-range': 'v-number-range',
  date: 'el-date-picker',
  time: 'el-time-picker',
  datetime: 'el-date-picker',
  slider: 'el-slider',
  image: 'v-upload',
  upload: 'v-upload',
  transfer: 'el-transfer',
  color: 'el-color-picker',
  rate: 'el-rate',
  select: 'v-select',
  switch: 'el-switch',
  json: 'v-json',
  'icon-select': 'v-icon-select',
  'sub-form': 'v-sub-form',
  cascader: 'v-cascader',
  'cascader-panel': 'v-cascader-panel'
}

export const formOptions = {
  inline: false,
  labelPosition: 'right',
  labelWidth: '100px',
  submitButton: {
    show: true,
    type: 'primary',
    text: '提交'
  },
  cancelButton: {
    show: true,
    type: 'info',
    text: '取消'
  }
}

export function makeFormOptions(options) {
  options = options || {}
  if (isBool(options.submitButton)) {
    options.submitButton = { show: options.submitButton }
  }

  if (isBool(options.cancelButton)) {
    options.cancelButton = { show: options.cancelButton }
  }

  return _.merge({}, formOptions, options)
}

export const customFormComps = { VSelect, VRadio, VCheckbox, VNumberRange, VJson, VIconSelect, VSubForm, VUpload, VInput, VCascader, VCascaderPanel }

export const getComponentName = (name) => {
  if (componentMap[name] !== undefined) {
    return componentMap[name]
  }
  if (componentMap['v-' + name] !== undefined) {
    return componentMap['v-' + name]
  }
  return name
}

export const getComponentProps = (item) => {
  const props = item.props || {}
  if (item.options) {
    props.options = item.options
  }
  if (['upload', 'image'].indexOf(item.type) > -1) {
    item.props.action = `/api/upload` // upload action
    item.props.headers = { Authorization: getToken() }
  }
  if (item.readonly !== undefined) {
    item.props.disabled = !!item.readonly
    delete item['readonly']
  }
  if (item.type !== 'color') {
    props.clearable = true
  }
  return props
}
