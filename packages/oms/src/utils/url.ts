export function queryParams(str: string) {
  const queryString = str.indexOf('?') !== -1 ? str.slice(str.indexOf('?') + 1) : (str.indexOf('/') !== -1 ? '' : str)
  const pairs = queryString.split('&')
  const result: Record<string, any> = {}
  pairs.forEach(function(pair) {
    const [key, val] = pair.split('=')
    result[key] = decodeURIComponent(val || '')
  })
  return JSON.parse(JSON.stringify(result))
}

export function getQueryParam(name: string): string | null {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || ['', ''])[1].replace(/\+/g, '%20')
    ) || null
  )
}

export function setUrlParams(obj: Record<string, string>) {
  const qs = new URLSearchParams(obj)
  let hash = location.hash
  const index = hash.indexOf('?')
  if (index !== -1) {
    hash = hash.substring(0, index)
  }
  const url = location.pathname + hash + (qs.toString() ? '?' + qs.toString() : '')
  history.pushState({ url: url, title: document.title }, document.title, url)
}

export function obj2Param(obj: Record<string, any>) {
  const params: string[] = []
  Object.keys(obj || {}).forEach(key => {
    params.push(
      encodeURIComponent(key) +
            '=' +
            encodeURIComponent(obj[key] == null ? '' : obj[key])
    )
  })
  return params.join('&')
}
