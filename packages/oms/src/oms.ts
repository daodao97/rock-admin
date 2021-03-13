import type { App } from 'vue'
import { createApp } from 'vue'
import AppComp from './App.vue'
import { startMock } from './mock'
import { instance } from './utils/request'
import { OmsOptions } from './types'
import { merge } from 'lodash'
import { defaultOptions } from './default'
import { createOmsPlugin, regPlugin } from './hook'
import store from './store'

import 'normalize.css/normalize.css'
import './styles/index.scss'
import router from './router'
import { isDevMode } from './utils/env'
import { AxiosInstance } from 'axios'

let http : any
export function useHttp():AxiosInstance {
  return http
}

export function createAdmin(omsOptions?: OmsOptions) {
  const options = merge(defaultOptions, omsOptions)
  const app: App = createApp(AppComp)
  const omsPlugin = createOmsPlugin(options)
  const plugins = options.plugins || []
  plugins.unshift(omsPlugin)
  plugins.forEach(item => {
    regPlugin(app, item)
  })
  if (options?.mock) {
    startMock()
  }
  http = instance(options.axios)
  store.dispatch('setHttp', http).then()
  app.config.globalProperties.$http = http
  if (isDevMode()) {
    window.App = app
  }
  router.isReady().then(() => app.mount('#app'))
}
