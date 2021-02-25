import Cookies from 'js-cookie'
import store from '../store'

const TokenKey = 'oms:token'

export function getToken(): string {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string) {
  const expires = new Date(new Date().getTime() + (store.state.settings.tokenExpire || 24 * 60 * 60 * 1000))
  return Cookies.set(TokenKey, token, { expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
