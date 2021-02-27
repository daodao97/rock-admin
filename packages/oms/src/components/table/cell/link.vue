<template>
  <el-link v-bind="linkProps">{{ column.label }}</el-link>
</template>
<script lang="ts">
import _ from 'lodash'

export default {
  name: 'CellLink',
  props: {
    data: {
      type: String,
      default: ''
    },
    column: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    linkProps() {
      return _.merge(
          {
            type: 'primary',
            href: this.$props.data,
            target: '_blank'
          },
          this.$props.column.props || {}
      )
    }
  }
}
</script>
