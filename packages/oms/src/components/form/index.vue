<template>
  <el-form
    v-if="formItems.length > 0"
    ref="formData"
    :key="key"
    v-loading="loading"
    class="v-form"
    :model="formData"
    :rules="formRules"
    :label-width="formOptions.labelWidth"
    :inline="formOptions.inline"
    :label-position="formOptions.labelPosition"
  >
    <el-row>
      <template v-for="(item, index) in formItemsSection" :key="'item-' + index">
        <!--   card     -->
        <component
          :is="formOptions.inline ? 'span' : ((index === 0 && formItemsSection.length === 1) ? 'span': 'el-card')"
          :class="formOptions.inline ? 'form-section-inline' : 'form-section'"
          shadow="never"
        >
          <template v-if="item.name" #header>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(section, num) in item.children" :key="'section-' + index + '-' + num">
            <!--    row     -->
            <component :is="formOptions.inline ? 'span' : (section.isRow ? 'el-row' : 'span')">
              <template v-for="(each, i) in section.items" :key="'each-' + i">
                <!--   col    -->
                <component
                  :is="formOptions.inline ? 'span' : 'el-col'"
                  :span="each.col.span"
                >
                  <form-item
                    v-if="canShow(each)"
                    :key="each.id"
                    :ref="each.field"
                    v-model="formData[each.field]"
                    v-right-click="dev ? {devId: `${prefixPath}${each.index}`} : undefined"
                    :form-options="formOptions"
                    :components="components"
                    :item="each"
                    @update:modelValue="(val) => onFiledChange(each.field, val)"
                  />
                </component>
              </template>
            </component>
          </template>
        </component>
      </template>
      <template v-if="formOptions.inline === true">
        <form-action
          :form-options="formOptions"
          @submit="submitForm('formData')"
          @cancel="resetForm('formData')"
        />
      </template>
      <template v-else>
        <el-col :span="24">
          <form-action
            :form-options="formOptions"
            @submit="submitForm('formData')"
            @cancel="resetForm('formData')"
          />
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { componentMap, makeFormOptions } from './util'
import {
  camelToSnake,
  isArray,
  isFunc,
  isString,
  parseBool,
  ruleCompute,
  showEleByClassName,
  type,
  uuidv4,
  getObjectNodeByKeyTree
} from '../../utils'
import FormAction from './FormAction.vue'
import FormItem from './FormItem.vue'
import transRule from './rule'
import _ from 'lodash'

