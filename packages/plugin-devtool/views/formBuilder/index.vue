<template>
  <dev-layout>
    <template #left-aside>
      <el-row>
        <el-col class="title">组件列表</el-col>
        <el-col v-for="(item, index) in Object.keys(ctrlMap)" :key="'ctrl-'+ index" class="ctrl">
          <el-button class="ctrl-btn" @click="push(item)">{{ ctrlMap[item].name }}</el-button>
        </el-col>
      </el-row>
    </template>
    <template #main>
      <div style="padding: 10px 0">
        <v-button text="查看Schema" type="modal">
          <json-view :data="buiderSchema" />
        </v-button>
        <v-button ref="sql" text="从表结构解析" type="modal">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="表结构" name="1">
              <code-mirror v-model="tableStruct" />
              <el-button @click="parseSql">解析</el-button>
            </el-collapse-item>
            <el-collapse-item title="类型调整" name="2">
              <v-form v-if="sqlOptions.columns !== undefined" v-model="sqlOptions" v-bind="sqlSchema" />
              <el-button @click="submitSql">确定</el-button>
            </el-collapse-item>
          </el-collapse>
        </v-button>
      </div>
      <notice divider-msg="表单预览" />
      <v-form v-if="buiderSchema.formItems" ref="form" :key="key" :dev="true" v-bind="buiderSchema" />
      <right-menu
        v-out-click="() => {
          rightMenuOptions.status = false
        }"
        v-bind="rightMenuOptions"
      />
    </template>
    <template #right-aside>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="表单" name="base">
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
import { VForm, VButton, JsonView, CodeMirror, eventBus, compactObject } from 'oms'
import RightMenu from '../rightMenu.vue'
import { cloneDeep, get, merge, set, unset } from 'lodash'
import {
  ctrls,
  baseSchema
} from './form'
import { ctrlFormDefaultOptions } from '../base'
import sqlForm from './sql-form'
import { sqlSchema } from './sql-form'
import Notice from '../Notice.vue'

export default {
  components: { DevLayout, VForm, RightMenu, VButton, JsonView, CodeMirror, Notice },
  data() {
    return {
      sqlOptions: {},
      sqlSchema: sqlSchema,
      baseSchema: baseSchema,
      activeTab: 'base',
      buiderSchema: {},
      baseOptions: {},
      key: 0,
      ctrlKey: 0,
      activeCtrl: undefined,
      ctrlOptions: {},
      ctrlSchema: {},
      ctrlName: '',
      activeIndex: undefined,
      ctrlMap: ctrls,
      activeIndexReg: /(formItems)?\[(\d+)\]/,
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
      },
      tableStruct: '',
      activeName: '1'
    }
  },
  watch: {
    baseOptions: {
      deep: true,
      immediate: true,
      handler(val) {
        const tmp = cloneDeep(val)
        if (val.showSubmitButton === false) {
          tmp.submitButton = false
        }
        if (val.cancelSubmitButton === false) {
          tmp.cancelButton = false
        }
        delete tmp.showSubmitButton
        delete tmp.showCancelButton
        if (Object.keys(tmp).length > 0) {
          this.buiderSchema = merge(this.buiderSchema, { options: tmp })
          this.key++
        }
      }
    },
    ctrlOptions: {
      deep: true,
      // immediate: true,
      handler(val) {
        const current = get(this.buiderSchema, this.activeIndex)
        const type = current.type
        const ctrl = this.ctrlMap[type]
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
      this.activeIndex = 'formItems' + data.devId
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
    push(name) {
      const target = 'formItems'
      this.ctrlOptions = {}
      this.buiderSchema[target] = this.buiderSchema[target] || []
      const ctrl = this.ctrlMap[name]
      this.activeCtrl = ctrl
      this.buiderSchema[target].push(cloneDeep(ctrl.default))
      this.ctrlSchema = cloneDeep({
        options: cloneDeep(ctrlFormDefaultOptions),
        formItems: cloneDeep(ctrl.builder)
      })
      this.ctrlKey++
      this.key++
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
        const type = this.ctrlOptions.type
        const ctrl = this.ctrlMap[type]
        this.ctrlSchema = cloneDeep({
          options: cloneDeep(ctrlFormDefaultOptions),
          formItems: cloneDeep(ctrl.builder)
        })
        this.ctrlKey++
      }
    },
    parseSql() {
      if (!this.tableStruct.trim()) {
        return
      }
      this.sqlOptions.columns = sqlForm(this.tableStruct)
      this.activeName = '2'
    },
    submitSql() {
      for (let i = 0; i < this.sqlOptions.columns.length; i++) {
        const item = this.sqlOptions.columns[i]
        if (item.type === '') {
          this.$message({ type: 'error', message: `${item.field}字段的类型未指定` })
          return
        }
      }
      this.buiderSchema.formItems = cloneDeep(this.sqlOptions.columns)
      this.$refs.sql.closeModal()
      this.key++
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
