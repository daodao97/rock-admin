const sum: Handle<any> = (...arr) => [].concat(...arr).reduce((acc, val) => acc + val, 0)

interface Handle<T> {
    (data: T): any;
}

interface Pipe {
    handle: Record<string, Handle<any>>,
    registerHandel: (name: string, handle: Handle<any>) => void,
    execute: (sourceData: Record<string, any>, actions: string[]) => any
}

const pipe: Pipe = {
  handle: {
    sum: data => sum(data),
    avg: data => (sum(data) / data.length).toFixed(2),
    min: data => Math.min(...data),
    max: data => Math.max(...data)
  },
  registerHandel(name: string, handle: Handle<any>) {
    this.handle[name] = handle
  },
  execute: (sourceData: Record<string, any>, actions: string[]) => {
    let ret = sourceData
    for (const i in actions) {
      ret = pipe.handle[actions[i]](ret)
    }
    return ret
  }
}

export default pipe
