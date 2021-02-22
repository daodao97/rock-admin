<template>
  <span v-html="show" />
</template>
<script>
import { strVarReplace } from '../../../utils'

export default {
  name: 'CellTpl',
  props: {
    data: {
      type: [String, Number, Array, Object],
      default: ''
    },
    column: {
      type: Object,
      default: () => {}
    },
    row: {
      type: Object,
      default: () => {}
    },
    tpl: {
      type: String,
      default: ''
    }
  },
  computed: {
    show() {
      return strVarReplace(this.tpl, this.row)
    }
  }
}
</script>
