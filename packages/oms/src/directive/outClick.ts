import { Directive } from 'vue'

const outClick : Directive = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}

export default outClick
