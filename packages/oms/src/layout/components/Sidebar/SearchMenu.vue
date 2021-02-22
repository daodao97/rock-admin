<template>
  <el-select ref="search" v-model="selected" filterable placeholder="搜索菜单..." class="search-menu" @change="onselected">
    <template v-for="group in filterRoutes" :key="group.path">
      <template v-if="group.children !== undefined">
        <el-option-group
          v-if="!group.hidden "
          :label="group.meta.title"
        >
          <template v-for="(item, index) in group.children" :key="item.path">
            <el-option
              v-if="!item.hidden"
              :label="(index === (group.children.length - 1) ? '└─' : '├─' )+ item.meta.title"
              :value="item.path"
            />
          </template>
        </el-option-group>
      </template>
      <template v-else>
        <el-option
          :label="'' + group.meta.title"
          :value="group.path"
        />
      </template>
    </template>
  </el-select>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

function filterHidden(arr) {
  return arr.filter(each => {
    if (each.hidden) {
      return false
    }
    if (each.children) {
      each.children = filterHidden(each.children)
      if (each.children.length === 0) {
        delete each.children
      }
    }
    return true
  })
}
export default {
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapGetters(['remoteRouter']),
    filterRoutes() {
      let routes = []
      this.remoteRouter.forEach(item => {
        routes = routes.concat(_.cloneDeep(item.routes))
      })
      return filterHidden(routes)
    }
  },
  methods: {
    onselected: function(to) {
      this.$router.push(to)
      this.selected = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-menu {
    width: 100%;
    padding: 15px 20px 0 20px;
    ::v-deep(.el-input__inner) {
      color: #ffffff;
      background-color: #304156;
      border: 1px dashed gray;
    }
    ::v-deep(.el-input__inner:after) {
      background-color: #ffffff;
    }
  }
  .filter-tree {
    max-height: 500px;
  }
</style>
