<template>
  <div :class="classObj" class="app-wrapper">
    <div
        v-if="device === 'mobile' && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
    />
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar/>
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
import {Navbar, Sidebar, AppMain} from './components'
import {addListener, removeListener} from 'resize-detector'

const {body} = document
const WIDTH = 992 // refer to Bootstrap's responsive design
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  beforeMount() {
    addListener(body, this.resizeHandler)
  },
  beforeUnmount() {
    removeListener(body, this.resizeHandler)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
    },
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.$store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('app/closeSideBar', {withoutAnimation: true})
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixin";
@import "../../styles/variables";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
