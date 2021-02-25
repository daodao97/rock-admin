import { isArray, isObject, isString } from '../../utils/type'

const supportRules: Record<string, any> = {
  required: { required: true, message: '该项为必填项', trigger: 'blur' },
  string: { type: 'string', message: '该项类型必须是字符串', trigger: 'blur' },
  number: { type: 'number', message: '该项类型必须是数字', trigger: 'blur' },
  boolean: { type: 'boolean', message: '该项类型必须是布尔', trigger: 'blur' },
  integer: { type: 'integer', message: '该项类型必须是整数', trigger: 'blur' },
  float: { type: 'float', message: '该项类型必须是浮点数', trigger: 'blur' },
  array: { type: 'array', message: '该项类型必须是数组', trigger: 'blur' },
  enum: (enumData: string) => {
    return { type: 'enum', enum: enumData.split(','), message: '该项值必须在' + enumData + '中', trigger: 'change' }
  },
  url: { type: 'url', message: `请输入正确的url`, trigger: 'change' },
  email: { type: 'email', message: `请输入正确的邮箱`, trigger: 'change' },
  regex: (pattern: string) => {
    return { pattern: new RegExp(pattern), message: '该项格式必须符合' + pattern, trigger: 'blur' }
  },
  len: (length: string) => {
    return { len: parseInt(length), message: `该项长度必须为${length}位`, trigger: 'blur' }
  },
  min: (length: string) => {
    return { min: parseInt(length), message: `该项长度至少为${length}位`, trigger: 'blur' }
  },
  max: (length: string) => {
    return { max: parseInt(length), message: `该项长度最多为${length}位`, trigger: 'blur' }
  },
  required_if: (field: string, formData: Record<string, any>, ref: any) => {
    return {
      validator: function(rule: any, value: any, callback: (message?: string) => void) {
        if (formData[field] !== undefined && String(value).length === 0) {
          callback('该项为必填项')
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  }
}

type Rules = [] | object | string

export default function transRule(rules: Rules, formData: Record<string, any>, ref: any) {
  if (isArray(rules)) {
    return rules
  }
  if (isObject(rules)) {
    return [rules]
  }
  if (isString(rules)) {
    let parts: string[] = []
    if (typeof rules === 'string') {
      parts = rules.split('|')
    }
    const tmp: Record<string, any> = []
    parts.forEach((item: string) => {
      if (item.indexOf(':') > -1) {
        const tokens = item.split(':')
        const name = tokens[0]
        const args = tokens[1]
        if (supportRules[name] !== undefined) {
          tmp.push(supportRules[name](args, formData, ref))
        } else {
          console.warn('not support rule: ' + name)
        }
      } else {
        if (supportRules[item] !== undefined) {
          tmp.push(supportRules[item])
        } else {
          console.warn('not support rule: ' + item)
        }
      }
    })

    return tmp
  }
  return []
}
