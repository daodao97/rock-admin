import { instance } from '../utils/request'

export function login(data, conf) {
  return instance(conf).request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token, conf) {
  return instance(conf).request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(conf) {
  return instance(conf).request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getRoutes(conf) {
  return instance(conf).request({
    url: '/user/routes',
    method: 'get'
  })
}
