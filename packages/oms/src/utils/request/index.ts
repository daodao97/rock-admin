import axios, { AxiosRequestConfig } from 'axios'
import { defaultOptions } from '../../default'
import { merge } from 'lodash'
import { interceptors } from './interceptors'

export function instance(conf: AxiosRequestConfig = {}) {
  const defaultConf: AxiosRequestConfig = defaultOptions.axios || {}
  const c = merge(defaultConf, conf || {})
  const service = axios.create(c)

  interceptors.forEach(item => {
    service.interceptors.request.use(item.request.onFulfilled, item.request.onRejected)
    service.interceptors.response.use(item.response.onFulfilled, item.response.onRejected)
  })

  return service
}

export default instance()
