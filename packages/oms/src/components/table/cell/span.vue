<template>
  <span>{{ data }}</span>
</template>
<script>
export default {
  name: 'CellSpan',
  props: {
    data: {
      type: [String, Number, Array, Object],
      default: ''
    },
    column: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>
