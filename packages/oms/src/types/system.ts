import { api } from '../mock'
import { RouteRecordRaw } from 'vue-router'
import { Config } from '../store/modules/settings'
import { Component, Directive } from '@vue/runtime-core'
import { Module } from 'vuex'

export interface Plugin {
    use?: any[],
    components?: Record<string, Component>,
    directives?: Record<string, Directive>,
    mockApis?: api[],
    routes?: RouteRecordRaw[],
    storeModules?: Record<string, Module<any, any>>
}

export interface mock {
    enable: boolean, baseURI: string, defaultMockApi: boolean
}

export interface OmsOptions {
    config?: Config,
    mock?: mock,
    plugins?: Plugin[]
}
