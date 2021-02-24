import { GetterTree } from 'vuex'

const getters : GetterTree<any, String> = {
  config: state => state.app.config,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  remoteRouter: state => state.user.remoteRouter,
  customRouter: state => state.user.customRouter
}
export default getters
