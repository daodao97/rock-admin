import { strVarReplace, createIFrame } from '../index'

export default function(options) {
  this.elId = ''
  this.appid = ''
  this.agentid = ''
  this.redirect_uri = ''
  this.qrCodeUrl = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid={appid}&agentid={agentid}&redirect_uri={redirect_uri}&state={state}&login_type=jssdk&style={style}&href={href}'
  this.iframe = {}
  this.style = ''
  this.href = ''

  Object.keys(options).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      this[key] = options[key]
    }
  })

  this.getQrCodeUrl = () => {
    const data = {
      appid: this.appid,
      agentid: this.agentid,
      state: '',
      style: this.style,
      href: this.href,
      redirect_uri: encodeURIComponent(this.redirect_uri)
    }
    return strVarReplace(this.qrCodeUrl, data)
  }

  this.onScanSuccess = (event) => {
    const { origin, data } = event
    if (origin.indexOf('work.weixin.qq.com') > -1) {
      window.location.href = data
    }
  }

  this.run = () => {
    this.iframe.src = this.getQrCodeUrl()
    const d = createIFrame({ elId: this.elId, attrs: this.iframe })
    d.onload = () => {
      if (
        d.contentWindow.postMessage &&
        window.addEventListener !== undefined
      ) {
        window.addEventListener(
          'message',
          event => this.onScanSuccess(event),
          false
        )
      }
      d.contentWindow.postMessage('ask_usePostMessage', '*')
    }
  }
}
