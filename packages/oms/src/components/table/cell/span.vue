<template>
  <span>{{ data }}</span>
</template>
<script lang="ts">
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
