<template>
  <div v-if="showNotice" style="margin: 0 0 20px 0">
    <el-alert v-bind="notice" />
  </div>
  <v-table v-bind="tableProps" />
</template>
<script>
import VTable from '../components/table/index.vue'
import { isString, isObject } from '../utils'
export default {
  name: 'TableRender',
  components: { VTable },
  data() {
    const token = this.$route.path.split('/')
    const project = token.slice(0, token.length - 1).join('/')
    const schema = this.$route.meta.pageSchema || { infoApi: project + '/list_schema' }
    if (schema.listApi === undefined) {
      schema.listApi = project + '/list'
    }
    let notice = {}
    if (schema.notice !== undefined) {
      if (isString(schema.notice)) {
        notice = {
          title: schema.notice
        }
      } else if (isObject(schema.notice)) {
        notice = schema.notice
      }
      delete schema['notice']
    }
    return {
      tableProps: schema,
      showNotice: Object.keys(notice).length > 0,
      notice
    }
  }
}
</script>
