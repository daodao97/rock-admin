import { onMounted, onUnmounted } from 'vue'
import { debounce } from '../../utils'

let index = 999

export function useAffix(classname: string, top: number) {
  let fixed = false
  let el : HTMLElement
  let offsetTop = 0
  if (top === undefined) {
    top = 0
  }
  const handler: (e : Event) => void = (e) => {
    // 添加吸顶
    if (!e.target) {
      return
    }
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    if (!fixed && scrollTop >= offsetTop) {
      fixed = true
      el.classList.add('el-affix--fixed')
      el.setAttribute('style', `top:0;z-index:${index}`)
      index++
    }
    // 取消吸顶
    if (fixed && scrollTop < offsetTop - 1) {
      el.classList.remove('el-affix--fixed')
      el.setAttribute('style', '')
      fixed = false
    }
  }
  onMounted(() => {
    setTimeout(() => {
      // @ts-ignore
      el = document.getElementsByClassName(classname)[0]
      offsetTop = el.getBoundingClientRect().top
      window.addEventListener('scroll', debounce(handler, 20))
    }, 2000)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', debounce(handler, 20))
  })
}
