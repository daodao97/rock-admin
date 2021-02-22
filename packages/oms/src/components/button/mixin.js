import { isFunc, isString, strVarReplace } from '../../utils'
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
      default: () => {}
    },
    containerProps: {
      type: Object,
      default: () => {}
    },
    table: {
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
    container: {
      type: String,
      default: 'dialog',
      validator: (value) => {
        return ['dialog', 'drawer'].indexOf(value) !== -1
      }
    },
    beforeClose: {
      type: Function,
      default: _ => true
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
      default: () => {}
    }
  },
  data() {
    return {
      realTarget: '',
      showContainer: false,
      clickHandler: {
        jump: () => {
          if (/http.*/.test(this.realTarget)) {
            window.open(this.realTarget)
          } else {
            this.$router && this.$router.push(this.realTarget)
          }
        },
        form: () => {
          this.showContainer = true
        },
        list: () => {
          this.showContainer = true
        },
        modal: () => {
          this.showContainer = true
        },
        api: () => {
          MessageBox.confirm(
            this.text ? `确认要${this.text}吗?` : '确认要执行该操作吗?',
            '操作确认',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
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
                url: strVarReplace(this.target || '', this.$props.metaData)
              },
              this.getBtnProps().api || {}
            )
            options.url = strVarReplace(options.url, this.$props.metaData)

            this.$http.request(options).then(({ payload }) => {
              this.$emit('action', payload)
            })
          }).catch(error => {
            console.error('cancel', error)
          })
        },
        table: () => {
          this.showContainer = true
        }
      }
    }
  },
  methods: {
    closeContainer() {
      if (!this.beforeClose()) {
        return
      }
      this.showContainer = false
    },
    getSubComp() {
      const { type, sub } = this.getBtnProps()
      if (type === 'form') {
        return 'VForm'
      }
      if (type === 'table') {
        return 'VTable'
      }
      return sub
    },
    getSubProps() {
      const { type, form, table, subProps } = this.getBtnProps()
      if (type === 'form') {
        if (form.saveApi) {
          form.saveApi = strVarReplace(form.saveApi, this.metaData)
        }
        if (form.infoApi) {
          form.infoApi = strVarReplace(form.infoApi, this.metaData)
        }
        return Object.assign({}, form)
      }
      if (type === 'table') {
        if (table.listApi) {
          table.listApi = strVarReplace(table.listApi, this.metaData)
        }
        if (table.infoApi) {
          table.infoApi = strVarReplace(table.infoApi, this.metaData)
        }
        return Object.assign({}, table)
      }
      Object.keys(subProps).forEach(item => {
        if (isString(subProps[item])) {
          subProps[item] = strVarReplace(subProps[item], this.metaData)
        }
      })
      return subProps
    },
    getSubEvent() {
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
    getContainerProps() {
      let defaultP = {
        'append-to-body': true,
        'destroy-on-close': true,
        'before-close': this.closeContainer,
        title: this.text
      }
      if (this.container === 'dialog') {
        defaultP = Object.assign(defaultP, {
          width: '80%'
        })
      }

      if (this.container === 'drawer') {
        defaultP = Object.assign(defaultP, {
          size: '80%'
        })
      }

      return Object.assign({}, defaultP, this.containerProps)
    },
    closeModal() {
      this.showContainer = false
    }
  }
}
