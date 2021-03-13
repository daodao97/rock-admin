<template>
  <span class="v-btn">
    <!-- 按钮 -->
    <ElButton v-if="relText" v-bind="$props.props" @click="lickhandler">{{ relText }}</ElButton>
    <ElButton v-else v-bind="$props.props" @click="lickhandler" />
    <!-- 弹窗容器 -->
    <component
      :is="'el-' + container"
      v-if="showContainer"
      v-model="showContainer"
      v-bind="containerProps"
      :before-close="beforeClose"
      :title="relText"
    >
      <component
        :is="xsubComp"
        v-bind="xsubProps"
        v-on="xsubEvent"
      />
    </component>
  </span>
</template>
<script lang="ts">
import { PropType, ref } from 'vue'
import { baseProps, plugins, Plugin, VButtonProps, getContainerProps, baseComps } from './base'
import { strVarReplace } from '../../utils/string'
import { SetupContext } from '@vue/runtime-core'

type VButtonType = PropType<'jump' | 'api' | 'form' | 'table' | 'model'>

export default {
  name: 'VButton',
  components: { ...baseComps },
  props: {
    type: {
      type: String as VButtonType,
      default: '',
      validator: (val: string) => {
        return [
          'jump', 'api', 'form', 'table', 'model'
        ].includes(val)
      }
    },
    target: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: undefined
    },
    extra: {
      type: Object,
      default() {
        return {}
      }
    },
    ...baseProps
  },
  emits: ['click', 'aflterClick', 'apiError', 'apiSuccess', 'action'],
  setup(props: VButtonProps, ctx: SetupContext) {
    const showContainer = ref(false)
    const instance : Plugin<any> = plugins[props.type]
    const lickhandler = () => {
      if (!props.preCheck(props)) {
        return
      }
      const realTarget : string = strVarReplace(props.target || '', props.metaData)
      instance.onclick(realTarget, ctx, props.extra, () => {
        showContainer.value = true
      })
    }
    const relText = strVarReplace(props.text || '', props.metaData)
    const containerProps = getContainerProps(props.container, props)
    const beforeClose = () => {
      if (!props.beforeCloseContainer()) {
        return
      }
      showContainer.value = false
    }
    const xsubComp = instance.getSubComp ? instance.getSubComp() : ''
    const xsubProps = instance.getSubProps ? instance.getSubProps(props.extra, props.metaData) : {}
    const xsubEvent = instance.getSubEvent ? instance.getSubEvent(props, ctx, showContainer) : {}
    return {
      lickhandler,
      relText,
      showContainer,
      containerProps,
      beforeClose,
      xsubComp,
      xsubProps,
      xsubEvent
    }
  }
}
</script>
