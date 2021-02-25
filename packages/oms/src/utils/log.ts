export function logGroup(title: string, options: Record<string, any>) {
  console.groupCollapsed(
    `%c${title}`,
    'color: green;'
  )
  Object.keys(options).forEach(key => {
    console.log(`%c${key}: `, 'color: #38f', options[key])
  })
  console.groupEnd()
}

