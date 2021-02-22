import axios from 'axios'
import Message from 'element-plus/lib/el-message'
import MessageBox from 'element-plus/lib/el-message-box'
import store from '../store'
import { getToken } from './auth'

const defaultConf = {
  baseURL: '/', // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
}

export function instance(conf = {}) {
  // create an axios instance
  const service = axios.create(Object.assign(defaultConf, conf))

  // request interceptor
  service.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    },
    error => {
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      const res = response.data

      // if the custom code is not 20000, it is judged as an error.
      if (res.code !== 0) {
        if (res.code === 401) {
        // to re-login
          MessageBox.confirm(
            '登录状态获取失败, 您需重新登录才能方法当前页面',
            '',
            {
              confirmButtonText: '重新登录',
              type: 'warning',
              duration: 0,
              closeOnClickModal: false,
              showCancelButton: false,
              showClose: false
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          return Promise.reject('token expire')
        } else {
          Message({
            message: res.message || 'api error code:' + (res.code),
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(res.message || 'error')
        }
      } else {
        return res
      }
    },
    error => {
      Message({
        message: `${error.message} @ ${error.config.method}::${error.config.baseURL}${error.config.url}`,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )

  return service
}

export default instance()