export default {
  name: 'VForm',
  components: { FormAction, FormItem },
  provide() {
    return {
      formData: this.formData,
      dev: this.dev
    }
  },
  props: {
    prefixPath: {
      type: String,
      default: ''
    },
    isSub: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Object,
      default: _ => {
      }
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    infoApi: {
      type: String,
      default: ''
    },
    saveApi: {
      type: [String, Boolean],
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    afterSubmit: {
      type: [String, Function],
      default: ''
    },
    afterReset: {
      type: [String, Function],
      default: ''
    },
    components: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rootData: {
      type: Function,
      default: () => {
        return {}
      }
    },
    dev: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'reset', 'fieldchange', 'update:modelValue', 'mounted'],
  data() {
    return {
      key: 0,
      loading: false,
      props: _.cloneDeep(this.$props),
      formData: Object.assign({}, this.$props.modelValue), // 表单数据
      cacheFormData: Object.assign({}, this.$props.modelValue),
      formRules: [], // 验证规则
      fieldMap: {}, // field -> item map
      computeRules: [], // 动态计算规则
      formItemsSource: [], // 原始数据
      cacheItems: [],
      formOptions: {}
    }
  },
  computed: {
    formItemsSection() {
      const sectionIndex = []
      const source = this.formItemsSource.map(function(val, index) {
        if (val.index === undefined) {
          val.index = `[${index}]`
        }
        if (val.type === 'sub-form' && val.props && val.props['form-items']) {
          val.props['form-items'] = val.props['form-items'].map((item, i) => {
            if (item.index === undefined) {
              item.index = `[${index}].props.form-items[${i}]`
            }
            return item
          })
        }
        return val
      })
      source.forEach((item, index) => {
        if (index === 0 || item.section !== undefined) {
          sectionIndex.push(index)
        }
      })
      const sections = []
      for (let i = 0, j = 1; sectionIndex[i] !== undefined; i++, j++) {
        sections.push(source.slice(sectionIndex[i], sectionIndex[j] || source.length))
      }
      return sections.map(each => {
        const children = this.layoutItem(each)
        return {
          name: children[0].items[0].section,
          children
        }
      })
    }
  },
  watch: {
    props: {
      handler() {
        const { formItems, options } = this.props
        const initData = this.init(_.cloneDeep(formItems || []))
        Object.keys(initData).forEach((key) => {
          if (key === 'formData') {
            this[key] = _.merge(this.formData, initData[key])
          } else {
            this[key] = initData[key]
          }
        })
        this.formOptions = makeFormOptions(options || this.$props.options)
        setTimeout(this.computedInit, 50) // fixme 是否有更好的方式?
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$props.infoApi) {
      this.loading = true
      this.$http.request({ method: 'GET', url: this.$props.infoApi }).then(({ payload }) => {
        if (this.$props.infoApi !== '') {
          delete payload['infoApi']
        }
        if (this.$props.saveApi !== '') {
          delete payload['saveApi']
        }
        this.props = _.merge({}, this.$props, payload)
        this.loading = false
        this.$emit('mounted', this.$refs.formData)
      })
    } else {
      this.$emit('mounted', this.$refs.formData)
    }
  },
  methods: {
    layoutItem(section) {
      const items = []
      const cell = {
        isCard: false,
        isRow: true,
        items: []
      }
      section.forEach((item, index) => {
        item.col = item.col || { span: 24 }
        if (item.col.span === 24) {
          items.push(Object.assign({}, cell, { items: [item] }))
        } else {
          if (items.length > 0) {
            const sum = _.sum(items[items.length - 1].items.map(each => each.col.span))
            if (sum < 24 && sum + item.col.span <= 24) {
              items[items.length - 1].items.push(item)
            } else {
              items.push(Object.assign({}, cell, { items: [item] }))
            }
          } else {
            items.push(Object.assign({}, cell, { items: [item] }))
          }
        }
      })
      return items
    },
    init(formItems) {
      const formData = {}
      const formRules = {}
      const fieldMap = {}
      const computeRules = {}
      const query = this.$route ? this.$route.query : {}
      formItems.forEach((item) => {
        if (query[item.field] !== undefined) {
          item.value = this.parseType(item, query[item.field])
        }
        if (item.value !== undefined) {
          formData[item.field] = item.value
        }
        if (item.rules !== undefined) {
          formRules[item.field] = transRule(item.rules, this.formData, () => this.$refs['formData'])
        }
        fieldMap[item.field] = item
        if (item.computed !== undefined) {
          computeRules[item.field] = item.computed
        }
        item.props = this.getComponentProps(item)
        if (this.formOptions.column !== undefined) {
          item.col = { span: 24 / this.formOptions.column }
        }
      })
      return {
        formData: formData,
        formRules,
        fieldMap,
        computeRules,
        formItemsSource: formItems,
        cacheItems: _.cloneDeep(formItems)
      }
    },
    parseType(item, value) {
      let reference = item.value
      let refType = type(reference)
      if (refType === 'object') {
        return reference
      }
      if (item.options) {
        reference = item.options[item.options.length - 1].value
        refType = type(reference)
      }
      if (refType === 'string' && refType !== 'object') {
        return value + ''
      }
      if (refType === 'number') {
        if (type(value) === 'array') {
          return value.map(each => {
            if ((each + '').indexOf('.') > -1) {
              return parseFloat(each)
            }
            return parseInt(each)
          })
        }
        if ((value + '').indexOf('.') > -1) {
          return parseFloat(value)
        }
        return parseInt(value)
      }
      if (refType === 'boolean' || item.type === 'switch') {
        return parseBool(value)
      }
      return value
    },
    validate() {
      return this.$refs.formData.validate
    },
    submitForm(formName) {
      let flag = true
      this.$refs[formName].validate((valid) => {
        if (flag === false) {
          return
        }
        if (valid) {
          this.formItemsSource.forEach(item => {
            if (flag === false) {
              return
            }
            if (item.type === 'sub-form') {
              const subValid = this.$refs[item.field].$refs.ctrl.validate()
              if (subValid === false) {
                flag = false
              }
            }
          })
        } else {
          flag = false
        }
      })
      if (flag) {
        this.$props.saveApi &&
        this.$http
          .request({ method: 'POST', url: this.$props.saveApi, data: this.formData })
          .then(({ payload, message }) => {
            this.$message({ type: 'success', message: message || '保存成功' })
            setTimeout(_ => this.execAfter('afterSubmit'), 1000)
          })
        this.$emit('submit', this.formData)
      } else {
        showEleByClassName('is-error')
        return false
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
      setTimeout(_ => this.execAfter('afterReset'), 1000)
    },
    getComponentName(name) {
      return componentMap[name] || name
    },
    getComponentProps(item) {
      const props = item.props || {}
      if (item.options) {
        props.options = item.options
      }
      Object.keys(props).forEach((item) => {
        const tmp = props[item]
        delete props[item]
        props[camelToSnake(item, '-')] = tmp
      })
      return props
    },
    // TODO
    // c -> b -> a
    // 串联依赖时的显示问题
    canShow(item) {
      if (item.depend) {
        let data = this.formData
        if (item.depend.field.indexOf('.') !== -1) {
          data = this.rootData()
        }
        let check = (dependVale, nowValue) => dependVale === nowValue
        if (isArray(item.depend.value)) {
          check = (dependVale, nowValue) => dependVale.indexOf(nowValue) > -1
        }
        const key = item.depend.field.replace(/^\.+/, '')
        const nowValue = getObjectNodeByKeyTree(key, data)
        return check(item.depend.value, nowValue)
      }
      if (item.hide) {
        // todo
      }
      return true
    },
    onFiledChange(field, value) {
      this.formData[field] = value
      var iTime
      clearTimeout(iTime)
      iTime = setTimeout(() => {
        this.computedWhen(field, value)
      }, 300)
      this.$emit('fieldchange', { field, value })
      this.$emit('update:modelValue', this.formData)
    },
    computedInit() {
      Object.keys(this.formData).forEach(field => {
        this.computedWhen(field, this.formData[field])
      })
    },
    execComputeRule(field, value, when, set, m = false) {
      if (!isArray(when)) {
        when = [field, '=', when]
      } else if (when.length === 2) {
        when.unshift(field)
      }
      const obj = {}
      obj[field] = value
      Object.keys(set || []).forEach((field) => {
        const index = _.findIndex(this.formItemsSource, { field: field })
        if (ruleCompute(obj, when)) {
          this.formItemsSource[index] = _.merge(
            this.formItemsSource[index],
            set[field],
            { id: uuidv4() }
          )
          if (set[field].value !== undefined) {
            this.formData[field] = set[field].value
            this.key++
          }
        } else if (m === false) {
          const cacheIndex = _.findIndex(this.cacheItems, { field: field })
          this.formItemsSource[index] = _.cloneDeep(
            this.cacheItems[cacheIndex],
            { id: (this.formItemsSource[index] || 0) + 1 }
          )
          const resetVal = this.cacheFormData[field] || this.cacheItems[cacheIndex].value
          if (set[field].value !== undefined && resetVal) {
            this.formData[field] = resetVal
            this.key++
            // }
          }
        }
      })
    },
    computedWhen(field, value) {
      const rule = this.computeRules[field]
      if (rule === undefined) {
        return
      }
      if (isArray(rule)) {
        rule.forEach(item => {
          this.execComputeRule(field, value, item.when, item.set || [], true)
        })
        return
      }
      this.execComputeRule(field, value, rule.when, rule.set || [])
    },
    execAfter(type) {
      const action = this.props[type]
      if (action === undefined) {
        return
      }
      if (isString(action)) {
        switch (this.props[type]) {
          case 'goback':
            this.$router && this.$router.back(-1)
            break
          case 'reload':
            location.reload()
            break
        }
      }
      if (isFunc(action)) {
        action()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-section {
  margin-bottom: 15px;
  width: 100%;
}

.form-section-inline {
  margin-bottom: 0;
}
</style>
