import bus from '../plugin/eventBus'
export default {
  mounted: (el, binding) => {
    if (el === null) {
      return
    }
    if (binding.value) {
      // el.style.border = '1px solid red'
    }
    el.oncontextmenu = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.cancelBubble = true
      binding.value && bus.emit('right-click', { event: e, data: binding.value })
    }
  }
}
