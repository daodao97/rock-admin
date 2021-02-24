import qs from 'qs'

export interface mockOptions {
    type: string,
    url: string,
    params?: object | undefined,
    body?: string
}

export default function formatOptions(options: mockOptions) {
  const { url, type, body } = options
  let params : object
  if (type === 'GET' || type === 'DELETE') {
    const index = url.indexOf('?')
    const paramsString = index > -1 ? url.slice(index + 1) : ''
    console.log(options, index, paramsString)
    if (paramsString !== '') {
      params = qs.parse(paramsString)
    }
  }
  if (body) {
    params = JSON.parse(body)
  }
  // @ts-ignore
  if (params && Object.keys(params).length === 0) {
    // @ts-ignore
    params = undefined
  }
  // @ts-ignore
  return { url, type, params }
}
