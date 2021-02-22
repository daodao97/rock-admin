import Message from 'element-plus/lib/el-message'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return null
}

export function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || ['', ''])[1].replace(/\+/g, '%20')
    ) || null
  )
}

export function strVarReplace(str, obj) {
  const match = str.match(/{([\s\S]*?)}/g)
  if (!match) {
    return str
  }
  match.forEach(item => {
    let key
    key = item.replace('{', '')
    key = key.replace('}', '')
    str = str.replace(item, getObjectNodeByKeyTree(key, obj))
  })
  return str
}

export function getObjectNodeByKeyTree(keyTree, object, defaultVal) {
  const keys = keyTree.split('.')
  let val = Object.assign({}, object)
  for (let i = 0; i < keys.length; i++) {
    val = val[keys[i]]
    if (val === undefined || val === null) {
      return defaultVal
    }
  }
  return val
}

export function clone(data) {
  let obj = {}
  obj = JSON.parse(JSON.stringify(data))
  return obj
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

export function getArrayDepth(value) {
  return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0
}

export function ruleCompute(obj, rule, fakeKey) {
  if (!rule) {
    return true
  }
  let ret = true
  let real_rule = rule
  if (rule[0] && typeof rule[0] === 'string') {
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

export function getParent(data2, nodeId2) {
  let arrRes = []
  if (data2.length === 0) {
    if (nodeId2) {
      arrRes.unshift(data2)
    }
    return arrRes
  }
  const rev = (data, nodeId, pidKey = 'pid') => {
    for (let i = 0, length = data.length; i < length; i++) {
      const node = data[i]
      if (node.id === nodeId) {
        arrRes.unshift(node)
        rev(data2, node[pidKey])
        break
      } else {
        if (node.children) {
          rev(node.children, nodeId)
        }
      }
    }
    return arrRes
  }
  arrRes = rev(data2, nodeId2)
  return arrRes
}

export function nodeDeep(data, nodeId) {
  const tree = getParent(data, nodeId)
  return tree.length + 1
}

export function treeSearch(tree, kw_val, key = 'id') {
  let stark = []

  stark = stark.concat(tree)

  while (stark.length) {
    const temp = stark.shift()
    if (temp.children) {
      stark = temp.children.concat(stark)
    }
    if (kw_val === temp[key]) {
      return temp
    }
  }
}

export function searchTreeValues(tree, value, key = 'id') {
  let nodes = []
  tree.forEach(item => {
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

export function showEleByClassName(class_name, block, behavior, index) {
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

export function arrayColumn(arrayObj, key, filter) {
  const ret = []
  if (key === undefined) {
    return ret
  }
  arrayObj.forEach(item => {
    if (item[key] !== undefined && (filter ? filter(item) : true)) {
      ret.push(item[key])
    }
  })
  return ret
}

/**
 * @param {*} target
 */
export function type(target) {
  const ret = typeof target
  const template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number - object',
    '[object Boolean]': 'boolean - object',
    '[object String]': 'string-object'
  }

  if (target === null) {
    return 'null'
  } else if (ret === 'object') {
    const str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    return ret
  }
}

/**
 * children数组扁平化
 */
export function flattenChildren(arr) {
  try {
    return arr.reduce((result, item) => {
      let children = []
      if (Array.isArray(item.children) && item.children.length > 0) {
        children = flattenChildren(item.children)
      }
      item.children = []
      return [...result, ...children, item]
    }, [])
  } catch (error) {
    console.warn(error)
  }
}

export function debounce(fn, wait) {
  const callback = fn
  let timerId = null

  function debounced() {
    // 保存作用域
    const context = this
    // 保存参数，例如 event 对象
    const args = arguments

    clearTimeout(timerId)
    timerId = setTimeout(function() {
      callback.apply(context, args)
    }, wait)
  }

  // 返回一个闭包
  return debounced
}

export function throttle(fn, wait) {
  const callback = fn
  let timerId = null

  // 是否是第一次执行
  let firstInvoke = true

  function throttled() {
    const context = this
    const args = arguments

    // 如果是第一次触发，直接执行
    if (firstInvoke) {
      callback.apply(context, args)
      firstInvoke = false
      return
    }

    // 如果定时器已存在，直接返回。
    if (timerId) {
      return
    }

    timerId = setTimeout(function() {
      // 注意这里 将 clearTimeout 放到 内部来执行了
      clearTimeout(timerId)
      timerId = null

      callback.apply(context, args)
    }, wait)
  }

  // 返回一个闭包
  return throttled
}

export function getRandomColor() {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  )
}

export function numberFormat(n, dot, x) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (dot > 0 ? '\\.' : '$') + ')'
  return (n * 1.0)
    .toFixed(Math.max(0, ~~dot))
    .replace(new RegExp(re, 'g'), '$&,')
}

export function obj2Param(obj) {
  const params = []
  Object.keys(obj || {}).forEach(key => {
    params.push(
      encodeURIComponent(key) +
        '=' +
        encodeURIComponent(obj[key] == null ? '' : obj[key])
    )
  })
  return params.join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function createIFrame({ elId, attrs }) {
  const eleIframe = document.createElement('iframe')
  eleIframe.width = '365px'
  eleIframe.height = '400px'
  eleIframe.frameBorder = '0'
  eleIframe.scrolling = 'no'
  eleIframe.allowTransparency = 'true'
  Object.keys(attrs || {}).forEach(key => {
    eleIframe[key] = attrs[key]
  })
  const container = document.getElementById(elId)
  container.innerHTML = ''
  container.appendChild(eleIframe)
  return eleIframe
}

export function listToTree(list, idKey, pidKey) {
  const map = {}
  let node
  const roots = []
  let i
  if (idKey === undefined) {
    idKey = 'id'
  }
  if (pidKey === undefined) {
    pidKey = 'pid'
  }

  for (i = 0; i < list.length; i += 1) {
    map[list[i][idKey]] = i // initialize the map
    list[i].children = [] // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node[pidKey] !== 0) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node[pidKey]]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

export function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}

export function camelToSnake(str, connector) {
  return str
    .split(/(?=[A-Z])/)
    .join(connector || '_')
    .toLowerCase()
}

export function firstUpperCase(str) {
  const [first, ...rest] = str
  return first.toUpperCase() + rest.join('')
}

export function isArray(arg) {
  return type(arg) === 'array'
}

export function isObject(arg) {
  return type(arg) === 'object'
}

export function isFunc(arg) {
  return type(arg) === 'function'
}

export function isBool(arg) {
  return type(arg) === 'boolean'
}

export function isNumber(arg) {
  return type(arg) === 'number'
}

export function isString(arg) {
  return type(arg) === 'string'
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function objFuncNames(obj) {
  const arr = []
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i) && typeof obj[i] === 'function') {
      arr.push(i)
    }
  }
  return arr
}

export function toArray(value) {
  return Array.isArray(value)
    ? value
    : ((value === undefined || value === null || value === '' ? [] : [value])
    )
}

export function checkImgExists(imgurl) {
  const ImgObj = new Image() // 判断图片是否存在
  ImgObj.src = imgurl
  return ImgObj.width > 0 && ImgObj.height > 0
}

export function setUrlParams(obj) {
  const qs = new URLSearchParams(obj)
  let hash = location.hash
  const index = hash.indexOf('?')
  if (index !== -1) {
    hash = hash.substring(0, index)
  }
  const url = location.pathname + hash + (qs.toString() ? '?' + qs.toString() : '')
  history.pushState({ url: url, title: document.title }, document.title, url)
}

export function queryStringToObj(str) {
  return Object.fromEntries(new URLSearchParams(str))
}

export function parseBool(value) {
  if (isBool(value)) {
    return value
  }
  if (isNumber(value)) {
    return value > 0
  }
  if (isString(value)) {
    return value === 'true'
  }
  return !!value
}

export function tplEngine(html, options) {
  const re = /<%(.+?)%>/g
  const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g
  let code = 'with(obj) { var r=[];\n'
  let cursor = 0
  let result
  const add = function(line, js) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
      : (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')
    return add
  }
  let match = re.exec(html)
  while (match) {
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
    match = re.exec(html)
  }
  add(html.substr(cursor, html.length - cursor))
  code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ')
  try { result = new Function('obj', code).apply(options, [options]) } catch (err) { console.error("'" + err.message + "'", ' in \n\nCode:\n', code, '\n') }
  return result
}

export function heredoc(fn) {
  return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}

export function addNewStyle(id, src) {
  let styleElement = document.getElementById(id)

  if (!styleElement) {
    styleElement = document.createElement('link')
    styleElement.type = 'text/css'
    styleElement.rel = 'stylesheet'
    styleElement.href = src
    styleElement.id = id
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }
}

export const compactObject = (val) => {
  const data = Array.isArray(val) ? val.filter(n => n) : val
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key]
      if (value) { acc[key] = typeof value === 'object' ? compactObject(value) : value }
      return acc
    },
    Array.isArray(val) ? [] : {}
  )
}

export function copyToClipboard(value) {
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
