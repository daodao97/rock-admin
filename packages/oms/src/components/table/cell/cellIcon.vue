<template>
  <v-icon :name="data" />
</template>
<script lang="ts">
export default {
  name: 'CellIcon',
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
