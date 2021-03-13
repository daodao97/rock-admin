<template>
  <!--右键菜单-->
  <div
    v-show="status"
    id="rightMenuDom"
    class="right-menu"
    :style="{
      top: top,
      left: left
    }"
  >
    <div class="el-scrollbar" style="">
      <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
        <ul class="el-scrollbar__view el-select-dropdown__list">
          <ul class="el-select-group__wrap">
            <!--<li class="el-select-group__title">城市名</li>-->
            <li>
              <ul class="el-select-group">
                <li
                  v-for="(item, index) in menus"
                  :key="'btn-' + index"
                  class="el-select-dropdown__item"
                  @click="() => onclick(item.handler)"
                >
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </ul>
      </div>
      <div class="el-scrollbar__bar is-horizontal" style="display: none;">
        <div class="el-scrollbar__thumb" style="transform: translateX(0%);" />
      </div>
      <div class="el-scrollbar__bar is-vertical el-scrollbar-fade-enter-to" style="display: none;">
        <div class="el-scrollbar__thumb" style="transform: translateY(0%); height: 91.3333%;" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RightMenu',
  props: {
    status: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => [] // menu {text, handler}
    }
  },
  methods: {
    onclick(callback) {
      callback()
    }
  }
})
</script>
<style scoped lang="scss">
// 右键菜单样式
.right-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 166px;
  height: auto;
  background-color: #FFFFFF;
  border: 1px solid #DCDFE6;
  display: block;
  border-radius: 3px;
  z-index: 999;
}
</style>
