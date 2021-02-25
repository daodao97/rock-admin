<template>
  <div
      v-out-click="() => active(false)"
      :class="'el-date-editor el-range-editor el-input__inner el-date-editor--daterange el-range-editor--'+ $ELEMENT.size + (isFocus ? ' is-active' : '')"
      :style="{'width': width}"
  >
    <input
        v-model.number="localValue[0]"
        autocomplete="off"
        class="el-range-input"
        :disabled="disabled"
        @change="onchange"
        @focus="active(true)"
    > <span class="el-range-separator">~</span> <input
      v-model.number="localValue[1]"
      autocomplete="off"
      class="el-range-input"
      :disabled="disabled"
      @change="onchange"
      @focus="active(true)"
  > <span v-if="unit" class="el-range-separator">{{ unit }}</span>
  </div>
</template>
<script>
import {isArray} from '../../utils/type'

export default {
  name: 'VRangeNumber',
  props: {
    modelValue: {
      type: [Array, String],
      default: ','
    },
    disabled: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '350px'
    }
  },
  emits: ['update:modelValue'],
  data() {
    let startValue, endValue
    if (isArray(this.$props.modelValue)) {
      [startValue, endValue] = this.$props.modelValue.map((val) => Number(val))
    } else {
      [startValue, endValue] = this.$props.modelValue.split(',')
    }
    return {
      localValue: this.arrToNum([startValue, endValue]),
      isFocus: false
    }
  },
  methods: {
    active(status) {
      this.isFocus = !!status
    },
    varToNum(v) {
      return (v + '').replace(/[^\d.]/g, '').replace(/\.+/, '.')
    },
    arrToNum(arr) {
      return arr.map((item) => {
        if (item === '') {
          return undefined
        }
        const v = this.varToNum(item)
        return Number(v)
      })
    },
    onchange() {
      this.localValue = this.arrToNum(this.localValue)
      this.$emit('update:modelValue', this.localValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.v-input-range {
  font-size: 0;
  padding: 0 15px;

  &:hover {
    ::v-deep(*) {
      .range-split input,
      .range-start input,
      .range-end input {
        border-color: #c0c4cc;
      }
    }
  }

  &.isFocus {
    ::v-deep(*) {
      .range-split input,
      .range-start input,
      .range-end input {
        border-color: #409eff;
      }
    }
  }
}

// fixme
.range {
  &-split,
  &-start,
  &-end {
    display: inline-block;

    input {
      text-align: center;
    }
  }

  &-split {
    width: 10%;

    input {
      border-left: none;
      border-right: none;
      border-radius: 0;
      padding: 0;
      position: relative;
      z-index: 2;
      cursor: auto;

      &:focus,
      &:hover {
        border-color: #dcdfe6;
      }
    }
  }

  &-start {
    width: 40%;
    margin-left: -15px;

    input {
      border-right: none;
      border-radius: 4px 0 0 4px;
    }
  }

  &-end {
    margin-right: -15px;
    width: 40%;

    input {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
  }

  &-unit {
    width: 10%;
    margin-right: -15px;

    input {
      padding: 0;
      position: relative;
      z-index: 2;
      text-align: center;
      cursor: auto;

      &:focus,
      &:hover {
        border-color: #dcdfe6;
      }
    }
  }
}
</style>
