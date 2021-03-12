<template>
  <el-table
    :data="dataList"
    :load="loadChildren"
    style="width: 100%"
    v-bind="props"
    @selection-change="handleSelectionChange"
    @sort-change="sortTable"
  >
    <el-table-column v-if="selection" type="selection" />
    <el-table-column
      v-for="(item, index) in headers"
      :key="index + '-table-column'"
      :prop="item.field"
      :label="item.label"
      v-bind="getColumnProps(item.props || {})"
    >
      <!--    表头    -->
      <template #header>
        <span v-right-click="dev ? {devId: `headers[${index}]`} : undefined">
          {{ item.label }}
          <el-tooltip v-if="item.info" effect="dark" placement="top-start">
            <i class="el-icon-warning-outline" />
            <template #content><span v-html="item.info" /></template>
          </el-tooltip>
        </span>
      </template>
      <!--    单元格    -->
      <template #default="scope">
        <cell-edit
          v-if="item.edit"
          :key="`${index}-${rowKey}`"
          v-model="scope.row[scope.column.property]"
          v-bind="{item: item}"
          @update:modelValue="value => cellChange(scope.index_, item.field, value)"
        />
        <component
          :is="cellType(item)"
          v-else
          v-bind="cellProps(item, scope)"
        />
      </template>
    </el-table-column>
    <!--     操作     -->
    <el-table-column
      v-if="rowButton.length > 0"
      key="row-action"
      label="操作"
      fixed="right"
      :width="actionWidth"
    >
      <template #default="scope">
        <v-button :buttons="makeRowButton(rowButton, scope.row)" prefix-path="normalButton" @action="btnAction" />
      </template>
    </el-table-column>
    <template #empty> 没有数据</template>
  </el-table>
</template>
<script lang="ts">
import * as Cells from './cell'
import VButton from '../button/index.vue'
import CellEdit from './cell-edit/index.vue'

export default {
  name: 'TableStyle',
  components: Object.assign(
    {
      VButton,
      CellEdit
    },
    Cells
  ),
  inject: ['dev'],
  props: {
    headers: {
      type: Array,
      default: _ => []
    },
    dataList: {
      type: Array,
      default: _ => []
    },
    props: {
      type: Object,
      default: _ => {
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    cellType: {
      type: Function,
      default: () => {
      }
    },
    cellProps: {
      type: Function,
      default: () => {
      }
    },
    rowButton: {
      type: Array,
      default: _ => []
    },
    makeRowButton: {
      type: Function,
      default: () => {
      }
    },
    loadChildren: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ['select-change', 'sort-change', 'cell-change', 'btn-action'],
  data() {
    return {
      rowKey: 0
    }
  },
  computed: {
    actionWidth() {
      if (this.rowButton.length === 1) {
        return undefined
      }
      let ratio = 0
      this.rowButton.forEach((item) => {
        ratio += item.text ? 73 : 60
      })
      return ratio
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.$emit('select-change', rows)
    },
    sortTable(data) {
      this.$emit('sort-change', data)
    },
    getColumnProps(props) {
      return {
        sortable: props.sortable ? 'custom' : false
      }
    },
    cellChange(index, field, value) {
      this.$emit('cell-change', { index, field, value })
    },
    btnAction(btn) {
      this.$emit('btn-action', btn)
    }
  }
}
</script>
