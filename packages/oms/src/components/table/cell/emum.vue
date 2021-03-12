<template>
  <el-tag :type="type">{{ getLabel }}</el-tag>
</template>
<script lang="ts">
import { findIndex } from 'lodash'
import { computed, toRefs } from 'vue'
interface Props {
  data: string | number,
  column: Record<string, any>
}
export default {
  name: 'CellEnum',
  props: {
    data: {
      type: [String, Number],
      default: ''
    },
    column: {
      type: Object,
      default: () => {}
    }
  },
  setup(props: Props) {
    const { column, data } = toRefs(props)
    const type = computed(() => {
      if (column.value.state !== undefined) {
        return column.value.state[data.value] ?? ''
      }
      return ''
    })
    const getLabel = computed(() => {
      const index = findIndex(column.value.options, {
        value: data.value
      })
      const obj = column.value.options ? column.value.options[index] : false
      return obj ? obj.label : data.value
    })
    return { type, getLabel }
  }
}
</script>
