<template>
  <el-container style="width: 100%;height: 100%">
    <el-aside class="aside" width="200px">
      <slot name="left-aside" />
    </el-aside>
    <el-main class="main">
      <slot name="main" />
    </el-main>
    <el-aside class="aside" width="350px">
      <slot name="right-aside" />
    </el-aside>
  </el-container>
</template>
<style scoped>
.main {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}
.aside {
  padding-top: 20px;
}
</style>
