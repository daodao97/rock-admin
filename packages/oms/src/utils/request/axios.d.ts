import '@vue/runtime-core'
import { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
    // eslint-disable-next-line no-unused-vars
    interface ComponentCustomProperties {
        $http: AxiosInstance
    }
}
