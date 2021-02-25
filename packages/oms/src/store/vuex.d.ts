import { Store } from 'vuex'
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
    interface State {
        count: number
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
