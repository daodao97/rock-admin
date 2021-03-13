<template>
  <span class="v-btn">
    <!-- 按钮 -->
    <el-dropdown v-bind="dropProps" @command="clickHandle">
      <template v-if="dropProps.splitButton">
        {{ showText }}
      </template>
      <template v-else>
        <el-button :type="dropProps.type" @click="() => clickHandle(0)">
          {{ showText }}<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
      </template>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in buttons.slice(1)"
            :key="index + 'button-group'"
            :command="index + 1"
          >{{ item.text }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 弹窗容器 -->
    <component
      :is="'el-' + container"
      v-if="showContainer"
      v-model="showContainer"
      v-bind="containerProps"
      :before-close="beforeClose"
      :title="containerTitle"
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
import { computed, ref } from 'vue'
import { BaseButtonProps, baseComps, baseProps, getContainerProps, Plugin, plugins } from './base'
import { SetupContext } from '@vue/runtime-core'
import { strVarReplace } from '../../utils/string'
type Buttons = BaseButtonProps[]

interface DropProps {
  splitButton: boolean,
  type: string
}

const defaultDropProps : DropProps = {
  splitButton: false
}

interface VButtonGroupProps {
  buttons: Buttons,
  props: DropProps
}

export default {
  name: 'VButtonGroup',
  components: { ...baseComps },
  props: {
    buttons: {
      type: Array as Buttons,
      default: () => []
    },
    ...baseProps
  },
  emits: ['click', 'aflterClick', 'apiError', 'apiSuccess', 'action'],
  setup(props: VButtonGroupProps, ctx: SetupContext) {
    const dropProps : DropProps = { ...defaultDropProps, ...props.props }
    const replaceText: (string) => string = (str) => {
      return strVarReplace(str, props.metaData)
    }
    const activeIndex = ref(0)
    const showContainer = ref(false)
    const showText : string = computed<string>(() => {
      if (props.buttons.length > 0) {
        return replaceText(props.buttons[0].text || '')
      }
      return ''
    })
    const instance : Plugin<any> = ref(null)
    const clickHandle = (index) => {
      if (!props.preCheck(props)) {
        return
      }
      activeIndex.value = index
      const btn = props.buttons[index]
      const realTarget : string = strVarReplace(btn.target || '', props.metaData)
      instance.value = plugins[btn.type]
      instance.value.onclick(realTarget, ctx, props.extra, () => {
        showContainer.value = true
      })
    }
    const containerProps = getContainerProps(props.container, props)
    const beforeClose = () => {
      if (!props.beforeCloseContainer()) {
        return
      }
      showContainer.value = false
    }
    const containerTitle = computed<string>(() => {
      const btn = props.buttons[activeIndex.value]
      return replaceText(btn.text || '')
    })
    const xsubComp = computed(() => {
      return instance.value.getSubComp ? instance.value.getSubComp() : ''
    })
    const xsubProps = computed(() => {
      const btn = props.buttons[activeIndex.value]
      return instance.value.getSubProps ? instance.value.getSubProps(btn.extra, props.metaData) : {}
    })
    const xsubEvent = computed(() => {
      const btn = props.buttons[activeIndex.value]
      return instance.value.getSubEvent ? instance.value.getSubEvent(btn, ctx, showContainer) : {}
    })

    return {
      dropProps,
      showText,
      replaceText,
      clickHandle,
      showContainer,
      containerProps,
      beforeClose,
      xsubComp,
      xsubProps,
      xsubEvent,
      containerTitle
    }
  }
}
</script>
