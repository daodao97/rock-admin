<template>
  <v-loading>
    <router-view :key="key" />
  </v-loading>
</template>
<script>
import VLoading from '../components/VLoading.vue'

export default {
  components: {
    VLoading
  },
  data() {
    return {
      key: 1
    }
  },
  watch: {
    '$route': function() {
      this.key++
    }
  }
}
</script>
