const age = 30 * 24 * 60 * 60 * 1000

const Cache = {
  set(key, value, ttl) {
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
  exist(key) {
    return localStorage.getItem(key) !== null
  },
  isExpire(key) {
    let isExpire = true
    let value = localStorage.getItem(key)
    const now = new Date().getTime()

    if (value) {
      value = JSON.parse(value)
      // 当前时间是否大于过期时间
      isExpire = now > value._age
    } else {
      // 没有值也是过期
    }
    return isExpire
  },
  get(key) {
    const isExpire = this.isExpire(key)
    let value = null
    if (!isExpire) {
      value = localStorage.getItem(key)
      value = JSON.parse(value)
      if (!value._isObject) {
        value = value._value
      }
    } else {
      this.remove(key)
    }
    return value
  },
  remove(key) {
    return localStorage.removeItem(key)
  }
}

export default Cache
