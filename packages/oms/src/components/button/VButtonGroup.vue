<template>
  <span class="v-btn">
    <el-dropdown split-button @command="onclick" @click="() => onclick(0)">
      <span v-if="type === 'link'" class="el-dropdown-link">
        {{ buttons[0].text }}<i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <template v-else>
        {{ buttons[0].text }}
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
    <template v-if="showContainer">
      <component
          :is="'el-' + container"
          v-model="showContainer"
          append-to-body
          :before-close="closeContainer"
          :title="text"
          :destroy-on-close="true"
      >
        <slot>
          <component
              :is="getSubComp()"
              v-bind="getSubProps()"
              v-on="getSubEvent()"
          />
        </slot>
      </component>
    </template>
  </span>
</template>
<script lang="ts">
import Base from './mixin'
import {strVarReplace} from '../../utils/string'

export default {
  name: 'VButtonGroup',
  mixins: [Base],
  props: {
    type: {
      type: String,
      default: 'button' // link
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  emits: ['click'],
  data() {
    return {
      activeIndex: undefined
    }
  },
  methods: {
    onclick(index) {
      this.activeIndex = index
      const btn = this.getBtnProps()
      if (this.$props.preCheck(btn, index) !== true) {
        return
      }
      if (btn['pre-check'] && btn['pre-check'](btn, index) !== true) {
        return
      }
      this.realTarget = strVarReplace(btn.target || '')
      this.clickHandler[btn.type]()
      this.$emit('click')
    },
    closeContainer() {
      this.showContainer = false
    },
    getBtnProps() {
      return this.$props.buttons[this.activeIndex]
    }
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown + .el-button {
  margin-left: 10px;
}
</style>
