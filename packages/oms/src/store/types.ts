import { AxiosInstance } from 'axios'
import { Settings, RemoteModule, Resource } from '../types'
import { RouteRecordRaw } from 'vue-router'

export interface User {
    name: string,
    token: string,
    avatar: string,
    isLodeRemoteRoutes: boolean,
    remoteRouter: RemoteModule[],
    customRouter: RouteRecordRaw[],
    resource: Resource
}

export interface RootState {
    http: AxiosInstance | undefined,
    user: User,
    settings: Settings,
    app: App
}

export interface Sidebar {
    opened: boolean,
    withoutAnimation: boolean
}

export interface App {
    sidebar: Sidebar,
    device: string,
}

export interface PageSchema {
    page: string
    json: Record<string, any>
}
