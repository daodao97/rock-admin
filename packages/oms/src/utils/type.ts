export function type(target: any) {
  const ret = typeof target
  const template: Record<string, string> = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number - object',
    '[object Boolean]': 'boolean - object',
    '[object String]': 'string-object'
  }

  if (target === null) {
    return 'null'
  } else if (ret === 'object') {
    const str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    return ret
  }
}

export function isArray(arg: any) {
  return type(arg) === 'array'
}

export function isObject(arg: any) {
  return type(arg) === 'object'
}

export function isFunc(arg: any) {
  return type(arg) === 'function'
}

export function isBool(arg: any) {
  return type(arg) === 'boolean'
}

export function isNumber(arg: any) {
  return type(arg) === 'number'
}

export function isString(arg: any) {
  return type(arg) === 'string'
}

export function parseBool(value: any) {
  if (isBool(value)) {
    return value
  }
  if (isNumber(value)) {
    return value > 0
  }
  if (isString(value)) {
    return value === 'true'
  }
  return !!value
}
