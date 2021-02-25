import { AxiosRequestConfig } from 'axios'
import { InstallOptions } from 'element-plus/es/utils/config'
import { RouteRecordRaw, stringifyQuery } from 'vue-router'
import { Component, Directive } from '@vue/runtime-core'
import { Module } from 'vuex'
import { MockApi } from './mock/types'

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

export interface OmsPlugin {
    use?: any[],
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

export interface LoginResponse {
    name: string,
    token: string
}

export enum PageType {
    custom,
    list,
    form,
    customSchema
}

export interface RemoteRoute {
    id: number,
    name: string,
    path: string,
    icon: string,
    view: string,
    is_show: number,
    page_type?: PageType,
    page_schema?: Record<string, any>,
    children: RemoteRoute[]
}

export interface RemoteModule {
    id: number,
    label: string,
    routes: RemoteRoute[]
}

export interface RouteModule {
    id: number,
    label: string,
    routes: RouteRecordRaw[]
}
