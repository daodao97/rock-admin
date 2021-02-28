import { ActionContext, Module } from 'vuex'
import { RootState, User } from '../types'
import { LoginForm, LoginTicket, UserInfo, ResourceIds } from '../../types'
import { ApiResponse } from '../../utils/request/types'
import { getToken, setToken, removeToken } from '../../utils/token'
import { RemoteModule, Resource } from '../../types'
import { RouteRecordRaw } from 'vue-router'
import { merge } from 'lodash'

export const user: User = {
  name: '',
  avatar: 'https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg',
  token: getToken(),
  customRouter: [],
  remoteRouter: [],
  isLodeRemoteRoutes: false,
  resource: {}
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
            const resource: Resource = resourceTrans(response.payload?.resource || [])
            commit('updateState', { key: 'resource', value: resource })
            // Object.keys(response.payload || {}).forEach((key: string) => {
            // commit('updateState', { key: key, value: response.payload?[key] })
            // })
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
    loadRemoteRoutes({ state, rootState }: ActionContext<User, RootState>): Promise<RemoteModule[]> {
      return new Promise<RemoteModule[]>((resolve, reject) => {
        rootState.http?.request<RemoteModule, ApiResponse<RemoteModule[]>>({
          url: '/user/routes',
          method: 'get'
        }).then((response: ApiResponse<RemoteModule[]>) => {
          if (response.payload) {
            const resource: RemoteModule[] = response.payload || []
            resolve(resource)
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
