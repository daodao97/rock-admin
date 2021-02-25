export function getObjectNodeByKeyTree(keyTree: string, object: Record<string, any>, defaultVal?: any) {
  const keys = keyTree.split('.')
  let val = Object.assign({}, object)
  for (let i = 0; i < keys.length; i++) {
    val = val[keys[i]]
    if (val === undefined || val === null) {
      return defaultVal
    }
  }
  return val
}
