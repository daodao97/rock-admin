import { createIFrame } from '../index'
import { obj2Param } from '../url'
import { strVarReplace } from '../string'

export default function(options: Record<string, any>) {
  // @ts-ignore
  this.elId = ''
  // @ts-ignore
  this.appid = ''
  // @ts-ignore
  this.redirect_uri = ''
  // @ts-ignore
  this.style = ''
  // @ts-ignore
  this.qrCodeUrl = 'https://login.dingtalk.com/login/qrcode.htm?goto={goto}&style={style}'
  // @ts-ignore
  this.reloadUrl = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?response_type=code&scope=snsapi_login&state=&appid={appid}&redirect_uri={redirect_uri}'
  // @ts-ignore
  this.iframe = {}
  Object.keys(options).forEach(key => {
    // @ts-ignore
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      if (key === 'redirect_uri') {
        // @ts-ignore
        this[key] = options[key]
      } else {
        // @ts-ignore
        this[key] = options[key]
      }
    }
  })

  // @ts-ignore
  this.getQrCodeUrl = () => {
    const data = {
      // @ts-ignore
      goto: encodeURIComponent(this.getReloadUrl()),
      // @ts-ignore
      style: encodeURIComponent(this.style)
    }
    // @ts-ignore
    return strVarReplace(this.qrCodeUrl, data)
  }

  // @ts-ignore
  this.getReloadUrl = (extra) => {
    const data = {
      // @ts-ignore
      appid: this.appid,
      // @ts-ignore
      redirect_uri: encodeURIComponent(this.redirect_uri)
    }

    // @ts-ignore
    return strVarReplace(this.reloadUrl, data) + '&' + obj2Param(extra)
  }

  // @ts-ignore
  this.onScanSuccess = (event) => {
    const { origin, data } = event
    if (origin === 'https://login.dingtalk.com') {
      // @ts-ignore
      window.location.href = this.getReloadUrl({ loginTmpCode: data })
    }
  }

  // @ts-ignore
  this.run = () => {
    // @ts-ignore
    this.iframe.src = this.getQrCodeUrl()
    // @ts-ignore
    createIFrame({ elId: this.elId, attrs: this.iframe })
    // @ts-ignore
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener(
        'message',
        // @ts-ignore
        event => this.onScanSuccess(event),
        false
      )
      // @ts-ignore
    } else if (typeof window.attachEvent !== 'undefined') {
      // @ts-ignore
      window.attachEvent('onmessage', event => this.onScanSuccess(event))
    }
  }
}
