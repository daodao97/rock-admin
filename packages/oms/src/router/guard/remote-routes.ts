import { Router, RouteRecordRaw } from 'vue-router'
import store from '../../store'
import { RemoteModule, RouteModule } from '../../types'
import { transRemoteModules } from '../remote'
import Layout from '../../scaffold/layout/index.vue'

function isLodeRemoteRoutes(): boolean {
  return store.state.user.isLodeRemoteRoutes
}

export default function(router: Router) {
  router.beforeEach(async(to, form, next) => {
    if (isLodeRemoteRoutes()) {
      next()
      return
    }
    const remoteRoute: RemoteModule[] = await store.dispatch('user/loadRemoteRoutes')
    const routeModules: RouteModule[] = transRemoteModules(remoteRoute)
    routeModules.forEach(item => {
      item.routes.forEach(each => {
        router.addRoute({
          path: '/',
          component: Layout,
          children: [each]
        })
      })
    })
    router.addRoute({ path: '/:catchAll(.*)', redirect: '/404', hidden: true })
    store.commit('user/updateRemoteRouter', routeModules)
    await router.replace(to.path)
    next()
  })
}
