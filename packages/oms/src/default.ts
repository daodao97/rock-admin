import locale from 'element-plus/lib/locale/lang/zh-cn'
import { AxiosRequestConfig } from 'axios'
import { OmsOptions } from './types'
import { Settings } from './types'

const defaultAxios: AxiosRequestConfig = {
  // baseURL: '/api',
  withCredentials: true,
  timeout: 5000
}

export const defaultSettings: Settings = {
  title: 'OMS',
  fixedHeader: false,
  sidebarLogo: true,
  logo: 'https://gitee.com/daodao97/asset/raw/master/imgs/logo.png',
  closeNavNotice: false,
  navBarNotice: '顶部消息提示',
  hasNewMessage: true,
  showPageJsonSchema: true,
  loginTips: '登录信息提示',
  sso: [],
  ElementPlus: {
    size: 'mini',
    zIndex: 3000,
    locale: locale
  },
  nav: [],
  whiteRoutes: ['/login'],
  tokenExpire: 7 * 24 * 60 * 60 * 1000
}

export const defaultOptions: OmsOptions = {
  axios: defaultAxios,
  settings: defaultSettings,
  plugins: [],
  mock: false
}
