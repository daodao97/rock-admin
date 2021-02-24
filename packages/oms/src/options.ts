import locale from 'element-plus/lib/locale/lang/zh-cn'

export default {
  mock: { enable: false, baseURI: '', defaultMockApi: true },
  config: {
    title: 'OMS',
    fixedHeader: false,
    sidebarLogo: true,
    logo: 'https://gitee.com/daodao97/asset/raw/master/imgs/logo.png',
    closeNavNotice: false,
    navBarNotice: '顶部消息提示',
    hasNewMessage: true,
    showPageJsonSchema: true,
    loginTips: '登录信息提示',
    sso: [],
    axios: {
      baseURL: '/api'
    },
    ElementPlus: {
      size: 'mini',
      zIndex: 3000,
      locale: locale
    },
    nav: []
  },
  plugins: [
    {
      use: [],
      components: [],
      directives: {},
      mockApis: [],
      routes: [],
      storeModules: {}
    }
  ]
}
