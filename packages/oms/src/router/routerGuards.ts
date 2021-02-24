import router from './index'
import store from '../store'
import Message from 'element-plus/lib/el-message'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '../utils/auth' // get token from cookie
import { getUrlKey } from '../utils'
import { cloneDeep } from 'lodash'
import { RouteRecordRaw } from 'vue-router'
import { Config } from '../store/modules/settings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist

const setPageTitle = function(matched : RouteRecordRaw []) {
  // @ts-ignore
  const settings: Config = store.state.settings
  let title = settings.title
  cloneDeep(matched).reverse().forEach((item, index) => {
    if (index < 2 && item.meta && item.meta.title) {
      title = item.meta.title + '-' + title
    }
  })
  document.title = title
}

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  setPageTitle(to.matched)
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo !== '') {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await store.dispatch('user/loadRemoteRouter', router)
          await store.dispatch('settings/loadLocalAdmin')
          await store.dispatch('settings/loadRemoteConfig')
          next(to)
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          // remove token and go to login page to re-login
          console.error(error)
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      const ticket = getUrlKey('code')
      if (ticket) {
        try {
          await store.dispatch('user/login', { ticket })
          next(`${to.path}`)
        } catch (e) {
          location.href = '/'
        }
      } else {
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  NProgress.done()
})
