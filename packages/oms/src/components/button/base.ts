import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useHttp } from '../../oms'
import { AxiosRequestConfig } from 'axios'
import { SetupContext } from '@vue/runtime-core'
import { FormProps } from '../form/types'
import { TableProps } from '../table/types'
import { strVarReplace } from '../../utils/string'
import { Ref, UnwrapRef } from '@vue/reactivity'

export interface formExtra {
  reset?: () => void
  submit?: (data: Record<string, any>) => void
}

export interface BaseButtonProps {
  type: string,
  target: string,
  text: string,
  extra: AxiosRequestConfig | formExtra,
}

export interface VButtonProps extends BaseButtonProps {
  container: string,
  preCheck: (props: VButtonProps) => boolean
  containerProps: Record<string, any>,
  beforeCloseContainer: () => boolean
  metaData: Record<string, any>
}

export const baseProps = {
  props: {
    type: Object,
    default: () => {}
  },
  metaData: {
    type: Object,
    default: () => {}
  },
  injectData: {
    type: [Object, Function],
    default: () => {}
  },
  preCheck: {
    type: Function,
    default: () => {
      return true
    }
  },
  container: {
    type: String,
    default: 'dialog',
    validator: (value: string) => {
      return ['dialog', 'drawer'].indexOf(value) !== -1
    }
  },
  containerProps: {
    type: Object,
    default: () => {}
  },
  beforeCloseContainer: {
    type: Function,
    default: () => {
      return () => true
    }
  }
}

export const baseComps = {
  VForm: defineAsyncComponent(() => import('../form/index.vue')),
  VTable: defineAsyncComponent(() => import('../table/index.vue')),
  SocketList: defineAsyncComponent(() => import('../normal/SocketList.vue'))
}

export interface Plugin<T> {
  getSubProps?: (extra: T, metaData: Record<string, any>) => void,
  getSubComp?: () => string,
  getSubEvent?: (props: VButtonProps, ctx: SetupContext, showContainer: Ref<UnwrapRef<boolean>>) => any,
  getContainerProps? :(container: string) => any,
  onclick(target: string, ctx: SetupContext, extra: T, callback: () => void): void
}

export const events : string[] = ['aflterClick']

const jump : Plugin<void> = {
  onclick(target: string) {
    console.log(target)
    if (/http.*/.test(target)) {
      window.open(target)
    } else {
      const router = useRouter()
      console.log(router)
      router && router.push(target)
    }
  }
}

const api : Plugin<AxiosRequestConfig> = {
  onclick(target: string, ctx, extra) {
    console.log(target, extra)
    useHttp().request({
      url: target,
      ...extra
    }).then(response => {
      ctx.emit('apiSuccess', response)
    }).catch(err => {
      ctx.emit('apiError', err)
    })
  }
}

const form: Plugin<TableProps> = {
  onclick(target: string, ctx: SetupContext, extra: TableProps, callback: () => void) {
    callback()
  },
  getSubComp() {
    return 'VForm'
  },
  getSubProps(extra: TableProps, metaDataa) {
    if (extra.infoApi) {
      extra.infoApi = strVarReplace(extra.infoApi, metaDataa)
    }
    return extra
  },
  getSubEvent(props, ctx: SetupContext, showContainer) {
    return {
    }
  }
}

const table: Plugin<FormProps> = {
  onclick(target: string, ctx: SetupContext, extra: FormProps, callback: () => void) {
    callback()
  },
  getSubComp() {
    return 'VTable'
  },
  getSubProps(extra: FormProps, metaDataa) {
    if (extra.infoApi) {
      extra.infoApi = strVarReplace(extra.infoApi, metaDataa)
    }
    if (extra.saveApi) {
      extra.saveApi = strVarReplace(extra.saveApi, metaDataa)
    }
    return extra
  },
  getSubEvent(props, ctx: SetupContext, showContainer) {
    return {
      reset() {
        showContainer.value = false
        if ('reset' in props.extra && props.extra.reset) {
          props.extra?.reset()
        }
      },
      submit(form: Record<string, any>) {
        if ('submit' in props.extra && props.extra.submit) {
          props.extra?.submit(form)
        }
      }
    }
  }
}

export const plugins: Record<string, Plugin<any>> = { jump, api, form, table }

export function getContainerProps(container: string, props: VButtonProps) {
  let defaultP : Record<string, any> = {
    'append-to-body': true,
    'destroy-on-close': true
  }
  if (container === 'dialog') {
    defaultP = {
      width: '80%',
      ...defaultP
    }
  }
  if (container === 'drawer') {
    defaultP = {
      size: '80%',
      ...defaultP
    }
  }

  return { ...defaultP, ...props.containerProps }
}
