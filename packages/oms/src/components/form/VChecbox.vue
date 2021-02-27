<template>
  <el-checkbox-group v-model="localValue" :max="max" :min="min" @change="onchange">
    <el-checkbox
        v-for="(item, index) in options"
        :key="index + '-checkbox'"
        :label="item.value"
    >{{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script lang="ts">

export default {
  name: 'VCheckbox',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: Array,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
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
