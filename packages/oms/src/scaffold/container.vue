<template>
  <router-view :key="key" />
</template>
<script>
import { defineComponent, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  setup() {
    const key = ref(1)
    onBeforeRouteUpdate(() => {
      key.value++
    })
    return { key }
  }
})
</script>
