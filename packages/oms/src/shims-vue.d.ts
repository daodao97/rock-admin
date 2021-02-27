import 'vue'
import 'vue-router'

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
    interface _RouteRecordBase {
        hidden?: boolean
    }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    App: any;
  }
}
