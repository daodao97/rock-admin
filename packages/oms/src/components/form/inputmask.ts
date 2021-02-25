import Inputmask from 'inputmask'
import { Directive } from 'vue'
// @link https://www.npmjs.com/package/inputmask
const inputmask: Directive = {
  mounted(el, binding) {
    if (!binding.value) {
      return
    }
    Inputmask(binding.value).mask(el.getElementsByTagName('input')[0])
  }
}

export default inputmask
