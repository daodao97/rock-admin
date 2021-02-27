<template>
  <el-cascader
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
<script lang="ts">
import {searchTreeValues} from '../../utils'
import {isNumber} from '../../utils/type'
import _ from 'lodash'

export default {
  name: 'VCascader',
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
    },
    saveAs: {
      type: String,
      default: 'array'
    }
  },
  emits: ['update:modelValue'],
  data() {
    const local = _.cloneDeep(isNumber(this.$props.modelValue) ? [this.$props.modelValue] : this.$props.modelValue)
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
      let val = this.localValue
      if (isNumber(this.$props.modelValue)) {
        val = this.localValue[this.localValue.length - 1]
      }

      if (this.saveAs === 'array') {
        val = this.localValue
      } else if (this.saveAs === 'number') {
        val = this.localValue[this.localValue.length - 1]
      }

      this.$emit('update:modelValue', val)
    }
  }
}
</script>
