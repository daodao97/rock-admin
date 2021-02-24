import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import defaultOptions from './options'
import _ from 'lodash'
import VIcon from './components/VIcon'
import { defaultMocksApi, mockXHR } from './mock'
import ElementPlus from './plugin/elementPlus'
import eventBus from './plugin/eventBus'
const components = { VIcon }
import * as directives from './directive'
import { instance } from './utils/request'
import { isObject } from './utils'

import 'normalize.css/normalize.css'
import './styles/index.scss'
import { OmsOptions, Plugin } from './types/system'
import { Component, Directive } from '@vue/runtime-core'
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

const app = createApp(App)

function regComponents(components: Record<string, Component> = {}) {
  Object.keys(components).forEach((item: string) => {
    app.component(item, components[item])
  })
}

function regRoutes(routes: RouteRecordRaw[] = []) {
  routes.forEach(item => {
    router.addRoute(item)
  })
  store.dispatch('user/setCustomRoutes', routes)
}

function regUse(use: any[]) {
  use.forEach(item => {
    if (isObject(item)) {
      item = [item]
    }
    // @ts-ignore
    app.use(...item)
  })
}

function regDirective(directives: Record<string, Directive> = {}) {
  Object.keys(directives).forEach(item => {
    app.directive(item, directives[item])
  })
}

function regStoreModule(modules: Record<string, Module<any, any>> = {}) {
  const keepModuleNames = ['app', 'settings', 'user']
  Object.keys(modules).forEach(item => {
    if (keepModuleNames.indexOf(item) !== -1) {
      console.warn(`storeModule name [${item}] is use by base, please change it!`)
      return
    }
    store.registerModule(item, modules[item])
  })
}

export default function(options: OmsOptions = {}) {
  options = _.merge(defaultOptions, options)
  // 同步基础 config 到 store
  store.dispatch('app/setConfig', { nav: options.config?.nav || [] })
  store.dispatch('settings/loadLocalAdmin', options.config)

  options.plugins = options.plugins || []

  const oms: Plugin = {
    components: components,
    directives: directives,
    use: [
      store, router,
      [ElementPlus, options.config?.ElementPlus],
      eventBus
    ],
    mockApis: options.mock?.defaultMockApi ? defaultMocksApi : []
  }

  options.plugins.unshift(oms)

  options.plugins.forEach((item: Plugin) => {
    regComponents(item.components || {})
    regRoutes(item.routes || [])
    regUse(item.use || [])
    regDirective(item.directives || {})
    regStoreModule(item.storeModules || {})
    if (options.mock?.enable) {
      mockXHR(item.mockApis || [], options.mock.baseURI)
    }
  })

  // app.config.devtools = true
  app.config.globalProperties.$http = instance(options.config?.axios)

  router.isReady().then(() => app.mount('#app'))
}
