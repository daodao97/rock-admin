export default {
  computed: {
    // @ts-ignore
    device() {
      // @ts-ignore
      return this.$store.state.app.device
    }
  },
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    // @ts-ignore
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      // @ts-ignore
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        // @ts-ignore
        $subMenu.handleMouseleave = e => {
          // @ts-ignore
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
