import { ActionContext, Module } from 'vuex'
import { merge } from 'lodash'
import { App, PageSchema, Sidebar } from '../types'
import Cookies from 'js-cookie'

export const app: App = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const _module: Module<App, any> = {
  namespaced: true,
  state: app,
  mutations: {
    TOGGLE_SIDEBAR: (state: App) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    CLOSE_SIDEBAR: (state: App, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', '0')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: App, device: string) => {
      state.device = device
    },
    SET_PAGE_JSON_SCHEMA: (state: App, { page, json }: PageSchema) => {
      // @ts-ignore
      state.pages[page] = json
    }
  },
  actions: {
    toggleSideBar({ commit }: ActionContext<App, App>) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: ActionContext<App, App>, { withoutAnimation }: Sidebar) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: ActionContext<App, App>, device: string) {
      commit('TOGGLE_DEVICE', device)
    },
    setPageJsonSchema({ commit }: ActionContext<App, App>, data: PageSchema) {
      commit('SET_PAGE_JSON_SCHEMA', data)
    }
  }
}

export default _module
