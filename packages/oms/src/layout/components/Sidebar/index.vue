<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <search-menu v-if="!isCollapse" />
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="(item, index) in routes" :key="index + '-module'">
          <div v-if="item.routes.length > 0 && item.label" class="menu-section">{{ item.label }}</div>
          <sidebar-item
            v-for="route in item.routes"
            :key="route.path"
            :item="route"
            :to="$router.resolve(route.redirect ? route.redirect : route).fullPath"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import SearchMenu from './SearchMenu.vue'
export default {
  components: { SidebarItem, Logo, SearchMenu },
  computed: {
    ...mapGetters(['sidebar', 'remoteRouter', 'customRouter']),
    routes() {
      return [
        {
          label: '',
          routes: this.$router.options.routes.concat(this.customRouter)
        },
        ...this.remoteRouter
      ]
    },
    activeMenu() {
      // const matched = this.$route.matched
      //
      // for (let i = matched.length - 1; i > 0; i--) {
      //   if (!matched[i].meta.hidden) {
      //     return matched[i].path
      //   }
      // }

      return this.$router.resolve(this.$route.redirect ? this.$route.redirect : this.$route).fullPath
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return {
        menuBg: '#304156',
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF'
      }
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped>
  ::v-deep(.el-scrollbar__wrap) {
    overflow: scroll;
  }
  .menu-section {
    height: 30px;
    font-size: 14px;
    display:table-cell;
    vertical-align:bottom;
    padding-left: 20px;
    color: #97a8be;
    padding-top: 5px;
  }
</style>
