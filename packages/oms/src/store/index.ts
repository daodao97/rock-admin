import type { App } from 'vue'
import user, { user as userState } from './modules/user'
import settings, { settings as settingsState } from './modules/settings'
import app, { app as appState } from './modules/app'
import { ActionContext, createStore } from 'vuex'
import { RootState } from './types'
import { AxiosInstance } from 'axios'

const root: RootState = {
  http: undefined,
  user: userState,
  settings: settingsState,
  app: appState
}

const store = createStore<RootState>({
  state: root,
  getters: {
    http: state => state.http,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    remoteRouter: state => state.user.remoteRouter,
    customRouter: state => state.user.customRouter,
    nav: state => state.settings.nav
  },
  mutations: {
    setHttp(state: RootState, http: AxiosInstance) {
      state.http = http
    }
  },
  actions: {
    setHttp({ commit, state }: ActionContext<RootState, any>, http: AxiosInstance) {
      commit('setHttp', http)
    }
  },
  modules: {
    user,
    settings,
    app
  }
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export default store
