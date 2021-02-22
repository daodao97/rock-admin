import defaultOptions from '../../options'
import { instance } from '../../utils/request'

const state = defaultOptions.config

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    state[key] = value
  },
  MERGE_SETTING: (state, data) => {
    state = Object.assign(state, data)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  loadLocalAdmin({ commit }, data) {
    commit('MERGE_SETTING', data)
  },
  loadRemoteConfig({ commit, state }) {
    return new Promise((resolve, reject) => {
      instance(state.axios).request({
        url: '/system/config'
      })
        .then(res => {
          commit('MERGE_SETTING', res.payload)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
