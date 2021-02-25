<template>
  <el-tag :type="type">{{ getLabel }}</el-tag>
</template>
<script>
import {findIndex} from 'lodash'

export default {
  name: 'CellEnum',
  props: {
    data: {
      type: [String, Number],
      default: ''
    },
    column: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    type() {
      const {column, data} = this.$props
      if (column.state !== undefined) {
        return column.state[data] ?? ''
      }
      return ''
    },
    getLabel() {
      const {column, data} = this.$props
      const index = findIndex(column.options, {
        value: data
      })
      const obj = column.options[index]
      return obj ? obj.label : data
    }
  }
}
</script>
