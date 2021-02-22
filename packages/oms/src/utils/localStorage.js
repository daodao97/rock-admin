/**
 * 目前对象值如果是函数 、RegExp等特殊对象存贮会被忽略
 * @param { String } key  属性
 * @param { string } value 值
 */
const set = (key, value) => {
  if (typeof value === 'object') value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

/**
 * @param {String} key  属性
 */
const get = key => {
  return localStorage.getItem(key)
}

/**
 * @param {String} key  属性
 */
const remove = key => {
  localStorage.removeItem(key)
}

/**
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param { number } expire 过期时间,毫秒数
 */
const setExpire = (key, value, expire) => {
  if (typeof value === 'object') value = JSON.stringify(value)
  localStorage.setItem(key, value)
  setTimeout(() => {
    localStorage.removeItem(key)
  }, expire)
}

export default {
  set,
  get,
  remove,
  setExpire
}
