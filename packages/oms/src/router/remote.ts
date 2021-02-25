import Form from '../scaffold/form.vue'
import Container from '../scaffold/container.vue'
import Table from '../scaffold/table.vue'
import {RouteRecordRaw} from 'vue-router'
import {PageType, RemoteModule, RemoteRoute, RouteModule} from '../types'
import {Component} from '@vue/runtime-core'

const getComponent = (item: RemoteRoute): Component => {
  if (item.view) {
    return () => {
      return new Promise((resolve) => {
        resolve(require('@/views/' + item.view))
      })
    }
  }
  if (item.path === '#') {
    return Container
  }
  switch (item.page_type) {
    case PageType.list:
      return Table
    case PageType.form:
      // @ts-ignore
      return Form
    case PageType.custom:
      return () => {
        return new Promise((resolve) => {
          resolve(require('@/views/' + item.view))
        })
      }
    case PageType.customSchema:
      return Container
  }
  return Container
}

function getPath(item: RemoteRoute) {
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

const transRoute = (item: RemoteRoute): RouteRecordRaw => {
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
    if (route.children.length > 0 && allChildHidden) {
      route.redirect = route.children[0].path
      route.path = '/DIR' + route.redirect.replaceAll('/', '_').toUpperCase()
    }
  }

  return route
}

export const transRemoteModules = (data: RemoteModule[]): RouteModule[] => {
  const vueRouteModule: RouteModule[] = []
  data.forEach(item => {
    const m: RouteModule = {
      id: item.id,
      label: item.label,
      routes: []
    }
    item.routes.forEach(each => {
      m.routes.push(transRoute(each))
    })
    vueRouteModule.push(m)
  })

  return vueRouteModule
}
