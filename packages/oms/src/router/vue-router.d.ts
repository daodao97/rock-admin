import 'vue-router'
declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    hidden: boolean,
    pageSchema?: Record<string, any>
  }
}
