<template>
  <el-cascader-panel
      v-model="localValue"
      :options="optionTree"
      :disabled="disabled"
      :clearable="clearable"
      :show-all-levels="showAllLevels"
      :collapse-tags="collapseTags"
      :filterable="filterable"
      :props="props"
      :size="size"
      @change="onchange"
  />
</template>
<script>
import {searchTreeValues} from '../../utils'
import {isNumber} from '../../utils/type'
import {cloneDeep} from 'lodash'

export default {
  name: 'VCascaderPanel',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: [Array, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: _ => {
      }
    },
    size: {
      type: String,
      default: ''
    },
    optionsApi: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    const local = cloneDeep(isNumber(this.$props.modelValue) ? [this.$props.modelValue] : this.$props.modelValue)
    return {
      localValue: local,
      optionTree: this.$props.options
    }
  },
  beforeCreate() {
    this.$props.optionsApi && this.$http.request({
      method: 'GET',
      url: this.$props.optionsApi
    }).then(({payload}) => {
      this.optionTree = payload || []
      if (isNumber(this.$props.modelValue)) {
        this.localValue = searchTreeValues(this.optionTree, this.$props.modelValue, 'value')
      }
    })
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', isNumber(this.$props.modelValue) ? this.localValue[this.localValue.length - 1] : this.localValue)
    }
  }
}
</script>
