import { createIFrame } from '../index'
import { strVarReplace } from '../string'

// @ts-ignore
export default function(options) {
// @ts-ignore
  this.elId = ''
  // @ts-ignore
  this.appid = ''
  // @ts-ignore
  this.agentid = ''
  // @ts-ignore
  this.redirect_uri = ''
  // @ts-ignore
  this.qrCodeUrl = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid={appid}&agentid={agentid}&redirect_uri={redirect_uri}&state={state}&login_type=jssdk&style={style}&href={href}'
  // @ts-ignore
  this.iframe = {}
  // @ts-ignore
  this.style = ''
  // @ts-ignore
  this.href = ''

  Object.keys(options).forEach(key => {
    // @ts-ignore
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      // @ts-ignore
      this[key] = options[key]
    }
  })

  // @ts-ignore
  this.getQrCodeUrl = () => {
    const data = {
      // @ts-ignore
      appid: this.appid,
      // @ts-ignore
      agentid: this.agentid,
      state: '',
      // @ts-ignore
      style: this.style,
      // @ts-ignore
      href: this.href,
      // @ts-ignore
      redirect_uri: encodeURIComponent(this.redirect_uri)
    }
    // @ts-ignore
    return strVarReplace(this.qrCodeUrl, data)
  }

  // @ts-ignore
  this.onScanSuccess = (event) => {
    const { origin, data } = event
    if (origin.indexOf('work.weixin.qq.com') > -1) {
      window.location.href = data
    }
  }

  // @ts-ignore
  this.run = () => {
    // @ts-ignore
    this.iframe.src = this.getQrCodeUrl()
    // @ts-ignore
    const d = createIFrame({ elId: this.elId, attrs: this.iframe })
    d.onload = () => {
      if (
      // @ts-ignore
        d.contentWindow.postMessage &&
                // @ts-ignore
                window.addEventListener !== undefined
      ) {
        window.addEventListener(
          'message',
          // @ts-ignore
          event => this.onScanSuccess(event),
          false
        )
      }
      // @ts-ignore
      d.contentWindow.postMessage('ask_usePostMessage', '*')
    }
  }
}
