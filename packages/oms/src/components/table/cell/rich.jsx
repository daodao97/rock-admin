import { reactive } from 'vue'
export default {
  name: 'CellRichText',
  functional: true,
  props: {
    data: {
      type: [String, Number, Array],
      default: ''
    }
  },
  setup(props) {
    let value = reactive(props.data)
    const explode = function(str) {
      const reg = /<([\s\S]*?)>/g
      let match = reg.exec(str)
      const result = []
      while (match != null) {
        result.push(RegExp.$1)
        match = reg.exec(str)
      }
      return result
    }
    if (typeof value === 'string' || typeof value === 'number') {
      value = [value] // 统一转化成数组处理
    }
    const nodes = []
    for (let idx = 0; idx < value.length; idx++) {
      const m = explode(value[idx])
      const style = {}
      let str = value[idx]
      for (let i = 0; i < m.length; i++) {
        const part = str.split('<' + m[i] + '>')
        nodes.push(<span>{part[0]}</span>)
        const t = m[i].split('|')
        let _style = {}
        if (t[1] !== undefined) {
          _style.color = t[1]
        }

        if (t[2] !== undefined) {
          _style.background = t[2]
        }
        _style = Object.assign({}, style, _style)
        nodes.push(<span class='el-tag el-tag--mini' style={_style}>{t[0]}</span>)
        str = part[1]
      }
      nodes.push(<span>{str}</span>)
      if (idx < value.length - 1) {
        nodes.push(<br />)
      }
    }
    return () => <div>{nodes}</div>
  }
}
