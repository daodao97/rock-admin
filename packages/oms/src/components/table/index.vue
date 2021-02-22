<template>
  <!--  筛选条件  -->
  <el-card v-if="showFilter && showFilterCard" shadow="never" class="table-filter">
    <slot name="filter">
      <v-form
        v-if="tableFilter.length > 0"
        :key="formKey"
        ref="filter"
        v-model="filterForm"
        :dev="dev"
        class="filter-form"
        prefix-path="filter"
        :options="filterFormOptions"
        :form-items="tableFilter"
        @submit="searchAction"
        @reset="resetFilter"
      />
    </slot>
  </el-card>
  <!--   批量按钮/其他按钮   -->
  <slot name="action">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="batchButtonCol">
        <v-button :buttons="makeBatchButton(tableBatchButton)" prefix-path="batchButton" />
        <div v-if="tableBatchButton.length > 0 && selectedInfoPosition === 'afterBatchButton'" class="selected-info">
          <span v-html="selectedInfo" />
        </div>
      </el-col>
      <el-col :span="24 - batchButtonCol" class="normal-button">
        <v-button :buttons="makeNormalButton(tableNormalButton)" prefix-path="normalButton" />
        <export-add-button v-if="tableExportAble" :get-info="getExportInfo" />
      </el-col>
    </el-row>
  </slot>
  <!--  列表  -->
  <el-tabs v-if="tableTabs.length > 0" v-model="activeTab" type="border-card" @tab-click="changeTab">
    <el-tab-pane v-for="(item, index) in tableTabs" :key="index+'-pane'" :label="item.label" :name="item.value + ''" :lazy="true">
      <slot name="table">
        <table-style
          v-loading="loading"
          :headers="tableHeaders"
          :data-list="tableList"
          :props="tableTableProps"
          :selection="tableBatchButton.length > 0"
          :cell-type="cellType"
          :cell-props="cellProps"
          :row-button="tableRowButton"
          :make-row-button="makeRowButton"
          :load-children="loadChildren"
          @select-change="handleSelectionChange"
          @sort-change="sortTable"
          @cell-change="cellChange"
          @btn-action="btnAction"
        />
      </slot>
    </el-tab-pane>
  </el-tabs>
  <slot v-else name="table">
    <table-style
      v-loading="loading"
      :headers="tableHeaders"
      :data-list="tableList"
      :props="tableTableProps"
      :selection="tableBatchButton.length > 0"
      :cell-type="cellType"
      :cell-props="cellProps"
      :row-button="tableRowButton"
      :make-row-button="makeRowButton"
      :load-children="loadChildren"
      @select-change="handleSelectionChange"
      @sort-change="sortTable"
      @cell-change="cellChange"
      @btn-action="btnAction"
    />
  </slot>
  <el-button v-if="listIncreaseConf.state && listIncreaseConf.location === 'afterList'" class="list-incr-button" @click="listIncreaseRecord">添加</el-button>
  <el-row style="display: flex">
    <el-col :span="12" style="min-height: 15px">
      <div v-if="tableBatchButton.length > 0 && selectedInfoPosition === 'beforePagination'" class="selected-info">
        <span v-html="selectedInfo" />
      </div>
    </el-col>
    <el-col :span="12">
      <slot name="page">
        <div v-if="tableShowPagination" class="table-pagination">
          <el-pagination
            :key="paginationKey"
            background
            :page-size="page.pageSize"
            :page-sizes="page.sizes"
            :current-page="page.currentPage"
            layout="total, sizes, prev, pager, next"
            :total="page.total"
            @size-change="pageSizesChange"
            @current-change="(page) => currentPageChange(page)"
          />
        </div>
      </slot>
    </el-col>
  </el-row>
</template>

<script>
import VForm from '../form/index.vue'
import VButton from '../button/index.vue'
import { firstUpperCase, isArray, strVarReplace, isObject, isBool, setUrlParams, ruleCompute } from '../../utils'
import { getPageTitle } from './lib'
import pipe from '../../utils/pipe'
import ExportAddButton from './export/index.vue'
import TableStyle from './tableSytle.vue'
import _ from 'lodash'

