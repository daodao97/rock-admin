<template>
  <el-button @click="execute">导出</el-button>
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
  >
    <el-progress :percentage="percentage"/>
  </el-dialog>
</template>
<script>
import {export_json_to_excel} from '../../../utils/export2excel'

export default {
  name: 'ExportAddButton',
  props: {
    getInfo: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      dialogVisible: false,
      task: {
        page: 1,
        size: 20,
        total: 200
      }
    }
  },
  computed: {
    percentage() {
      const compute = (this.task.page / Math.ceil(this.task.total / this.task.size))
      return (compute ? 1 : compute) * 100
    }
  },
  methods: {
    async execute() {
      const task = this.getInfo()
      this.task = Object.assign(this.task, task)
      let data = []
      const header = []
      const fields = []
      task.header.forEach(item => {
        header.push(item.label)
        fields.push(item.field)
      })
      this.dialogVisible = true
      while (this.task.page <= Math.ceil(this.task.total / this.task.size)) {
        const params = Object.assign({_page: task.page || 1, _size: task.size || 20}, task.filter || {})
        const {payload} = await this.$http.request({method: 'GET', url: task.listApi, params})
        const list = [];
        (payload.list || []).forEach(item => {
          const row = []
          fields.forEach(each => {
            row.push(item[each])
          })
          list.push(row)
        })
        data = data.concat(list)
        this.task.page++
        this.task.total = payload.page.total
      }
      export_json_to_excel({
        header: header,
        data: data,
        filename: task.name
      })
      this.$message('文件导出成功')
      this.dialogVisible = false
    }
  }
}
</script>
