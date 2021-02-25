const age = 30 * 24 * 60 * 60 * 1000

interface RelValue {
    _isObject: boolean,
    value: any,
    _age: number
}

const Cache = {
  set(key: string, value: any, ttl: number) {
    localStorage.removeItem(key)
    const isObject = value instanceof Object
    const _time = new Date().getTime()
    const _age = ttl || age

    // 如果不是对象，新建一个对象把 value 存起来
    if (!isObject) {
      const b = value
      value = {}
      value._value = b
    }
    // 加入时间
    value._time = _time
    // 过期时间
    value._age = _time + _age
    // 是否一个对象
    value._isObject = isObject
    localStorage.setItem(key, JSON.stringify(value))
    return this
  },
  exist(key: string) {
    return localStorage.getItem(key) !== null
  },
  isExpire(key: string) {
    let isExpire = true
    const value = localStorage.getItem(key)
    const now = new Date().getTime()

    if (value) {
      const realValue: RelValue = JSON.parse(value)
      // 当前时间是否大于过期时间
      isExpire = now > realValue._age
    } else {
      // 没有值也是过期
    }
    return isExpire
  },
  get(key: string) {
    const isExpire = this.isExpire(key)
    let value = null
    if (!isExpire) {
      value = localStorage.getItem(key)
      value = JSON.parse(value || '')
      if (!value._isObject) {
        value = value._value
      }
    } else {
      this.remove(key)
    }
    return value
  },
  remove(key: string) {
    return localStorage.removeItem(key)
  }
}

export default Cache
