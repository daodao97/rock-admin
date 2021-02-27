interface Props {
  name: string
}

export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props: Props) {
    if (props.name === undefined) {
      return ''
    }
    if (props.name.indexOf('el-') === 0) {
      return () => (<i class={props.name}/>)
    }
    if (props.name.indexOf('ra-') === 0) {
      return () => (<i class={'iconfont ' + props.name}/>)
    }
    return () => (<span/>)
  }
}
