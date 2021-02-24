import Mock from 'mockjs'
import formatOptions from './formatOptions'
import { ResponseFuc } from './index'

export default function(url: string | RegExp, method: string, resFunc: ResponseFuc, baseURI: any) {
  if (arguments.length === 1) {
    return Mock.mock(url)
  }
  if (arguments.length === 2) {
    console.error(
      `[${url}] Function Mock.mock require three params: url, method, resFunc!!!`
    )
    return
  }
  if (arguments.length === 3) {
    const methods = ['get', 'post', 'put', 'delete']
    if (!methods.includes(method.toLowerCase())) {
      console.error(
        `[${url}] Function Mock.mock's second param should be get, post, put, delete!!!`
      )
      return
    }
    if (typeof resFunc !== 'function') {
      console.error(`[${url}] Function Mock.mock's third param should be a function!!!`)
      return
    }
  }
  // 将注册的 url 转成能匹配查询字符串的正则
  if (typeof url === 'string') {
    url = url.replace(/\//g, '\\/')
    url += '(|\\?.*)$'
    url = new RegExp(baseURI + url)
  }
  Mock.mock(url, method, function(options: any) {
    // 格式化 options 对象
    options = formatOptions(options)
    let res = null
    try {
      res = resFunc(options)
    } catch (err) {
      res = err
    }

    const response = Mock.mock(res)
    // 将返回的测试数据打印到控制台
    console.groupCollapsed(
      `%c${options.type.toLowerCase()} | ${options.url}`,
      'color: green;'
    )
    console.log('%cparams: ', 'color: #38f')
    console.log(options.params)
    console.log('%cresponseData: ', 'color: #38f')
    console.log(response)
    console.groupEnd()
    console.log('---------------')
    return response
  })
}
