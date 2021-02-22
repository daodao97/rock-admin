<template>
  <router-view :key="$route.fullPath" v-slot="{ Component }">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { addNewStyle } from './utils'
export default {
  name: 'App',
  created() {
    const loading = document.getElementById('preloader')
    if (loading !== null) {
      document.body.removeChild(loading)
      addNewStyle('icon', '//at.alicdn.com/t/font_2246548_oqyia8sctzf.css')
    }
  }
}
</script>
