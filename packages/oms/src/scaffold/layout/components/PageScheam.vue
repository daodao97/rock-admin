<template>
  <v-icon name="ra-code" @click="show = !show"/>
  <el-drawer
      v-model="show"
      title="PageSchema"
      custom-class="my-drawer"
      :direction="direction"
      size="50%"
      destroy-on-close
      append-to-body
  >
    <json-view
        :key="key"
        :data="pageSchema"
        v-bind="{
        theme: '',
        fontSize: 14,
        lineHeight: 24,
        deep: 3,
        closed: false,
        iconStyle: 'circle',
        closed: false
      }"
    />
  </el-drawer>
</template>
<script>
import JsonView from '../../../components/JsonView/index.vue'

export default {
  name: 'PageScheme',
  components: {JsonView},
  data() {
    return {
      show: false,
      direction: 'rtl',
      pageSchema: this.$route.meta.pageSchema || {}
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.pageSchema = this.$route.meta.pageSchema || {}
      },
      deep: true
    }
  }
}
</script>
