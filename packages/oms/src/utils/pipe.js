const sum = (...arr) => [].concat(...arr).reduce((acc, val) => acc + val, 0)

const pipe = {
  handle: {
    sum: data => sum(data),
    avg: data => (sum(data) / data.length).toFixed(2),
    min: data => Math.min(...data),
    max: data => Math.max(...data)
  },
  registerHandel(name, handle) {
    this.handle[name] = handle
  },
  execute: (sourceData, actions) => {
    let ret = sourceData
    for (const i in actions) {
      ret = pipe.handle[actions[i]](ret)
    }
    return ret
  }
}

export default pipe
