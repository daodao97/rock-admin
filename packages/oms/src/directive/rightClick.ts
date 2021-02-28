import bus from '../plugins/eventBus'
import type { ObjectDirective } from '@vue/runtime-core'

const rightClient: ObjectDirective = {
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
