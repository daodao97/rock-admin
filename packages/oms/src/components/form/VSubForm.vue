<template>
  <div class="sub-from">
    <el-row v-for="(item, index) in sub" :key="index + '-' + key">
      <el-col class="sub-form-item" :span="repeat ? 22: 24">
        <v-form
            :ref="'subForm' + index"
            v-model="sub[index]"
            :is-sub="true"
            :options="formOptions"
            :form-items="$props.formItems"
            :root-data="getRootData"
            :dev="dev"
            @update:modelValue="onchange"
            @mounted="fApi => subMounted(fApi, index)"
        />
      </el-col>
      <el-col v-if="repeat" :span="2" class="sub-form-item-action">
        <div>
          <div>
            <el-button class="action" type="danger" icon="el-icon-minus" circle @click="remove(index)"/>
          </div>
          <div>
            <el-button v-if="index === sub.length - 1" class="action" type="primary" icon="el-icon-plus" circle @click="push"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import {defineAsyncComponent} from 'vue'
import {merge, remove} from 'lodash'

export default {
  name: 'VSubForm',
  components: {
    VForm: defineAsyncComponent(() => import('./index.vue'))
  },
  inject: ['formData', 'dev'],
  props: {
    repeat: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    let subData = []
    if (this.$props.repeat) {
      if (JSON.stringify(this.$props.modelValue) === '{}') {
        subData.push(this.$props.modelValue)
      } else {
        subData = this.$props.modelValue
      }
    } else {
      subData.push(this.$props.modelValue)
    }
    return {
      key: 1,
      fApis: [],
      sub: subData,
      formOptions: merge(this.$props.options, {
        submitButton: false,
        cancelButton: false
      })
    }
  },
  methods: {
    push() {
      this.sub.push({})
    },
    remove(index) {
      this.sub = remove(this.sub, (item, key) => {
        return key !== index
      })
      this.key++
      this.$emit('update:modelValue', this.repeat ? this.sub : this.sub[0])
    },
    onchange() {
      this.$emit('update:modelValue', this.repeat ? this.sub : this.sub[0])
    },
    subMounted(fApi, index) {
      this.fApis[index] = fApi
    },
    validate() {
      let flag = true
      this.fApis.forEach(item => {
        if (!flag) {
          return false
        }
        item.validate(valid => {
          if (!valid) {
            flag = false
          }
        })
      })
      return flag
    },
    getRootData() {
      return this.formData
    }
  }
}
</script>
<style lang="scss" scoped>
.sub-form {
}

.sub-form-item {
  flex: 1 1 auto;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  padding: 20px 10px 10px 10px;
  margin-bottom: 10px;
}

.sub-form-item-action {
  text-align: center;
}
</style>
