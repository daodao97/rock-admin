<template>
  <el-alert title="操作提示" type="success" description="1. 点击左侧按钮添加控件 2.右侧编辑区对改组件进行属性定义 3.预览区右键可重新编辑或删除控件" />
  <el-divider content-position="left">{{ dividerMsg }}</el-divider>
</template>
<script>
export default {
  name: 'Notice',
  props: {
    dividerMsg: {
      type: String,
      default: ''
    }
  }
}
</script>
