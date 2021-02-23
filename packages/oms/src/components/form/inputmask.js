import Inputmask from 'inputmask'
// @link https://www.npmjs.com/package/inputmask
export default {
  mounted(el, binding) {
    if (!binding.value) {
      return
    }
    Inputmask.default(binding.value).mask(el.getElementsByTagName('input')[0])
  }
}
