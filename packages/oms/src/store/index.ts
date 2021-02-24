import settings from './modules/settings'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import { createStore } from 'vuex'

export default createStore({
  mutations: {},
  actions: {},
  getters,
  modules: {
    settings,
    app,
    user
  }
})
