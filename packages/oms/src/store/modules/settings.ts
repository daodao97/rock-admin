import { ActionContext, Module } from 'vuex'
import { Settings } from '../../types'
import { defaultSettings } from '../../default'
import { cloneDeep, merge } from 'lodash'

export const settings: Settings = cloneDeep(defaultSettings)

const settingsModule: Module<Settings, any> = {
  namespaced: true,
  state: settings,
  mutations: {
    updateSettings(state: Settings, newSettings: Settings) {
      state = merge(state, newSettings)
    }
  },
  actions: {
    loadRemoteConfig({ commit, state }: ActionContext<Settings, any>, remoteConfig: Settings) {
      commit('updateSettings', remoteConfig)
    }
  }
}

export default settingsModule
