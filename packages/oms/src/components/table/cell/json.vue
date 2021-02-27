<template>
  <el-popover title="内容" placement="top-start" width="auto" trigger="hover">
    <template #reference>
      <el-tag class="popover-ref">{{ JSON.stringify(data) }}</el-tag>
    </template>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </el-popover>
</template>
<script lang="ts">
export default {
  name: 'CellJson',
  props: {
    data: {
      type: [Array, Object],
      default: () => {
      }
    },
    column: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popover-ref {
  cursor: pointer;
  word-break: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
