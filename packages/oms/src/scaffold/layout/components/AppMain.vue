<template>
  <section class="app-main">
    <v-loading>
      <router-view :key="key"/>
    </v-loading>
    <el-backtop :bottom="50"/>
  </section>
</template>

<script>
import VLoading from '../../../components/VLoading.vue'

export default {
  name: 'AppMain',
  components: {
    VLoading
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
