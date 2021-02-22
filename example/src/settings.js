export default {
  axios: {
    // baseURL: '/api123'
  },
  title: 'OMS',
  fixedHeader: false,
  sidebarLogo: true,
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
  closeNavNotice: false,
  navBarNotice: '顶部消息提示',
  loginTips: '账号 <em>admin</em> 密码 <em>a1a1a1</em>',
  hasNewMessage: true,
  showPageJsonSchema: true,
  sso: [
    {
      title: '钉钉',
      name: 'dingTalk',
      icon: 'dingding',
      appid: 'dingoa6vcnfd63yrl9cp7f',
      disable: false,
      style: 'border:none;background-color:unset;'
    },
    {
      title: '企微',
      name: 'wechat',
      icon: 'qiyeweixin',
      appid: 'ww32a7b1a9dcae1ab1',
      agentid: '1000002',
      disable: false,
      // 生成方式见 src/styles/wechat.css
      href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlew0KICBkaXNwbGF5OiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnN0YXR1c3sNCiAgY29sb3I6ICNmZmY7DQp9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICB3aWR0aDogMjAwcHg7DQp9'
    }
  ],
  nav: [
    {
      type: 'jump',
      text: '跳转',
      shape: 'icon',
      target: 'http://github.com/daodao97',
      props: {
        icon: 'ra-github1'
      }
    }
  ]
}
