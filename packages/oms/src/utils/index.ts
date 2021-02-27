import Message from 'element-plus/lib/el-message'

export function ruleCompute(obj: Record<string, any>, rule: string[][] | string[], fakeKey: string) {
  if (!rule) {
    return true
  }
  let ret = true
  let real_rule = rule
  if (rule[0] && typeof rule[0] === 'string') {
    // @ts-ignore
    real_rule = [rule]
  }
  for (let i = 0; i < real_rule.length; i++) {
    const item = real_rule[i]
    const key = fakeKey ? item[0].replace('.', '-') : item[0]
    if (item[1] === '=') {
      ret = obj[key] === item[2]
    }
    if (item[1] === '>') {
      ret = obj[key] > item[2]
    }
    if (item[1] === '<') {
      ret = obj[key] < item[2]
    }
    if (item[1] === '>=') {
      ret = obj[key] >= item[2]
    }
    if (item[1] === '<=') {
      ret = obj[key] <= item[2]
    }
    if (item[1] === '!=') {
      ret = obj[key] !== item[2]
    }
    if (item[1] === 'in') {
      ret = item[2].indexOf(obj[key]) !== -1
    }
    if (item[1] === 'not_in') {
      ret = item[2].indexOf(obj[key]) === -1
    }
    if (!ret) {
      return false
    }
  }
  return ret
}

export function showEleByClassName(class_name: string, block: ScrollLogicalPosition, behavior: ScrollBehavior, index: number | string) {
  setTimeout(() => {
    const ele = document.getElementsByClassName(class_name)
    if (ele.length === 0) {
      return
    }
    const elIndex = index && index === 'last' ? ele.length - 1 : 0
    ele[elIndex].scrollIntoView({
      block: block || 'center', // 值有start,center,end,nearest，当前显示在视图区域中间
      behavior: behavior || 'smooth' // 值有auto,instant,smooth，缓动动画（当前是慢速的）
    })
    // isError[0].querySelector('input').focus()
  }, 100)
}

export function copyToClipboard(value: any) {
  navigator.clipboard.writeText(value).then(_ => {
    Message({
      message: '已复制到剪贴板',
      type: 'success',
      duration: 1000
    })
  }).catch(err => {
    Message({
      message: '复制到剪贴板失败' + err,
      type: 'error',
      duration: 1000
    })
  })
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function searchTreeValues(tree: Record<string, any>, value: any, key = 'id') {
  let nodes: any[] = []
  tree.forEach((item: any) => {
    if (item[key] === value) {
      nodes.push(value)
      return
    }
    if (item.children) {
      const sub = searchTreeValues(item.children, value, key)
      if (sub.length > 0) {
        nodes = [item[key]].concat(sub)
      }
    }
  })
  return nodes
}

export function toArray(value: any) {
  return Array.isArray(value)
    ? value
    : ((value === undefined || value === null || value === '' ? [] : [value])
    )
}

export function checkImgExists(imgurl: string) {
  const ImgObj = new Image() // 判断图片是否存在
  ImgObj.src = imgurl
  return ImgObj.width > 0 && ImgObj.height > 0
}

export function addNewStyle(id: string, src: string) {
  let styleElement = document.getElementById(id)

  if (styleElement === null) {
    styleElement = document.createElement('link')
    // @ts-ignore
    styleElement.type = 'text/css'
    // @ts-ignore
    styleElement.rel = 'stylesheet'
    // @ts-ignore
    styleElement.href = src
    // @ts-ignore
    styleElement.id = id
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }
}

// @ts-ignore
export function createIFrame({ elId, attrs }) {
  const eleIframe = document.createElement('iframe')
  eleIframe.width = '365px'
  eleIframe.height = '400px'
  eleIframe.frameBorder = '0'
  eleIframe.scrolling = 'no'
  // @ts-ignore
  eleIframe.allowTransparency = 'true'
  Object.keys(attrs || {}).forEach(key => {
    // @ts-ignore
    eleIframe[key] = attrs[key]
  })
  const container = document.getElementById(elId)
  // @ts-ignore
  container.innerHTML = ''
  // @ts-ignore
  container.appendChild(eleIframe)
  return eleIframe
}

export function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
