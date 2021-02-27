<template>
  <span v-html="data"/>
</template>
<script lang="ts">
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
