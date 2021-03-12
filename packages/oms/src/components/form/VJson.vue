<template>
  <code-mirror v-model="localValue" :options="{mode: 'application/json', readOnly: disabled}" @update:modelValue="onchange"/>
</template>
<script lang="ts">
import CodeMirror from '../codemirror/index.vue'
import {isString} from '../../utils/type'

export default {
  name: 'VJson',
  components: {CodeMirror},
  props: {
    modelValue: {
      type: [String, Object, Array],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      valueType: isString(this.$props.modelValue) ? 'string' : 'object',
      localValue: isString(this.$props.modelValue) ? this.$props.modelValue : JSON.stringify(this.$props.modelValue, null, 2)
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.valueType === 'string' ? this.localValue : JSON.parse(this.localValue))
    }
  }
}
</script>
