// 全局变量
var index = 0
var compOptions = {}
function uniqueid() {
  index++
  return index
}

// 辅助函数
function type(target) {
  const ret = typeof target
  const template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number - object',
    '[object Boolean]': 'boolean - object',
    '[object String]': 'string-object'
  }

  if (target === null) {
    return 'null'
  } else if (ret === 'object') {
    const str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    return ret
  }
}

function mdCodeToHtml(code, lang = 'html') {
  const langOrMarkup = window.Prism.languages[lang] || window.Prism.languages.markup
  const showCode = window.Prism.highlight(
    code.replace(/\n/, ''),
    langOrMarkup,
    lang
  )
  return '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + showCode + '</code></pre>'
}

function addNewStyle(newStyle) {
  var styleElement = document.getElementById('styles_js')

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.id = 'styles_js'
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }

  styleElement.appendChild(document.createTextNode(newStyle))
}

// 组件样式
var style = `
.vue-comp-box {
    margin-bottom: 20px; 
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
}
.vue-comp-view {
    padding: 20px;
    height: auto;
}
.vue-comp-desc {
    padding: 10px;
    background: #f8f8f8;
}

.vue-com-ctrl {
    border-top: 1px solid #eaeefb;
    height: 35px;
    line-height: 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
}

.vue-com-ctrl:hover {
    color: cornflowerblue;
}
`

addNewStyle(style)

// 源码显示组件
const codeViewComp = {
  name: 'CodeView',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  computed: {
    showCode() {
      const code = this.$props.code
      const lang = 'vue'
      return mdCodeToHtml(code, lang)
    }
  },
  template: '<div v-html="showCode"/>'
}

// 创建vue app
function makeApp(id) {
  const comps = window.GlobalComps
  const comp = compOptions[id]
  const tpl = `<div class="vue-comp-box">
    <div class="vue-comp-view">
      ${comp.template}
    </div>
    <transition>
      <div class="vue-comp-code" v-if="showCode">
        <div class="vue-comp-desc" v-if="desc" v-html="desc"></div>
        <code-view :code="sourceCode"/>
      </div>
    </transition>
    <div class="vue-com-ctrl" @click="showCode = !showCode">{{ showCode ? "隐藏": "显示" }}源码</div>
  </div>`

  const sourceCode = `${comp.sourceCode.replace(comp.desc, '').replace('<desc></desc>', '').trim()}`
  const desc = `${window.marked(comp.desc)}`

  const options = comp.script
  options.template = tpl.replace(/\n/g, '')
  options.mixins = [{
    data() { return { sourceCode: sourceCode, showCode: false, desc: desc } }
  }]
  const { createApp } = window.Vue
  const app = createApp(options)
  comps.forEach(comp => {
    if (type(comp) === 'array') {
      app.use(comp[0], comp[1])
    } else {
      app.use(comp)
    }
  })
  app.component('CodeView', codeViewComp)
  return app
}

// vue-demo 的转换
function makeVue(id, comp) {
  const html = `<div id="vue-demo-${id}"></div>`
  compOptions[id] = comp
  const script = `
setTimeout(() => {
    makeApp(${id}).mount('#vue-demo-${id}');
}, 200)
`
  const ele = document.createElement('script')
  ele.innerHTML = script
  document.body.appendChild(ele)
  return html
}

// 解析 vue-demo 结构
function parserCom(str) {
  const template = str.match(/<template>\n[\s\S]*\n<\/template>/gm) || []
  const desc = str.match(/<desc>\n[\s\S]*\n<\/desc>/gm) || []
  let script = str.match(/<script>\n[\s\S]*\n<\/script>/gm) || []
  if (template.length === 0 || script.length === 0) {
    return {
      template: '',
      script: {},
      desc: '',
      sourceCode: ''
    }
  }

  script = script[0].replace('<script>', '')
    .replace('</script>', '')
    .replace('export default', '').trim()

  return {
    template: template[0].replace('<template>', '').replace('</template>', ''),
    script: Function(`return ${script}`)(),
    desc: (desc[0] || '').replace('<desc>', '').replace('</desc>', ''),
    sourceCode: str.replace('```vue-demo', '').replace('```', '')
  }
}

// 解析 markDown 源文件, 提取 vue-demo 代码块
function parserMd(content) {
  const m = content.match(/```vue-demo.*?```/msuig) || []
  m.forEach(item => {
    const comp = parserCom(item)
    const compStr = makeVue(uniqueid(), comp)
    content = content.replace(item, compStr)
  })
  return content
}

// docsify 插件入口
window.vueCompDemo = function(comps) {
  window.GlobalComps = comps
  return function(hook, vm) {
    hook.beforeEach(function(content) {
      return parserMd(content, comps)
    })
  }
}
