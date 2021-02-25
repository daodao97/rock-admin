export enum MockHttpMethod {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    FETCH = 'fetch',
    OPTION = 'option',
    PUT = 'put'
}

export interface MockOption {
    query: Record<string, any>,
    data: Record<string, any>
}

export interface MockApi {
    method: MockHttpMethod,
    url: string | RegExp,
    baseURL?: string,
    response: (options: MockOption) => Record<string, any>
}

export interface MockApiMap {
    [key: string]: MockApi
}
