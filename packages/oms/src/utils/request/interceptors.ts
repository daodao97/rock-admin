import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import store from '../../store'
import { InterceptorUse, Interceptor } from './types'
import Message from 'element-plus/lib/el-message'

const baseRequestInterceptor: InterceptorUse<AxiosRequestConfig, AxiosError> = {
  onFulfilled: function(config: AxiosRequestConfig) {
    const token = store
    if (token) {
      config.headers['Authorization'] = token
    }
    config.headers['X-Test'] = 1
    return config
  }
}

const baseResponseInterceptor: InterceptorUse<AxiosResponse, AxiosError> = {
  onFulfilled: function(response: AxiosResponse) {
    return response.data
  },
  onRejected(error: AxiosError) {
    Message({
      message: `${error.message} ${error.config.method}::${error.config.baseURL}${error.config.url}`,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
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
