import { strVarReplace, obj2Param, createIFrame } from '../index'

export default function(options) {
  this.elId = ''
  this.appid = ''
  this.redirect_uri = ''
  this.style = ''
  this.qrCodeUrl = 'https://login.dingtalk.com/login/qrcode.htm?goto={goto}&style={style}'
  this.reloadUrl = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?response_type=code&scope=snsapi_login&state=&appid={appid}&redirect_uri={redirect_uri}'
  this.iframe = {}
  Object.keys(options).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      if (key === 'redirect_uri') {
        this[key] = options[key]
      } else {
        this[key] = options[key]
      }
    }
  })

  this.getQrCodeUrl = () => {
    const data = {
      goto: encodeURIComponent(this.getReloadUrl()),
      style: encodeURIComponent(this.style)
    }
    return strVarReplace(this.qrCodeUrl, data)
  }

  this.getReloadUrl = (extra) => {
    const data = {
      appid: this.appid,
      redirect_uri: encodeURIComponent(this.redirect_uri)
    }

    return strVarReplace(this.reloadUrl, data) + '&' + obj2Param(extra)
  }

  this.onScanSuccess = (event) => {
    const { origin, data } = event
    if (origin === 'https://login.dingtalk.com') {
      window.location.href = this.getReloadUrl({ loginTmpCode: data })
    }
  }

  this.run = () => {
    this.iframe.src = this.getQrCodeUrl()
    createIFrame({ elId: this.elId, attrs: this.iframe })
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener(
        'message',
        event => this.onScanSuccess(event),
        false
      )
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', event => this.onScanSuccess(event))
    }
  }
}
