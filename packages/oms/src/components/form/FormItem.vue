<template>
  <el-form-item :label="item.label" :prop="item.field">
    <template #label>
      {{ item.label || item.field }}
      <el-tooltip v-if="item.info && formOptions.inline" placement="top">
        <template #content>
          <span v-html="item.info"/>
        </template>
        <i class="el-icon-warning-outline"/>
      </el-tooltip>
    </template>
    <component
        :is="getComponentName(item.type)"
        :key="item.id || ''"
        ref="ctrl"
        v-model="localValue"
        v-bind="getComponentProps(item)"
        @update:modelValue="onFiledChange"
    />
    <div v-if="item.info && !formOptions.inline" class="form-item-info">
      <i class="el-icon-warning-outline"/> <span v-html="item.info"/>
    </div>
  </el-form-item>
</template>
<script lang="ts">
import {getComponentName, getComponentProps, customFormComps} from './util'
import _ from 'lodash'

export default {
  name: 'FormItem',
  components: {...customFormComps},
  props: {
    formOptions: {
      type: Object,
      default: () => {
      }
    },
    item: {
      type: Object,
      default: () => {
      }
    },
    modelValue: {
      type: [String, Number, Object, Array, Boolean],
      default: undefined
    },
    components: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    this.$options.components = Object.assign(this.$options.components, this.$props.components)
    const item = this.$props.item
    if (item.type === 'template') {
      item.type = 'v-tpl' + item.field
      const methods = {}
      Object.keys(item.comp.methods || []).forEach(name => {
        methods[name] = Function(`return ${item.comp.methods[name]}`)()
      })
      this.$options.components['VTpl' + item.field] = _.merge({}, item.comp, {
        data() {
          return {
            ...item.comp.data
          }
        },
        methods
      })
    }
    return {
      localValue: this.$props.modelValue
    }
  },
  methods: {
    getComponentName(name) {
      return getComponentName(name)
    },
    getComponentProps(item) {
      return getComponentProps(item)
    },
    onFiledChange(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item-info {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;

  ::v-deep(*) {
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
