<template>
  <div ref="chartDom" class="chart" />
</template>

<script lang="ts">
import * as echarts from 'echarts/index.simple.js'
import { ref, onMounted, shallowRef, onUnmounted } from 'vue'
import { debounce } from '../../utils'

export default {
  name: 'VChart',
  props: {
    options: {
      type: Object,
      default: _ => {}
    }
  },
  setup(props) {
    const chartDom = ref(null)
    let chart = null

    onMounted(() => {
      chart = shallowRef(echarts.init(chartDom.value))
      chart.value.setOption(props.options)
      window.addEventListener('resize', resize)
    })

    const resize = debounce(() => chart.value.resize(), 200)

    onUnmounted(() => {
      window.removeEventListener('resize', resize)
    })

    return {
      chartDom,
      chart
    }
  }
}
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
  min-height: 400px;
  min-width: 600px;
}
</style>
