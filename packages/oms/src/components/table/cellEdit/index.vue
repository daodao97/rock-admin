<template>
  <component
    :is="getComponentName(item.type)"
    v-model="localValue"
    v-bind="getComponentProps(item)"
    @update:modelValue="onFiledChange"
  />
</template>
<script>
import { customFormComps, getComponentName, getComponentProps } from '../../form/util'

export default {
  name: 'CellEdit',
  components: customFormComps,
  provide() {
    return {
      formData: {}
    }
  },
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: undefined
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localValue: this.$props.modelValue
    }
  },
  methods: {
    onFiledChange(val) {
      this.$emit('update:modelValue', val)
    },
    getComponentName(name) {
      return getComponentName(name)
    },
    getComponentProps(item) {
      return getComponentProps(item)
    }
  }
}
</script>
