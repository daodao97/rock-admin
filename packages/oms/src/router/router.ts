import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../scaffold/dashboard.vue'
import NotFoundPage from '../scaffold/404.vue'
import Layout from '../scaffold/layout/index.vue'
import { OmsRouteMeta } from './types'
import Login from '../scaffold/Login.vue'

const NotFoundMeta: OmsRouteMeta = {
  menuType: 0
}

const NoteFoundRoute: RouteRecordRaw = {
  path: '/404',
  component: NotFoundPage,
  meta: NotFoundMeta,
  hidden: true
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'test',
      menuType: 1
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'el-icon-help', menuType: 2 }
      }
    ]
  },
  NoteFoundRoute,
  {
    path: '/login',
    component: Login,
    meta: { title: '用户登录', menuType: 0 },
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
