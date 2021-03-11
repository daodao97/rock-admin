import { ActionContext, Module } from 'vuex'
import { RootState, strOrNum, User } from '../types'
import { LoginForm, LoginTicket, UserInfo, ResourceIds, RemoteModule, Resource, PageInfo } from '../../types'
import { ApiResponse } from '../../utils/request/types'
import { getToken, setToken, removeToken } from '../../utils/token'
import { getObjectNodeByKeyTree } from '../../utils/object'
import { RouteRecordRaw } from 'vue-router'
import { merge, cloneDeep } from 'lodash'

export const user: User = {
  name: '',
  avatar: 'https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg',
  token: getToken(),
  customRouter: [],
  remoteRouter: [],
  menuRoutes: [],
  isLodeRemoteRoutes: false,
  resource: {},
  roleIds: []
}

// [[1,2,3]] => {"$1":{"$2":{"$3":true}}} => {"1":{"2":{"3":true}}}
function resourceTrans(ids: ResourceIds): Resource {
  let resourceTree : Resource = {}
  ids.forEach(item => {
    let tpl = ''
    const len = item.length
    item.forEach((each, index) => {
      if (index < len - 1) {
        tpl += '{"{' + index + '}":'
      } else {
        tpl += '{"' + each + '":true}' + '}'.repeat(len - 1)
      }
    })
    resourceTree = merge(resourceTree, JSON.parse(tpl.format(...item)))
  })
  return resourceTree
}

function resourceFilter(fullResource: RemoteModule[], resourceTree: Resource, prefix: string): RemoteModule[] {
  console.log(fullResource, resourceTree, prefix)
  return cloneDeep(fullResource).filter((item) => {
    const key = (prefix ? prefix + '.' : '') + item.id
    const has = getObjectNodeByKeyTree(key, resourceTree)
    if (has === undefined) {
      return false
    }
    const next = item.routes
    if (next && next.length > 0) {
      item.routes = resourceRouteFilter(next, resourceTree, key)
      if (item.routes.length === 0) {
        return false
      }
    }

    return true
  })
}

function resourceRouteFilter(routes: PageInfo[], resourceTree: Resource, prefix: string): PageInfo[] {
  return routes.filter((item) => {
    const key = (prefix ? prefix + '.' : '') + item.id
    const has = getObjectNodeByKeyTree(key, resourceTree)
    if (has === undefined) {
      return false
    }
    if (item.children !== undefined && item.children.length > 0) {
      const next = item.children
      if (next && next.length > 0) {
        item.children = resourceRouteFilter(next, resourceTree, key)
        if (item.children.length === 0) {
          return false
        }
      }
    } else {
      item = filterPageInfo(item, resourceTree, prefix)
    }

    return true
  }).map((item) => filterPageInfo(item, resourceTree, prefix))
}

function filterPageInfo(item: PageInfo, resourceTree: Resource, prefix: string) : PageInfo {
  const key = (prefix ? prefix + '.' : '') + item.id
  const has = getObjectNodeByKeyTree(key, resourceTree)
  if (has === true) {
    return item
  }
  if (item.page_schema) {
    if (item.page_schema.filter) {
      item.page_schema.filter = item.page_schema.filter.filter((each: { field: string }) => {
        return !!getObjectNodeByKeyTree(key + '.filter.' + each.field, resourceTree)
      })
    }
    if (item.page_schema.headers) {
      item.page_schema.headers = item.page_schema.headers.filter((each: { field: string }) => {
        return !!getObjectNodeByKeyTree(key + '.headers.' + each.field, resourceTree)
      })
    }
    if (item.page_schema.formItems) {
      item.page_schema.formItems = item.page_schema.formItems.filter((each: { field: string }) => {
        return !!getObjectNodeByKeyTree(key + '.formItems.' + each.field, resourceTree)
      })
    }

    if (item.page_schema.saveApi) {
      const exist = getObjectNodeByKeyTree(key + '.saveApi', resourceTree)
      if (!exist) {
        item.page_schema.options = merge(item.page_schema.options || {}, { submitButton: false })
      }
    }
  }
  return item
}

const userModule: Module<User, any> = {
  namespaced: true,
  state: user,
  mutations: {
    updateToken(state: User, token: string) {
      state.token = token
      setToken(token)
    },
    removeToken(state: User) {
      state.token = ''
      removeToken()
    },
    updateRemoteRouter(state: User, routes: RemoteModule[]) {
      state.remoteRouter = routes
      state.isLodeRemoteRoutes = true
    },
    setCustomRoutes(state: User, routes: RouteRecordRaw[]) {
      state.customRouter = state.customRouter.concat(routes)
    },
    updateState<K extends keyof User>(state: User, { key, value } : {key: K, value: any}) {
      state[key] = value
    }
  },
  actions: {
    login({
      commit,
      state,
      rootState
    }: ActionContext<User, RootState>, data: LoginForm | LoginTicket): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        if (!rootState.http) {
          reject('http client not init')
        } else {
          rootState.http.request<UserInfo, ApiResponse<UserInfo>>({
            url: '/login',
            method: 'POST',
            data: data
          }).then((response: ApiResponse<UserInfo>) => {
            commit('updateToken', response.payload?.token)
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    logout({ commit }: ActionContext<User, RootState>) {
      commit('removeToken')
    },
    info({ commit, rootState }: ActionContext<User, RootState>) : Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        if (!rootState.http) {
          reject('http client not init')
        } else {
          rootState.http.request<UserInfo, ApiResponse<UserInfo>>({
            url: '/user/info',
            method: 'GET'
          }).then((response: ApiResponse<UserInfo>) => {
            const resource: Resource = resourceTrans(response.payload?.resource || [])
            const roleIds: strOrNum[] = response.payload?.role_ids || []
            commit('updateState', { key: 'resource', value: resource })
            commit('updateState', { key: 'roleIds', value: roleIds })
            resolve(true)
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    loadRemoteRoutes({ state, rootState }: ActionContext<User, RootState>): Promise<RemoteModule[]> {
      return new Promise<RemoteModule[]>((resolve, reject) => {
        rootState.http?.request<RemoteModule, ApiResponse<RemoteModule[]>>({
          url: '/user/routes',
          method: 'get'
        }).then((response: ApiResponse<RemoteModule[]>) => {
          if (response.payload) {
            const resource: RemoteModule[] = response.payload || []
            // 根据用户权限 user.resource 过滤
            const isSuper = rootState.user.roleIds.indexOf(1) > -1
            const userResource: RemoteModule[] = isSuper ? resource : resourceFilter(resource, rootState.user.resource, '')
            console.log(isSuper, userResource)
            resolve(userResource)
          } else {
            reject('error')
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default userModule
