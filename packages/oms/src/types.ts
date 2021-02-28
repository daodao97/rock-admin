import { AxiosRequestConfig } from 'axios'
import { InstallOptions } from 'element-plus/es/utils/config'
import { RouteRecordRaw } from 'vue-router'
import { Component, Directive, Plugin } from '@vue/runtime-core'
import { Module } from 'vuex'
import { MockApi } from './mock/types'

export interface Button {

}

export interface Sso {
}

export interface Nav {
}

export interface Settings {
    title: string,
    fixedHeader: boolean,
    sidebarLogo: boolean,
    logo: string,
    closeNavNotice: boolean,
    navBarNotice: string,
    hasNewMessage: boolean,
    showPageJsonSchema: boolean,
    loginTips: string,
    sso: Sso[],
    ElementPlus: InstallOptions,
    nav: Nav[],
    whiteRoutes: Array<string | RegExp>,
    tokenExpire?: number
}

export type UsePlugin = Plugin | [Plugin, any]

export interface OmsPlugin {
    use?: UsePlugin[],
    components?: Record<string, Component>,
    directives?: Record<string, Directive>,
    mockApis?: MockApi[],
    routes?: RouteRecordRaw[],
    storeModules?: Record<string, Module<any, any>>
}

export interface OmsOptions {
    axios?: AxiosRequestConfig,
    settings?: Settings,
    plugins?: OmsPlugin[],
    mock?: boolean
}

export interface LoginForm {
    username: string,
    password: string
}

export interface LoginTicket {
    ticket: string
}

export type ResourceIds = Array<Array<string>>

export interface UserInfo {
    id: number,
    name: string,
    token: string,
    avatar: string,
    nickname: string,
    role_ids: Array<string>,
    resource: ResourceIds
}

export type Resource = Record<string, boolean | Record<string, boolean>>

// eslint-disable-next-line no-unused-vars
export enum PageType { custom, list, form, customSchema}

export interface PageInfo {
    module_id: number,
    module_name: string
    id: number,
    pid: number,
    name: string,
    path: string,
    icon: string,
    view: string,
    is_show: number,
    type: number,
    page_type: PageType,
    page_schema: Record<string, any>,
    children: PageInfo[]
}

export interface RemoteModule {
    id: number,
    label: string,
    routes: PageInfo[]
}

export interface OmsModule {
    id: number,
    label: string,
    routes: RouteRecordRaw[]
}
