import Cookies from 'js-cookie'
import type { ActionContext, Module } from 'vuex'

interface Sidebar {
    opened: boolean,
    withoutAnimation: boolean
}

export interface State {
    sidebar: Sidebar,
    device: string,
    pages: Object,
    config: Object
}

interface schema {
    page: string
    json: Object
}

const state : State = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  pages: {},
  config: {}
}

const mutations = {
  TOGGLE_SIDEBAR: (state: State) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state: State, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: State, device: string) => {
    state.device = device
  },
  SET_PAGE_JSON_SCHEMA: (state: State, { page, json } : schema) => {
    // @ts-ignore
    state.pages[page] = json
  },
  SET_CONFIG: (state : State, data: Object) => {
    state.config = data
  }
}

const actions = {
  toggleSideBar({ commit } : ActionContext<State, State>) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit } : ActionContext<State, State>, { withoutAnimation }: Sidebar) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit } : ActionContext<State, State>, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
  setPageJsonSchema({ commit } : ActionContext<State, State>, data: schema) {
    commit('SET_PAGE_JSON_SCHEMA', data)
  },
  setConfig({ commit } : ActionContext<State, State>, data: Object) {
    commit('SET_CONFIG', data)
  }
}

const app : Module<State, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default app

