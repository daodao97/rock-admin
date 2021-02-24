import mock from './mock'
import system from './api/system'
import user from './api/user'

export interface ResponseFuc {
    (options: { type: any; url: any; params: any }): object;
}

export interface api {
    type: string,
    url: string | RegExp,
    response: ResponseFuc
}

export const defaultMocksApi = [...system, ...user]

export function mockXHR(mockApis: api[] = [], baseURI = '') {
  mockApis.forEach(item => {
    mock(item.url, item.type, item.response, baseURI)
  })
}
