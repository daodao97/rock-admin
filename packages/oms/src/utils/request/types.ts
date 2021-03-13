import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface InterceptorUse<V, T> {
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: T) => Promise<V>
}

export interface Interceptor {
    request: InterceptorUse<AxiosRequestConfig, AxiosError>,
    response: InterceptorUse<AxiosResponse, AxiosError>
}

export interface ApiResponse<R> {
    code: number
    message?: string,
    payload?: R
}
