import defaultOptions from '../../options'
import { instance } from '../../utils/request'
import { ActionContext, Module } from 'vuex'
import { InstallOptions } from 'element-plus/es/utils/config'
import { AxiosResponse } from 'axios'

interface Axios {
    baseURL: string
}
export interface Config {
    title: string,
    fixedHeader: boolean,
    sidebarLogo: boolean,
    logo: string,
    closeNavNotice: boolean,
    navBarNotice: string,
    hasNewMessage: boolean,
    showPageJsonSchema: boolean,
    loginTips: string,
    sso: any[],
    axios: Axios,
    ElementPlus: InstallOptions,
    nav: any[]
}

const state : Config = defaultOptions.config

const mutations = {
  CHANGE_SETTING: (state: Config, { key, value } : {key: string, value: any}) => {
    // @ts-ignore
    state[key] = value
  },
  MERGE_SETTING: (state: Config, data: Config) => {
    state = Object.assign(state, data)
  }
}

interface ResponseData {
    code: number,
    payload: Config
}

const actions = {
  changeSetting({ commit }: ActionContext<Config, Config>, data: Config) {
    commit('CHANGE_SETTING', data)
  },
  loadLocalAdmin({ commit }: ActionContext<Config, Config>, data : Config) {
    commit('MERGE_SETTING', data)
  },
  loadRemoteConfig({ commit, state }: ActionContext<Config, Config>) {
    return new Promise<void>((resolve, reject) => {
      instance(state.axios).request({
        url: '/system/config'
      })
        .then((res: AxiosResponse<ResponseData>) => {
          // FIXME
          console.log(213, res)
          commit('MERGE_SETTING', res.data.payload)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

const setting : Module<Config, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default setting
