import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../scaffold/dashboard.vue'
import NotFoundPage from '../scaffold/404.vue'
import Layout from '../scaffold/layout/index.vue'
import { OmsRouteMeta } from './types'
import Login from '../scaffold/Login.vue'

const NotFoundMeta: OmsRouteMeta = {
  hidden: true
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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'el-icon-help', hidden: false }
      }
    ]
  },
  NoteFoundRoute,
  {
    path: '/login',
    component: Login,
    meta: { title: '用户登录', hidden: true },
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
