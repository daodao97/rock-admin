## 启动配置项

默认配置可见 [src/options](https://github.com/daodao97/oms/blob/master/src/options.js)

```javascript
{
  ElementPlus: {
    size: 'small',
    zIndex: 3000,
    locale: locale
  },
  nav: [],
  routes: [],
  globalComps: [],
  mock: { enable: false, apis: [], baseURI: '', defaultMockApi: true },
  use: [],
  config: {
    title: 'OMS',
    fixedHeader: false,
    sidebarLogo: true,
    logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
    closeNavNotice: false,
    navBarNotice: '顶部消息提示',
    hasNewMessage: true,
    showPageJsonSchema: true,
    loginTips: '登录信息提示',
    sso: [],
    axios: {
      baseURL: '/api'
    }
  }
}
```

- `ElementPlus` 为 `element-plus` 默认配置, [文档](https://element-plus.gitee.io/#/quan-ju-pei-zhi)
- `nav` 为 页面顶部导航按钮,
- `routes` 为 本地 `vue-router` 路由
- `globalComps` 为 注册到全局的组件
- `mock` 为 `api` 模拟数据配置
    - `enable` 是否启用 `mock`
    - `apis` 需要注入的本地模拟接口
    - `defaultMockApi` 是否启动底层的模拟接口
- `use` 底层为 `app.use`
- `config` 为站点配置
    - `title` 站点名称
    - `fixedHeader` 顶部导航栏装态
    - `sidebarLogo` 是否显示logo
    - `logo` 项目 logo图片地址
    - `navBarNotice` 项目打开的消息提示
    - `showPageJsonSchema` 是否显示页面的配置
    - `loginTips` 登录页面提交表单的提示文字
    - `sso` 企业微信和钉钉的登录配置
    - `axios` axios 的配置
