<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-row :row-class-name="tableRowClassName">
      <el-col v-for="(item, index) in msgs" :key="index" :span="24">
        {{ item }}
      </el-col>
    </el-row>
    <div class="msg-end">-- end --</div>
  </el-scrollbar>
</template>

<script lang="ts">
import {showEleByClassName} from '../../utils'

let buffer = []
export default {
  name: 'SocketList',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ws: null,
      headers: [],
      msgs: [],
      interval: undefined
    }
  },
  beforeCreate() {
  },
  created() {
    this.ws = new WebSocket(this.$props.url)
    this.ws.onmessage = this.onMessage
    this.interval = setInterval(() => {
      if (buffer.length > 0) {
        this.msgs = this.msgs.concat(buffer)
      }
      if (this.msgs.length > 10000) {
        this.msgs = this.msgs.splice(0, this.msgs.length - 5)
      }
      buffer = []
      showEleByClassName('msg-end', 'center', 'instant', 'last')
    }, 500)
  },
  mounted() {
  },
  beforeUnmount() {
    this.ws.close()
    this.ws = null
    this.msgs = []
    clearInterval(this.interval)
  },
  methods: {
    onMessage(messageEvent) {
      if (messageEvent.data instanceof Blob) {
        const reader = new FileReader()
        reader.onload = () => {
          buffer.push(reader.result)
        }
        reader.readAsText(messageEvent.data)
      } else {
        // messageEvent.data
      }
    },
    getMaxHeight() {
      return document.body.clientHeight - document.body.clientHeight * 0.2
    },
    tableRowClassName({row, rowIndex}) {
      const prefix = 'socket-list'
      if (rowIndex % 2 === 0) {
        return `${prefix} warning-row`
      } else if (rowIndex % 2 === 1) {
        return `${prefix} success-row`
      }
      return `${prefix}`
    }
  }
}
</script>
