import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface InterceptorUse<V> {
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any
}

export interface Interceptor {
    request: InterceptorUse<AxiosRequestConfig>,
    response: InterceptorUse<AxiosResponse>
}

export interface ApiResponse<R> {
    code: number
    message?: string,
    payload?: R
}
