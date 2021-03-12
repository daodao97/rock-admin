import { defineAsyncComponent } from 'vue'

export const baseProps = {
  shape: {
    type: String,
    default: 'button' // 展现形式 button, icon, link
  },
  props: {
    type: Object,
    default: () => {
    }
  },
  containerProps: {
    type: Object,
    default: () => {
    }
  },
  table: {
    type: Object,
    default: () => {
    }
  },
  metaData: {
    type: Object,
    default: () => {
    }
  },
  injectData: {
    type: [Object, Function],
    default: () => {
    }
  },
  container: {
    type: String,
    default: 'dialog',
    validator: (value: string) => {
      return ['dialog', 'drawer'].indexOf(value) !== -1
    }
  },
  beforeClose: {
    type: Function,
    default: () => true
  },
  preCheck: {
    type: Function,
    default: () => {
      return true
    }
  },
  sub: {
    type: String,
    default: ''
  },
  subProps: {
    type: Object,
    default: () => {
    }
  }
}

export const baseComps = {
  VForm: defineAsyncComponent(() => import('../form/index.vue')),
  VTable: defineAsyncComponent(() => import('../table/index.vue')),
  SocketList: defineAsyncComponent(() => import('../normal/SocketList.vue'))
}


