import { Router } from 'vue-router'
import store from '../../store'
import { getQueryParam } from '../../utils/url'

function getToken() {
  return store.state.user.token
}

function getWhiteRoutes() {
  return store.state.settings.whiteRoutes
}

export default function(router: Router) {
  router.beforeEach(async(to, form, next) => {
    const token = getToken()
    if (token) {
      next()
      return
    }
    if (getWhiteRoutes().indexOf(to.path) !== -1) {
      next()
      return
    }
    const code = getQueryParam('code')
    if (code) {
      store.dispatch('user/login', { ticket: code }).then(_ => {
        next()
      })
      return
    }
    next(`/login?redirect=${to.path}`)
  })
}
