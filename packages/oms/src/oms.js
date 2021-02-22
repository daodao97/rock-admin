import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import defaultOptions from './options'
import _ from 'lodash'
import VIcon from './components/VIcon.jsx'
import { defaultMocksApi, mockXHR } from './mock'
import ElementPlus from './plugin/elementPlus'
import eventBus from './plugin/eventBus'
const components = [VIcon]
import * as directives from './directive'
import { instance } from './utils/request'
import { isObject } from './utils'

import 'normalize.css/normalize.css'
import './styles/index.scss'

const app = createApp(App)

function regComponents(components = []) {
  components.forEach(item => {
    app.component(item.name, item)
  })
}

function regRoutes(routes = []) {
  routes.forEach(item => {
    router.addRoute(item)
  })
  store.dispatch('user/setCustomRoutes', routes)
}

function regUse(use) {
  use.forEach(item => {
    if (isObject(item)) {
      item = [item]
    }
    app.use(...item)
  })
}

function regDirective(directives = {}) {
  Object.keys(directives).forEach(item => {
    app.directive(item, directives[item])
  })
}

export default function(options = {}) {
  options = _.merge(defaultOptions, options)
  // 同步基础 config 到 store
  store.dispatch('app/setConfig', { nav: options.config.nav })
  store.dispatch('settings/loadLocalAdmin', options.config)

  options.plugins.unshift({
    components: components,
    directives: directives,
    use: [
      store, router,
      [ElementPlus, options.config.ElementPlus],
      eventBus
    ],
    mockApis: options.mock.defaultMockApi ? defaultMocksApi : []
  })

  options.plugins.forEach(item => {
    console.log(item)
    regComponents(item.components || [])
    regRoutes(item.routes || [])
    regUse(item.use || [])
    if (options.mock.enable) {
      mockXHR(item.mockApis || [], options.mock.baseURI)
    }
    regDirective(item.directives || {})
  })

  app.config.devtools = true
  app.config.globalProperties.$http = instance(options.config.axios)

  router.isReady().then(() => app.mount('#app'))
}
