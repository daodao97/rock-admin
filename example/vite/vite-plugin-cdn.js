import { render } from 'ejs'
export default (options = [], extra = {}) => {
  const external = []
  const globals = {}
  const cdns = []
  options.forEach(item => {
    external.push(item.name)
    globals[item.importName] = item.name
    cdns.push(`<link rel="modulepreload" href="${item.cdn}">`)
  })
  const cdnScript = cdns.join('\\n')

  const data = {
    ...extra,
    cdns: cdnScript
  }

  return {
    name: 'html-transform',
    config: () => ({
      build: {
        rollupOptions: {
          external: external,
          output: {
            globals: globals
          }
        }
      }
    }),
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return render(html, data)
      }
    }
  }
}
