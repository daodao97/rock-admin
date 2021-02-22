import { createStore } from 'vuex'
import settings from './modules/settings'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    settings,
    app,
    user
  }
})
