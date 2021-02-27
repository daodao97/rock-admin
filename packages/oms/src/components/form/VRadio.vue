<template>
  <el-radio-group v-model="localValue" :disabled="disabled" @change="onchange">
    <el-radio
        v-for="(item, index) in options"
        :key="index + '-radio'"
        :label="item.value"
        :disabled="!!item.disabled"
    >{{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
export default {
  name: 'VRadio',
  props: {
    modelValue: {
      type: [Number, String, Boolean],
      required: true,
      default: 0
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localValue: this.$props.modelValue
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.localValue)
    }
  }
}
</script>
