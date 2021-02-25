import { ActionContext, Module } from 'vuex'
import { RootState, User } from '../types'
import { LoginForm, LoginTicket, LoginResponse } from '../../types'
import { ApiResponse } from '../../utils/request/types'
import { getToken, setToken, removeToken } from '../../utils/token'
import { RemoteModule } from '../../types'
import { getObjectNodeByKeyTree } from '../../utils/object'
import { cloneDeep, merge } from 'lodash'

export const user: User = {
  name: '',
  avatar: 'https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg',
  token: getToken(),
  customRouter: [],
  remoteRouter: [],
  isLodeRemoteRoutes: false,
  resource: []
}

interface base {
    id: number,
    routes: any[],
    page_schema: Record<string, any>,
    children: any[]
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
          rootState.http.request<LoginResponse, ApiResponse<LoginResponse>>({
            url: '/login',
            method: 'POST',
            data: data
          }).then((response: ApiResponse<LoginResponse>) => {
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
    loadRemoteRoutes({ commit, state, rootState }: ActionContext<User, RootState>): Promise<RemoteModule[]> {
      return new Promise<RemoteModule[]>((resolve, reject) => {
        rootState.http?.request<RemoteModule, ApiResponse<RemoteModule[]>>({
          url: '/user/routes',
          method: 'get'
        }).then((response: ApiResponse<RemoteModule[]>) => {
          if (response.payload) {
            // todo 资源过滤
            resolve(response.payload)
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
