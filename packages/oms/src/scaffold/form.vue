<template>
  <div v-if="showNotice" style="margin: 0 0 20px 0">
    <el-alert
        v-bind="notice"
    />
  </div>
  <v-form
      :key="key"
      v-model="formData"
      v-bind="formProps"
  />
</template>
<script>
import VForm from '../components/form/index.vue'
import {isObject, isString} from '../utils/type'
import {strVarReplace} from '../utils/string'
import _ from 'lodash'

export default {
  name: 'FormRender',
  components: {VForm},
  data() {
    const token = this.$route.path.split('/')
    const project = token.slice(0, token.length - 1).join('/')
    let schema = this.$route.meta.pageSchema || {infoApi: project + '/form_schema'}
    schema = _.merge({
      saveApi: project + '/save',
      afterSubmit: 'goback',
      afterReset: 'goback'
    }, schema)
    const rep = ['saveApi', 'getApi', 'infoApi']
    rep.forEach(key => {
      if (schema[key]) {
        schema[key] = strVarReplace(schema[key], {id: this.$route.params.id || ''})
      }
    })
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
      key: 0,
      formData: {},
      formProps: schema,
      showNotice: Object.keys(notice).length > 0,
      notice
    }
  },
  computed: {
    getApi() {
      return this.formProps.getApi
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http.request({
        method: 'GET',
        url: this.getApi
      }).then(({payload}) => {
        this.formData = payload
        this.key++
      })
    }
  }
}
</script>
