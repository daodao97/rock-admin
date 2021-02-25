import { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '../../store'
import { InterceptorUse, Interceptor } from './types'

const baseRequestInterceptor: InterceptorUse<AxiosRequestConfig> = {
  onFulfilled: function(config: AxiosRequestConfig) {
    const token = store
    if (token) {
      config.headers['Authorization'] = token
    }
    config.headers['X-Test'] = 1
    return config
  }
}

const baseResponseInterceptor: InterceptorUse<AxiosResponse> = {
  onFulfilled: function(response: AxiosResponse) {
    return response.data
  }
}

export const interceptors: Interceptor[] = [
  {
    request: baseRequestInterceptor,
    response: baseResponseInterceptor
  }
]

export function addInterceptor(newInterceptor: Interceptor) {
  interceptors.push(newInterceptor)
}
