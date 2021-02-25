<template>
  <el-input
      v-model="inputValue"
      v-mask="mask"
      :show-word-limit="showWordLimit"
      :rows="rows"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :show-password="showPassword"
      v-bind="$attrs"
      :autosize="autosize"
      @change="change"
      @focus="focus"
      @clear="clear"
      @blur="blur"
      @input="input"
      @update:modelValue="updateModel"
  >
    <template v-if="showCopy" #append>
      <el-button v-if="showCopy" icon="el-icon-copy-document" @click="copy"/>
    </template>
  </el-input>
</template>

<script>
import Inputmask from './inputmask'
import {copyToClipboard} from '../../utils'

export default {
  directives: {
    mask: Inputmask
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    showWordLimit: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 6
    },
    showCopy: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    mask: {
      type: [String, Object],
      default: ''
    }
  },
  emits: ['change', 'blur', 'clear', 'input', 'inputNative', 'copy', 'focus', 'update:modelValue'],
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    modelValue: {
      handler: function (val) {
        this.inputValue = val || ''
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    updateModel(val) {
      this.$emit('update:modelValue', val)
    },
    change(val) {
      this.$emit('change', val)
    },
    blur(e) {
      this.$emit('blur', e)
    },
    focus(e) {
      this.$emit('focus', e)
    },
    clear() {
      this.$emit('clear')
    },
    input() {
      this.$emit('input', this.inputValue)
    },
    copy(e) {
      copyToClipboard(this.inputValue)
      this.$emit('copy')
    }
  }
}
</script>
<style scoped lang="scss">
// 解决line-height继承问题
/*.el-textarea/deep/ .el-input__count{*/
/*  line-height: 14px;*/
/*}*/
</style>
