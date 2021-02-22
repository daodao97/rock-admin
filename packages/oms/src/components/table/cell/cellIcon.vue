<template>
  <v-icon :name="data" />
</template>
<script>
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
