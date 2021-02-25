<template>
  <div v-if="tools" class="json-view-tool">
    <el-tooltip content="复制">
      <i class="el-icon-copy-document" @click="copy"/>
    </el-tooltip>
  </div>
  <div v-if="visible" :class="['json-view-container',theme,`deep-${currentDeep}`]">
    <div
        :class="['json-view', length ? 'closeable' : '']"
        :style="{fontSize:fontSize+'px',lineHeight:lineHeight+'px'}"
    >
      <!--icon-style-square-->
      <span v-if="length && iconStyle==='square'" class="angle" @click="toggleClose">
        <i :class="'el-icon-' + (innerclosed ? 'plus': 'minus')"/>
      </span>
      <!--icon-style-circle-->
      <span v-if="length&& iconStyle==='circle'" class="angle" @click="toggleClose">
        <i :class="'el-icon-' + (innerclosed ? 'circle-plus-outline': 'remove-outline')"/>
      </span>
      <!--icon-style-triangle-->
      <span v-if="length&& iconStyle==='triangle'" class="angle" @click="toggleClose">
        <i :class="'el-icon-' + (innerclosed ? 'caret-right': 'el-icon-caret-bottom')"/>
      </span>
      <div class="content-wrap">
        <p :class="['first-line',length>0?'pointer':'']" @click="toggleClose">
          <span v-if="jsonKey" class="json-key">"{{ jsonKey }}": </span>
          <span v-if="length">{{ prefix }}{{ innerclosed ? ('...' + subfix) : '' }}
            <span class="json-note">{{ innerclosed ? (length + ' items') : '' }}</span>
          </span> <span v-if="!length">{{ `${isArray ? '[]' : '{}'}${isLast ? '' : ','}` }}</span>
        </p>
        <div v-if="!innerclosed && length" class="json-body">
          <template v-for="(item, index) in items" :key="index">
            <json-view
                v-if="item.isJSON"
                :closed="isClose()"
                :data="item.value"
                :json-key="item.key"
                :current-deep="templateDeep+1"
                :deep="deep"
                :icon-style="iconStyle"
                :theme="theme"
                :font-size="fontSize"
                :line-height="lineHeight"
                :icon-color="iconColors"
                :is-last="index === items.length - 1"
                :has-siblings="item.hasSiblings"
                :tools="false"
            />
            <p v-else class="json-item">
              <span class="json-key">{{ (isArray ? '' : '"' + item.key + '":') }}</span>
              <span :class="['json-value',getDataType(item.value)]">
                {{ `${getDataType(item.value) === 'string' ? '"' : ''}${item.value}${getDataType(item.value) === 'string' ? '"' : ''}${index === items.length - 1 ? '' : ','}` }}
              </span>
            </p>
          </template>
          <span v-if="!innerclosed" class="base-line"/>
        </div>
        <p v-if="!innerclosed " class="last-line">
          <span>{{ subfix }}</span>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
import {copyToClipboard} from '../../utils'
// https://github.com/zhaoxuhui1122/vue-json-view
export default {
  name: 'JsonView',
  props: {
    data: { // 传入的json数据
      type: [Object, Array],
      required: true
    },
    jsonKey: { // json的key值，用于第二层及二层以上的组件的key值
      type: String,
      default: ''
    },
    closed: { // 是否折叠
      type: Boolean,
      default: false
    },
    isLast: { // 是否是最后一行
      type: Boolean,
      default: true
    },
    fontSize: { // 字体大小
      type: Number,
      default: 14
    },
    lineHeight: { // 行高
      type: Number,
      default: 24
    },
    deep: { // 展开深度
      type: Number,
      default: 3
    },
    currentDeep: { // 当前为递归的第几层
      type: Number,
      default: 1
    },
    iconStyle: { // 折叠icon样式
      type: String,
      default: 'circle'
    },
    iconColor: { // icon颜色
      type: Array,
      default() {
        return []
      }
    },
    theme: { // 主题
      type: String,
      default: ''
    },
    hasSiblings: { // 是否有兄弟节点
      type: Boolean,
      default: true
    },
    tools: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerclosed: this.closed,
      templateDeep: this.currentDeep,
      visible: false
    }
  },
  computed: {
    isArray() {
      return this.getDataType(this.data) === 'array'
    },
    length() {
      return this.isArray ? this.data.length : Object.keys(this.data).length
    },
    subfix() {
      const data = this.data
      if (this.isEmptyArrayOrObject(data)) { // 如果是空数组或空对象
        return ''
      } else {
        return (this.isArray ? ']' : '}') + (this.isLast ? '' : ',')
      }
    },
    prefix() {
      return this.isArray ? '[' : '{'
    },
    items() {
      const json = this.data

      if (this.isArray) {
        return json.map(item => {
          const isJSON = this.isObjectOrArray(item)
          return {
            value: item,
            isJSON,
            key: ''
          }
        })
      }
      return Object.keys(json).map(key => {
        const item = json[key]
        const isJSON = this.isObjectOrArray(item)
        return {
          value: item,
          isJSON,
          key
        }
      })
    },
    iconColors() {
      const {theme, iconColor} = this
      if (iconColor.length === 2) {
        return iconColor
      } else {
        if (theme === 'one-dark') {
          return ['#747983', '#747983']
        } else if (theme === 'vs-code') {
          return ['#c6c6c6', '#c6c6c6']
        } else {
          return ['#747983', '#747983']
        }
      }
    }
  },
  watch: {
    closed() {
      this.innerclosed = this.closed
    }
  },
  mounted() {
    setTimeout(() => {
      this.visible = true
    }, 0)
  },
  methods: {
    getDataType(data) {
      return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    },
    isObjectOrArray(source) {
      return ['array', 'object'].includes(this.getDataType(source))
    },
    toggleClose() {
      if (this.length === 0) {
        return
      }
      this.innerclosed = !this.innerclosed
    },
    isClose() {
      return this.templateDeep + 1 > this.deep
    },
    isEmptyArrayOrObject(data) { // 空数组或者空对象
      return [{},
        []
      ].map(item => JSON.stringify(item)).includes(JSON.stringify(data))
    },
    copy() {
      copyToClipboard(JSON.stringify(this.data, null, 2))
    }
  }
}
</script>
<style scoped lang="scss">
@import "./style/index";
@import "./style/on-dark";
@import "./style/vs-code";
</style>

