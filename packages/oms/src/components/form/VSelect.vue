<template>
  <el-select
      v-model="localValue"
      :placeholder="placeholder"
      :loading="loading"
      :multiple="multiple"
      :filterable="localFilterable"
      :multiple-limit="multipleLimit"
      :allow-create="allowCreate"
      :remote="remote"
      :disabled="disabled"
      :remote-method="kw => _.debounce(search(kw), 20)"
      @change="onchange"
  >
    <el-option
        v-for="item in localOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<script>
import {isArray} from '../../utils/type'
import {strVarReplace} from '../../utils/string'

export default {
  name: 'VSelect',
  inject: ['formData'],
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: [Array, String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    selectApi: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      loading: false,
      localValue: this.$props.modelValue,
      localOptions: this.$props.options
    }
  },
  computed: {
    remote() {
      return !!this.$props.selectApi
    },
    localFilterable() {
      if (this.$props.selectApi) {
        return true
      }
      return this.$props.filterable
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.localValue)
    },
    search(kw) {
      if (!kw) {
        return
      }
      const url = strVarReplace(this.$props.selectApi, this.formData)
      this.loading = true
      this.$http.request({method: 'GET', url: url, params: {kw: 11}})
          .then(({payload}) => {
            this.loading = false
            if (isArray(payload)) {
              this.localOptions = payload
              if (payload.length > 200) {
                this.$message.warning('搜索结果的条目过多, 可能会造成页面卡顿, 请优化')
              }
            }
          })
    }
  }
}
</script>
