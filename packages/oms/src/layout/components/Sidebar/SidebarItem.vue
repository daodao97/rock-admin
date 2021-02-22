<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有子菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="to" :new-tab="onlyOneChild.meta.newTab">
        <el-menu-item
          :index="to"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <menu-content :meta="onlyOneChild.meta" />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 有子菜单 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="to"
      popper-append-to-body
    >
      <template #title>
        <app-link
          v-if="item.redirect && item.redirect !== '#'"
          :to="to"
        >
          <menu-content :meta="item.meta" />
        </app-link>
        <menu-content v-else :meta="item.meta" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :to="$router.resolve(child.redirect ? child.redirect : child).fullPath"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './Link.vue'
import FixiOSBug from './FixiOSBug'
import MenuContent from './MenuContent.vue'

export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    MenuContent
  },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
  }
}
</script>
