import Layout from '../layout/index.vue'
import Form from '../scaffold/form.vue'
import Container from '../scaffold/container.vue'
import Table from '../scaffold/table.vue'
import { RouteRecordRaw } from 'vue-router'

const PAGE_TYPE_CUSTOM = 0
const PAGE_TYPE_TABLE = 1
const PAGE_TYPE_FORM = 2
const PAGE_TYPE_CUSTOM_SCHEMA = 3

const base: RouteRecordRaw = {
  path: '/',
  component: Layout,
  children: []
}

interface remoteRoute {
    view: string,
    path: string,
    page_type: number,
    name: string,
    id: number,
    icon: string,
    is_show: boolean,
    page_schema: any,
    children: remoteRoute[]
}

const getComponent = (item: remoteRoute) => {
  if (item.view) {
    return () => {
      return new Promise((resolve) => {
        resolve(require('@/views/' + item.view))
      })
    }
  }
  console.log(2, item)
  if (item.path === '#') {
    return Container
  }
  switch (item.page_type) {
    case PAGE_TYPE_TABLE:
      return Table
    case PAGE_TYPE_FORM:
      return Form
    case PAGE_TYPE_CUSTOM:
      return () => {
        return new Promise((resolve) => {
          resolve(require('@/views/' + item.view))
        })
      }
    case PAGE_TYPE_CUSTOM_SCHEMA:
      return Container
  }
  return Container
}

function getPath(item: remoteRoute) {
  console.log(3, item)

  let path = item.path
  // :id 默认转换为数字型匹配模式
  if (path.indexOf(':id') > -1 && path.indexOf(':id') + 3 === path.length) {
    path = path.replace(':id', ':id(\\d+)')
  }
  return path === '#'
    ? '/DIR_' + item.name
    : path[0] !== '/'
      ? '/' + path
      : path
}

const transRoute = (item: remoteRoute): RouteRecordRaw => {
  console.log(1, item)
  const route: RouteRecordRaw = {
    path: getPath(item),
    name: item.path + item.name,
    component: getComponent(item),
    meta: {
      id: item.id,
      title: item.name,
      icon: item.icon,
      hidden: item.is_show !== undefined ? !item.is_show : false,
      pageSchema: item.page_schema || {}
    },
    children: item.children ? item.children.map(each => transRoute(each)) : []
  }
  if (route.children) {
    let allChildHidden = true
    route.children.forEach(each => {
      if (each.meta && !each.meta.hidden) {
        allChildHidden = false
      }
    })
    if (allChildHidden) {
      console.log(3, item)
      route.redirect = route.children[0].path
      route.path = '/DIR' + route.redirect.replaceAll('/', '_').toUpperCase()
    }
  }

  return route
}

interface mod {
    id: number,
    label: string,
    routes: remoteRoute[]
}

interface modRoute {
    id: number,
    label: string,
    routes: RouteRecordRaw[]
}

// FIXME
const createRoutes = (routesConfig: mod[]) => {
  let remoteRoutes: RouteRecordRaw[] = []
  const modules : modRoute[] = []
  routesConfig.forEach(item => {
    const routes = (item.routes || []).map(each => {
      return transRoute(each)
    })
    modules.push({
      id: item.id,
      label: item.label,
      routes: routes
    })
    remoteRoutes = remoteRoutes.concat(routes)
  })
  // @ts-ignore
  base.children = [].concat(base.children || [], remoteRoutes)
  return modules
}

export default createRoutes
