<template>
  <div class="image-item">
    <el-image
      :lazy="true"
      class="cell-image"
      :src="data"
      :preview-src-list="[data]"
    />
  </div>
</template>
<script>
export default {
  name: 'CellImage',
  props: {
    data: {
      type: String,
      default: ''
    },
    column: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.image-item {
  // 必须要固定高度，因为图片是懒加载的，加载完成后把cell高度撑起的话，会导致操作列高度异常
  height: 55px;
  .cell-image {
    max-height: 50px;
    max-width: 50px;
    line-height: 50px;
  }
}
</style>
