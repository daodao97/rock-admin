import { isFunc, isString } from '../../utils/type'
import { strVarReplace } from '../../utils/string'
import { defineAsyncComponent } from 'vue'
import MessageBox from 'element-plus/lib/el-message-box'

export default {
  emits: ['click', 'action'],
  components: {
    VForm: defineAsyncComponent(() => import('../form/index.vue')),
    VTable: defineAsyncComponent(() => import('../table/index.vue')),
    SocketList: defineAsyncComponent(() => import('../normal/SocketList.vue'))
  },
  props: {
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
  },
  data() {
    return {
      realTarget: '',
      showContainer: false,
      clickHandler: {
        jump: () => {
          // @ts-ignore
          if (/http.*/.test(this.realTarget)) {
            // @ts-ignore
            window.open(this.realTarget)
          } else {
            // @ts-ignore
            this.$router && this.$router.push(this.realTarget)
          }
        },
        form: () => {
          // @ts-ignore
          this.showContainer = true
        },
        list: () => {
          // @ts-ignore
          this.showContainer = true
        },
        modal: () => {
          // @ts-ignore
          this.showContainer = true
        },
        api: () => {
          MessageBox.confirm(
            // @ts-ignore
            this.text ? `确认要${this.text}吗?` : '确认要执行该操作吗?',
            '操作确认',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            // @ts-ignore
            let data = this.$props.injectData
            if (isFunc(data)) {
              data = data()
            }
            const options = Object.assign(
              {
                method: 'GET',
                data: data
              },
              {
                // @ts-ignore
                url: strVarReplace(this.target || '', this.$props.metaData)
              },
              // @ts-ignore
              this.getBtnProps().api || {}
            )
            // @ts-ignore
            options.url = strVarReplace(options.url, this.$props.metaData)

            // @ts-ignore
            this.$http.request(options).then(({ payload }) => {
              // @ts-ignore
              this.$emit('action', payload)
            })
          }).catch(error => {
            console.error('cancel', error)
          })
        },
        table: () => {
          // @ts-ignore
          this.showContainer = true
        }
      }
    }
  },
  methods: {
    closeContainer() {
      // @ts-ignore
      if (!this.beforeClose()) {
        return
      }
      // @ts-ignore
      this.showContainer = false
    },
    // @ts-ignore
    getSubComp() {
      // @ts-ignore
      const { type, sub } = this.getBtnProps()
      if (type === 'form') {
        return 'VForm'
      }
      if (type === 'table') {
        return 'VTable'
      }
      return sub
    },
    // @ts-ignore
    getSubProps() {
      // @ts-ignore
      const { type, form, table, subProps } = this.getBtnProps()
      if (type === 'form') {
        if (form.saveApi) {
          // @ts-ignore
          form.saveApi = strVarReplace(form.saveApi, this.metaData)
        }
        if (form.infoApi) {
          // @ts-ignore
          form.infoApi = strVarReplace(form.infoApi, this.metaData)
        }
        return Object.assign({}, form)
      }
      if (type === 'table') {
        if (table.listApi) {
          // @ts-ignore
          table.listApi = strVarReplace(table.listApi, this.metaData)
        }
        if (table.infoApi) {
          // @ts-ignore
          table.infoApi = strVarReplace(table.infoApi, this.metaData)
        }
        return Object.assign({}, table)
      }
      Object.keys(subProps).forEach(item => {
        if (isString(subProps[item])) {
          // @ts-ignore
          subProps[item] = strVarReplace(subProps[item], this.metaData)
        }
      })
      return subProps
    },
    getSubEvent() {
      // @ts-ignore
      const { type } = this.getBtnProps()
      if (type === 'form') {
        return {
          submit: this.closeContainer,
          reset: this.closeContainer
        }
      }
      if (type === 'table') {
        return {}
      }
      return {}
    },
    // @ts-ignore
    getContainerProps() {
      // @ts-ignore
      let defaultP = {
        'append-to-body': true,
        'destroy-on-close': true,
        'before-close': this.closeContainer,
        // @ts-ignore
        title: this.text
      }
      // @ts-ignore
      if (this.container === 'dialog') {
        defaultP = Object.assign(defaultP, {
          width: '80%'
        })
      }

      // @ts-ignore
      if (this.container === 'drawer') {
        defaultP = Object.assign(defaultP, {
          size: '80%'
        })
      }

      // @ts-ignore
      return Object.assign({}, defaultP, this.containerProps)
    },
    closeModal() {
      // @ts-ignore
      this.showContainer = false
    }
  }
}
