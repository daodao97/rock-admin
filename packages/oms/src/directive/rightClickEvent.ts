import bus from '../plugin/eventBus'
import { Directive } from 'vue'

const rightClient : Directive = {
  mounted: (el, binding) => {
    if (el === null) {
      return
    }
    if (binding.value) {
      // el.style.border = '1px solid red'
    }
    el.oncontextmenu = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      e.cancelBubble = true
      binding.value && bus.emit('right-click', { event: e, data: binding.value })
    }
  }
}

export default rightClient
