<template>
  <div ref="editor" class="vue-codemirror" />
  <div v-show="showMenu" ref="menu" class="menu-box">
    <div class="menu">功能1</div>
    <div class="menu">功能2</div>
    <div class="menu">功能3</div>
    <div class="menu">功能4</div>
    <div class="menu">功能5</div>
  </div>
</template>
<script>
import _ from 'lodash'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

// show-hint
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'

import './keymap'
import './search'
import './fold'
import './sql'
import './json'
import './php'
import { isJson, showErrorGutter, clearErrorGutter } from './json'
import './formatting'
import './mode/xphp'
import { synonyms } from './utils'
export default {
  name: 'CodeMirror',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {}
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      cm: undefined,
      editor: undefined,
      showMenu: false
    }
  },
  computed: {
    cmOptions() {
      return _.merge(
        {
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true, // 代码折叠
          foldGutter: true,
          gutters: [
            'note-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'
          ],
          lint: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            // Tab: 'autocomplete',
            'Cmd-/': 'toggleComment',
            'Ctrl-F': this.format,
            'Shift-Tab': this.removeLineIdent,
            'Ctrl-G': (cm) => {
              const line = cm.getCursor()
              const cmWidget = document.createElement('span')
              cmWidget.className = 'callout'
              cm.replaceRange('\n', line)
            }
          }
        },
        this.$props.options,
        {
          value: this.$props.modelValue
        }
      )
    }
  },
  mounted() {
    const el = this.$refs.editor
    this.cm = CodeMirror(el, this.cmOptions)
    this.editor = this.cm.edit
    // CodeMirror.commands['selectAll'](this.cm)
    const events = ['change', 'focus', 'keyup']
    events.forEach(event => {
      this.cm.on(event, _.debounce(this['on' + event], 100))
    })
    this.cm.on('contextmenu', this.oncontextmenu)
  },
  beforeUnmount() {
    this.destroy()
  },
  created() {
  },
  methods: {
    onchange(cm, change) {
      const value = cm.getValue()
      if (this.cmOptions.mode === 'application/json') {
        const checkResult = isJson(value)
        if (checkResult !== true) {
          showErrorGutter(checkResult, cm)
        } else {
          clearErrorGutter(cm)
        }
      }
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    },
    destroy() {
      // garbage cleanup
      const element = this.cm.doc.cm.getWrapperElement()
      element && element.remove && element.remove()
    },
    getSelectedRange() {
      return { from: this.cm.getCursor(true), to: this.cm.getCursor(false) }
    },
    format() {
      // // fixme format 后点击任意行终端报错问题
      const { from, to } = this.getSelectedRange()
      this.cm.autoFormatRange(from, to)
    },
    removeLineIdent(cm) {
      cm.indentSelection('subtract')
    },
    oncontextmenu(cm, e) {
      e.preventDefault()
      this.showMenu = true
      const menu = this.$refs.menu
      menu.style.left = (e.clientX - 200) + 'px'
      menu.style.top = (e.clientY - 50) + 'px'
    },
    onfocus() {
      this.showMenu = false
    },
    onkeyup(cm, e) {
      if (e.keyCode >= 56 && e.keyCode <= 90 && e.ctrlKey === false) {
        const state = cm.getTokenAt(cm.getCursor()).state
        const isSql = this.state ? state.curMode.name === 'sql' : false
        const sqlKeywords = Object.keys(CodeMirror.mimeModes['text/x-mysql'].keywords)
        CodeMirror.commands.autocomplete(cm, isSql ? cm => synonyms(cm, sqlKeywords) : null, { completeSingle: false })
      }
    }
  }
}
</script>
<style lang="scss">
  .vue-codemirror {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  .CodeMirror {
    height: auto;
    min-height: 50px;
    line-height: 21px;
  }

  .line-error {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -5px;
    color: #fff;
    background-color: #f56c6c;
  }
  .menu-box{
    width: 130px;
    height: 125px;
    overflow: hidden;      /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #999,1px 0 1px #999;
    position: absolute;      /*自定义菜单相对与body元素进行定位*/
    background-color: #F7F7F7;
    z-index: 4000;
  }
  .menu{
    width: 130px;
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
  }
</style>