export default {
  name: 'VTable',
  components: {
    VForm,
    VButton,
    ExportAddButton,
    TableStyle
  },
  provide() {
    return {
      dev: this.dev
    }
  },
  props: {
    dev: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    listApi: {
      type: String,
      default: ''
    },
    infoApi: {
      type: String,
      default: ''
    },
    filter: {
      type: Array,
      default: () => []
    },
    batchButton: {
      type: Array,
      default: () => []
    },
    normalButton: {
      type: Array,
      default: () => []
    },
    rowButton: {
      type: Array,
      default: () => []
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    selectedNotice: {
      type: [String, Object],
      default: ''
    },
    listIncrease: {
      type: [Boolean, Object],
      default: false
    },
    tableProps: {
      type: Object,
      default: _ => {}
    },
    exportAble: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array,
      default: _ => {
        return []
      }
    }
  },
  emits: ['cell-change'],
  data() {
    const tableDefaultProps = {
      border: true,
      stripe: true,
      size: 'mini',
      rowKey: 'id',
      lazy: true,
      defaultExpandAll: false
    }
    let activeTab = ''
    if (this.$props.tabs.length > 0) {
      activeTab = this.$props.tabs[0].value
    }
    if (this.$route && this.$route.query.tab) {
      activeTab = this.$route.query.tab
    }
    return {
      rowKey: 0,
      formKey: 0,
      tableDefaultProps: tableDefaultProps,
      filterFormOptions: {
        inline: true,
        labelPosition: 'right',
        labelWidth: 'auto',
        submitButton: true,
        cancelButton: {
          text: '重置'
        }
      },
      tableNormalButton: this.$props.normalButton,
      tableBatchButton: this.$props.batchButton,
      tableRowButton: this.$props.rowButton,
      tableHeaders: this.$props.headers,
      tableFilter: this.$props.filter,
      tableList: this.$props.list,
      tableSelectedNotice: this.$props.selectedNotice,
      tableShowPagination: this.$props.showPagination,
      tableTableProps: Object.assign({}, tableDefaultProps, this.$props.tableProps),
      selectionRows: [],
      tableExportAble: this.$props.exportAble,
      tableTabs: this.$props.tabs,
      page: {
        pageSize: 20,
        sizes: [20, 100, 200],
        currentPage: 1,
        total: 0
      },
      paginationKey: 0,
      filterForm: Object.assign({}, this.$route ? this.$route.query : {}),
      loading: false,
      sort: null,
      activeTab: activeTab + ''
    }
  },
  computed: {
    batchButtonCol() {
      if (this.tableBatchButton.length === 0) {
        return 0
      }
      if (this.tableNormalButton.length === 0) {
        return 0
      }
      return Math.round((this.tableBatchButton.length / (this.tableBatchButton.length + this.tableNormalButton.length)) * 24)
    },
    showFilterCard() {
      return this.tableFilter.length > 0
      // return (this.tableFilter.length > 0 && this.tableBatchButton.length > 0) || this.tableFilter.length > 4
    },
    actionWidth() {
      if (this.tableRowButton.length === 1) {
        return undefined
      }
      let ratio = 0
      this.tableRowButton.forEach((item) => {
        ratio += item.text ? 73 : 60
      })
      return ratio
    },
    listIncreaseConf() {
      if (isBool(this.$props.listIncrease)) {
        if (this.$props.listIncrease === false) {
          return {
            state: false
          }
        } else {
          return {
            state: true,
            type: 'append',
            location: 'beforeList'
          }
        }
      }
      return this.$props.listIncrease
    },
    selectedInfoPosition() {
      return isObject(this.tableSelectedNotice) ? this.tableSelectedNotice.position : 'beforePagination'
    },
    selectedInfo() {
      const data = {
        selectedCount: this.selectionRows.length
      }
      const tpl = isObject(this.tableSelectedNotice) ? this.tableSelectedNotice.text : this.tableSelectedNotice
      const matched = tpl.match(/{([\s\S]*?)}/g)
      if (!matched) {
        return tpl
      }
      const match = matched.map(item => item.replace('{', '').replace('}', ''))
      const fields = this.tableHeaders.map(item => item.field)
      for (const i in match) {
        const tokens = match[i].split('|')
        if (tokens.length === 1) {
          continue
        }
        if (fields.indexOf(tokens[0]) === -1) {
          continue
        }
        const column_data = this.selectionRows.map(item => item[tokens[0]])
        data[match[i]] = pipe.execute(column_data, tokens.slice(1))
      }
      return strVarReplace(tpl, data)
    }
  },
  beforeCreate() {
    if (this.$props.infoApi) {
      this.$http
        .request({ method: 'GET', url: this.$props.infoApi })
        .then(({ payload }) => {
          Object.keys(payload).forEach(key => {
            if (key === 'tableProps') {
              this['table' + firstUpperCase(key)] = Object.assign({}, this.tableDefaultProps, payload[key])
            } else {
              this['table' + firstUpperCase(key)] = payload[key]
            }
          }
          )
          let activeTab = ''
          if (this.tableTabs.length > 0) {
            activeTab = this.tableTabs[0].value
          }
          if (this.$route && this.$route.query.tab) {
            activeTab = this.$route.query.tab
          }
          this.activeTab = activeTab + ''
        })
    }
  },
  mounted() {
    setTimeout(() => this.load(), 200)
  },
  methods: {
    changeTab(tab, e) {
      this.load()
    },
    resetFilter() {
      this.filterForm = {}
      this.formKey++
      this.load()
    },
    cellType(column) {
      let type = column.type || 'span'
      type = type === 'input' ? 'span' : type
      return `cell-${type}`
    },
    cellProps(column, scope) {
      const base = {
        data: scope.row[scope.column.property],
        column: column
      }
      if (column.type === 'tpl') {
        base['row'] = scope.row
        base['tpl'] = column.tpl || ''
      }
      return base
    },
    getAvailableFilter() {
      const available = {}
      Object.keys(this.filterForm).map((key) => {
        if (this.filterForm[key] !== '' && this.filterForm[key] !== undefined) {
          available[key] = this.filterForm[key]
        }
      })

      return available
    },
    searchAction() {
      const available = this.getAvailableFilter()
      if (Object.keys(available).length === 0) {
        this.$message({ message: '请填写筛选条件', type: 'warning' })
        return
      }
      this.load()
    },
    load(args = {}, extraPrams = {}) {
      if (!this.listApi) {
        return
      }
      this.loading = true
      if (args.resetPage !== false) {
        this.page.currentPage = 1
      }
      const filter = this.getAvailableFilter()
      const page = {
        _page: this.page.currentPage,
        _size: this.page.pageSize
      }
      const params = Object.assign(
        {},
        filter,
        page,
        this.sort,
        extraPrams,
        this.$route ? this.$route.params : {},
        this.activeTab ? { tab: this.activeTab } : {}
      )
      this.$http
        .request({
          type: 'GET',
          url: this.listApi,
          params: params
        })
        .then(({ payload }) => {
          this.tableList = payload.list
          this.page = Object.assign(this.page, payload.page || {})
          this.loading = false
          setUrlParams(filter)
        })
    },
    handleSelectionChange(rows) {
      this.selectionRows = rows
    },
    batchButtonPreCheck() {
      if (this.selectionRows.length === 0) {
        this.$message({ message: '请勾选相应记录', type: 'warning' })
        return false
      }
      return true
    },
    pageSizesChange(pageSize) {
      this.page.pageSize = pageSize
      this.paginationKey += 1
      this.load()
    },
    currentPageChange(currentPage) {
      if (currentPage - this.page.currentPage > 100) {
        this.$message({
          message: '禁止大跨度翻页',
          type: 'error'
        })
        this.paginationKey += 1
        return
      }
      this.page.currentPage = currentPage
      this.load({ resetPage: false })
      // window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    isArray(tmp) {
      return isArray(tmp)
    },
    makeBatchButton(arr) {
      return arr.map((item) => {
        if (isArray(item)) {
          item = this.makeBatchButton(item)
        } else {
          item['pre-check'] = this.batchButtonPreCheck
        }
        return item
      })
    },
    makeNormalButton(arr) {
      return arr.map((item) => {
        if (isArray(item)) {
          item = this.makeNormalButton(item)
        } else {
          // todo
        }
        return item
      })
    },
    makeRowButton(arr, row) {
      return _.cloneDeep(arr).filter(item => {
        if (item.when) {
          let tmp = item.when
          if (!isArray(item.when[0])) {
            tmp = [item.when]
          }
          return ruleCompute(row, tmp)
        }
        return true
      }).map((item) => {
        if (isArray(item)) {
          item = this.makeRowButton(item)
        } else {
          item['inject-data'] = Object.assign({}, row, this.$route ? this.$route.query : {}, this.$route ? this.$route.params : {})
          item['meta-data'] = Object.assign({}, row, this.$route ? this.$route.query : {}, this.$route ? this.$route.params : {})
        }
        return item
      })
    },
    listIncreaseRecord() {
      const record = {}
      Object.keys(this.tableHeaders).forEach(item => {
        record[item.field] = undefined
      })
      if (this.listIncreaseConf.type === 'append') {
        this.tableList.push(record)
      } else if (this.listIncreaseConf.type === 'unshift') {
        this.tableList.unshift(record)
      } else {
        console.warn('unknown listIncrease type')
      }
      this.rowKey++
    },
    cellChange(index, field, value) {
      this.$emit('cell-change', { index, field, value })
    },
    getColumnProps(props) {
      return {
        sortable: props.sortable ? 'custom' : false
      }
    },
    sortTable({ column, order, prop }) {
      if (order && prop) {
        this.sort = { _sort_by: prop, _sort_type: order === 'descending' ? 'desc' : 'asc' }
      } else {
        this.sort = null
      }
      this.load()
    },
    loadChildren(row, treeNode, resolve) {
      this.$http
        .request({
          type: 'GET',
          url: this.listApi,
          params: { pid: row.id }
        })
        .then(({ payload }) => {
          resolve(payload.list || [])
        })
    },
    btnAction() {
      this.load()
    },
    getExportInfo() {
      return {
        listApi: this.listApi,
        params: this.filterForm,
        header: _.cloneDeep(this.tableHeaders),
        name: getPageTitle(this.$route ? this.$route.matched : '', false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-form {
  ::v-deep(.el-form-item__label) {
    /*text-align-last: justify;*/
  }
}
.selected-info {
  padding: 10px 0;
  height: 28px;
  line-height: 28px;
  color: #909399;
  font-size: 13px;
}
.table-pagination {
  text-align: right;
  padding: 10px 0;
  ::v-deep(.el-pagination) {
    padding-left: 0;
    padding-right: 0;
  }
}
.normal-button {
  text-align: right;
  float: right;
}
.table-filter {
  margin-bottom: 15px;
}
::v-deep(.el-divider--horizontal) {
  margin: 10px 0;
}
::v-deep(.table-header-cell) {
  background-color: #f5f5f5;
}
::v-deep(.el-button + .el-button) {
  margin-left: 0;
}
::v-deep(.el-button) {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  .el-dropdown {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.list-incr-button {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}
::v-deep(.el-form-item) {
   margin-bottom: 0;
}
::v-deep(.el-form-item--small.el-form-item) {
   margin-bottom: 0;
}
::v-deep(.form-section) {
  margin-bottom: 0;
}
::v-deep(.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item) {
  margin-bottom: 0;
}
</style>
<style>
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
</style>
