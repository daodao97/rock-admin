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
      if (column.state !== undefined) {
        return column.state[data] ?? ''
      }
      return ''
    })
    const getLabel = computed(() => {
      const index = findIndex(column.options, {
        value: data
      })
      const obj = column.options[index]
      return obj ? obj.label : data
    })
    return { type, getLabel }
  }
}
</script>
