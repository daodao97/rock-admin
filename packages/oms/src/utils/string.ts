import { getObjectNodeByKeyTree } from './object'

export const firstUpperCase = ([first, ...rest]: string[]) => first.toUpperCase() + rest.join('')

export function strVarReplace(str: string, obj: Record<string, any>) {
  const match = str.match(/{([\s\S]*?)}/g)
  if (!match) {
    return str
  }
  match.forEach(item => {
    let key
    key = item.replace('{', '')
    key = key.replace('}', '')
    str = str.replace(item, getObjectNodeByKeyTree(key, obj))
  })
  return str
}

export function camelToSnake(str: string, connector: string) {
  return str
    .split(/(?=[A-Z])/)
    .join(connector || '_')
    .toLowerCase()
}
