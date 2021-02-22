import Layout from '../layout/index.vue'
import Form from '../scaffold/form.vue'
import Container from '../scaffold/container.vue'
import Table from '../scaffold/table.vue'

const PAGE_TYPE_CUSTOM = 0
const PAGE_TYPE_TABLE = 1
const PAGE_TYPE_FORM = 2
const PAGE_TYPE_CUSTOM_SCHEMA = 3

const base = {
  path: '/',
  component: Layout,
  children: []
}

const getComponent = item => {
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
function getPath(item) {
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

const transRoute = item => {
  const route = {
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
    hidden: item.is_show !== undefined ? !item.is_show : false,
    children: item.children ? item.children.map(each => transRoute(each)) : []
  }
  if (route.children.length > 0) {
    let allChildHidden = true
    route.children.forEach(each => {
      if (!each.hidden) {
        allChildHidden = false
      }
    })
    if (allChildHidden) {
      route.redirect = route.children[0].path
      route.path = '/DIR' + route.redirect.replaceAll('/', '_').toUpperCase()
    }
  }

  return route
}

const createRoutes = routesConfig => {
  let remoteRoutes = []
  const modules = []
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
  base.children = [...base.children, ...remoteRoutes]
  return modules
}

export default createRoutes
