import mock from './mock'
import system from './api/system'
import user from './api/user'

export const defaultMocksApi = [...system, ...user]

export function mockXHR(mockApis = [], baseURI = '') {
  mockApis.forEach(item => {
    mock(item.url, item.type, item.response, baseURI)
  })
}
