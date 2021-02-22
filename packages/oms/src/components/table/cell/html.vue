<template>
  <span v-html="data" />
</template>
<script>
export default {
  name: 'CellSpan',
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
