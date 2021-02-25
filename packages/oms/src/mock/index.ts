import Mock from 'mockjs'
import { MockApi, MockApiMap } from './types'
import apis from './apis'
import { logGroup } from '../utils/log'
import { defaultOptions } from '../default'
import { queryParams } from '../utils/url'

const uniqueApis: MockApiMap = {}

export function regMockApis(apis: MockApi[]) {
  apis.forEach(item => {
    const key = realUrl(item)
    uniqueApis[`${item.method}::${key}`] = item
  })
}

regMockApis(apis)

function realUrl(api: MockApi) {
  let url = api.url
  let baseUrl = api.baseURL || defaultOptions.axios?.baseURL
  if (!baseUrl) {
    baseUrl = ''
  }
  if (typeof url === 'string') {
    url = ('/' + baseUrl + url).split('/').filter(v => v).join('/')
    url += '(|\\?.*)$'
    return new RegExp(url)
  }
  return url
}

export function startMock() {
  Object.keys(uniqueApis).forEach(k => {
    const api = uniqueApis[k]
    const url = realUrl(api)
    Mock.mock(url, api.method, function(options: { url: string, body: any, type: string }) {
      const { url, type, body } = options
      const query = queryParams(url)
      const data = body ? JSON.parse(body) : {}
      const mock = api.response({ query, data })
      const response = Mock.mock(mock)
      logGroup(url, { type, query, data, response })
      return Mock.mock(response)
    })
  })
  console.log(`%c ApiMock is stared! `, 'background: #606060; color: #fff; padding: 4px 5px; border-radius: 1px;')
}
