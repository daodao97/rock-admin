<template>
  <v-icon name="ra-code" @click="show = !show" />
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
import JsonView from '../../../components/jsonview/index.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'PageScheme',
  components: { JsonView },
  setup() {
    const show = ref(false)
    const key = ref(1)
    const direction = 'rtl'
    const route = useRoute()
    const pageSchema = ref(route.meta.pageSchema || {})
    onBeforeRouteUpdate((to) => {
      pageSchema.value = to.meta.pageSchema || {}
      key.value++
    })
    return { show, key, direction, pageSchema }
  }
}
</script>
