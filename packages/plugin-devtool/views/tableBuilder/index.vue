<template>
  <dev-layout>
    <template #left-aside>
      <el-row>
        <el-col class="title" :data-id="22222">搜索条件</el-col>
        <el-col class="ctrl">
          <el-button class="ctrl-btn" @click="pushFilter('input')">文本框</el-button>
        </el-col>
        <el-col class="ctrl">
          <el-button class="ctrl-btn" @click="pushFilter('select')">下拉框</el-button>
        </el-col>
        <el-col class="ctrl">
          <el-button class="ctrl-btn" @click="pushFilter('data')">日期</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title">列表项</el-col>
        <el-col v-for="(item, index) in Object.keys(ctrlMap.headers)" :key="`column-${index}`" class="ctrl">
          <el-button class="ctrl-btn" @click="pushHeaders(ctrlMap.headers[item].type)">{{ ctrlMap.headers[item].name }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title">行按钮</el-col>
        <el-col v-for="(item, index) in Object.keys(ctrlMap.buttons)" :key="`column-${index}`" class="ctrl">
          <el-button class="ctrl-btn" @click="pushRowButton(ctrlMap.buttons[item].type)">{{ ctrlMap.buttons[item].name }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title">常规按钮</el-col>
        <el-col v-for="(item, index) in Object.keys(ctrlMap.buttons)" :key="`column-${index}`" class="ctrl">
          <el-button class="ctrl-btn" @click="pushNormalButton(ctrlMap.buttons[item].type)">{{ ctrlMap.buttons[item].name }}</el-button>
        </el-col>
        <el-col class="ctrl">
          <el-button class="ctrl-btn">按钮组</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title">批量按钮</el-col>
        <el-col v-for="(item, index) in Object.keys(ctrlMap.buttons)" :key="`column-${index}`" class="ctrl">
          <el-button class="ctrl-btn" @click="pushBatchButton(ctrlMap.buttons[item].type)">{{ ctrlMap.buttons[item].name }}</el-button>
        </el-col>
        <el-col class="ctrl">
          <el-button class="ctrl-btn">按钮组</el-button>
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div style="padding: 10px 0">
        <v-button text="查看Schema" type="modal">
          <json-view :data="buiderSchema" />
        </v-button>
      </div>
      <notice divider-msg="列单预览" />
      <v-table ref="table" :key="key" :dev="true" v-bind="buiderSchema" />
      <right-menu
        v-out-click="() => {
          rightMenuOptions.status = false
        }"
        v-bind="rightMenuOptions"
      />
    </template>
    <template #right-aside>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="列表" name="base">
          <div style="margin: 0 10px">
            <v-form v-model="baseOptions" v-bind="baseSchema" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="控件" name="ctrl">
          <div style="margin: 0 10px">
            <v-form :key="ctrlKey" v-model="ctrlOptions" v-bind="ctrlSchema" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </dev-layout>
</template>
<script>
import DevLayout from '../DevLayout.vue'
import { VTable, VForm, VButton, JsonView, eventBus, compactObject } from 'oms'
import RightMenu from '../rightMenu.vue'
import input from './ctrls/input'
import select from './ctrls/select'
import { cloneDeep, set, merge, get, unset } from 'lodash'
import { baseSchema } from './table'
import { ctrlFormDefaultOptions } from '../base'
import columns from './columns'
import buttons from './btn'
import Notice from '../Notice.vue'

export default {
  components: { DevLayout, VTable, VForm, RightMenu, VButton, JsonView, Notice },
  data() {
    return {
      baseSchema: baseSchema,
      activeTab: 'base',
      buiderSchema: {},
      baseOptions: {},
      key: 0,
      ctrlKey: 0,
      activeCtrl: undefined,
      activeBrick: undefined,
      ctrlOptions: {},
      ctrlSchema: {},
      ctrlName: '',
      activeIndex: undefined,
      ctrlMap: {
        filter: { input, select },
        headers: columns,
        buttons: buttons
      },
      activeIndexReg: /(filter|headers|normalButton|batchButton|rowButton)?\[(\d+)\]/,
      rightMenuOptions: {
        status: false,
        top: '200px',
        left: '10px',
        menus: [
          {
            text: '编辑',
            handler: () => {
              this.clicklabel()
              this.rightMenuOptions.status = false
            }
          },
          {
            text: '删除',
            handler: () => {
              this.removeOne()
              this.rightMenuOptions.status = false
            }
          }
        ]
      }
    }
  },
  watch: {
    baseOptions: {
      deep: true,
      immediate: true,
      handler(val) {
        this.buiderSchema = merge(this.buiderSchema, val)
        this.key++
      }
    },
    ctrlOptions: {
      deep: true,
      // immediate: true,
      handler(val) {
        const m = this.activeIndex.match(this.activeIndexReg)
        if (!m) {
          return
        }
        const type = this.buiderSchema[m[1]][parseInt(m[2])].type
        const ctrl = this.ctrlMap[this.activeBrick][type]
        const transData = ctrl.trans ? ctrl.trans(val) : val
        if (transData && Object.keys(transData).length > 0) {
          transData.type = type
          set(this.buiderSchema, this.activeIndex, transData)
          this.key++
        }
      }
    }
  },
  beforeCreate() {
    eventBus.on('right-click', ({ event, data }) => {
      this.activeIndex = data.devId
      const oX = event.clientX
      const oY = event.clientY
      this.rightMenuOptions = merge(this.rightMenuOptions, {
        status: true,
        top: oY + 'px',
        left: oX + 'px'
      })
    })
  },
  methods: {
    pushFilter(name) {
      this.push(name, 'filter', 'filter', 'filter')
    },
    pushHeaders(name) {
      this.push(name, 'headers', 'headers', 'headers')
    },
    pushNormalButton(name) {
      this.push(name, 'normalButton', 'buttons', 'buttons')
    },
    pushBatchButton(name) {
      this.push(name, 'batchButton', 'buttons', 'buttons')
    },
    pushRowButton(name) {
      this.push(name, 'rowButton', 'buttons', 'buttons')
    },
    push(name, target, ctrlMapName, brick) {
      this.activeBrick = brick
      this.ctrlOptions = {}
      this.buiderSchema[target] = this.buiderSchema[target] || []
      const ctrl = this.ctrlMap[ctrlMapName]
      this.activeCtrl = ctrl[name]
      this.buiderSchema[target].push(cloneDeep(ctrl[name].default))
      this.ctrlSchema = cloneDeep({
        options: cloneDeep(ctrlFormDefaultOptions),
        formItems: cloneDeep(ctrl[name].builder)
      })
      this.key++
      this.ctrlKey++
      this.activeIndex = `${target}[${this.buiderSchema[target].length - 1}]`
      this.activeTab = 'ctrl'
    },
    removeOne() {
      unset(this.buiderSchema, this.activeIndex)
      this.buiderSchema = cloneDeep(compactObject(this.buiderSchema))
      this.activeIndex = ''
      this.ctrlOptions = {}
      this.ctrlSchema = {}
      this.key++
      this.ctrlKey++
    },
    clicklabel() {
      const p = this.activeIndex
      const m = p.match(this.activeIndexReg)
      if (m) {
        this.ctrlOptions = cloneDeep(get(this.buiderSchema, p))
        this.activeBrick = m[1]
        if (['normalButton', 'batchButton', 'rowButton'].indexOf(m[1]) > -1) {
          this.activeBrick = 'buttons'
        }
        const type = this.buiderSchema[m[1]][parseInt(m[2])].type
        const ctrl = this.ctrlMap[this.activeBrick][type]
        this.ctrlSchema = cloneDeep({
          options: cloneDeep(ctrlFormDefaultOptions),
          formItems: cloneDeep(ctrl.builder)
        })
        this.ctrlKey++
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  size: 2em;
  padding: 5px 20px;
}
.ctrl {
  padding: 5px 20px;
  .ctrl-btn {
    width: 100%;
  }
}
</style>
