<template>
  <template v-for="(item, index) in localButton" :key="index + 'v-button'">
    <v-button-group
      v-if="isArray(item)"
      v-right-click="{devId: `${prefixPath}[${index}]`}"
      v-bind="{
        buttons: item,
      }"
      @click="onclick"
      @action="onaction"
    />
    <v-button v-else v-right-click="{devId: `${prefixPath}[${index}]`}" v-bind="item" @click="onclick" @action="onaction" />
  </template>
</template>
<script lang="ts">
import VButton from './VButton.vue'
import VButtonGroup from './VButtonGroup.vue'
import { isArray } from '../../utils/type'

export default {
  components: {
    VButton, VButtonGroup
  },
  props: {
    buttons: {
      type: Array,
      default: () => []
    },
    prefixPath: {
      type: String,
      default: ''
    }
  },
  emits: ['click', 'action'],
  data() {
    const local : any = []
    this.$props.buttons.forEach(item => {
      delete item['when']
      local.push(item)
    })
    return {
      localButton: local
    }
  },
  methods: {
    isArray(tmp: any) {
      return isArray(tmp)
    },
    onclick(btn: any) {
      this.$emit('click', btn)
    },
    onaction(payload: any) {
      this.$emit('action', payload)
    },
    rightClick(e: any) {
    }
  }
}
</script>
