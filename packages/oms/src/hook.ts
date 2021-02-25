import { OmsOptions, OmsPlugin } from './types'
import store from './store'
import router from './router'
import ElementPlus from './plugins/element-plus'
import { Component, Directive } from '@vue/runtime-core'
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { isObject } from './utils/type'
import { regMockApis } from './mock'
import VIcon from './components/VIcon'
import * as directives from './directive'

function regComponents(app: App, components: Record<string, Component> = {}) {
  Object.keys(components).forEach((item: string) => {
    app.component(item, components[item])
  })
}

function regRoutes(routes: RouteRecordRaw[] = []) {
  routes.forEach(item => {
    router.addRoute(item)
  })
  // store.dispatch('user/setCustomRoutes', routes)
}

function regUse(app: App, use: any[]) {
  use.forEach(item => {
    if (isObject(item)) {
      item = [item]
    }
    // @ts-ignore
    app.use(...item)
  })
}

function regDirective(app: App, directives: Record<string, Directive> = {}) {
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

export function createOmsPlugin(options: OmsOptions): OmsPlugin {
  return {
    components: { VIcon },
    directives: directives,
    use: [
      store, router,
      [ElementPlus, options.settings?.ElementPlus]
    ]
  }
}

export function regPlugin(app: App, plugin: OmsPlugin) {
  regComponents(app, plugin.components || {})
  regRoutes(plugin.routes || [])
  regUse(app, plugin.use || [])
  regDirective(app, plugin.directives || {})
  regStoreModule(plugin.storeModules || {})
  regMockApis(plugin.mockApis || [])
}
