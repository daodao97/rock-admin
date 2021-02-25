import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      oms: '../src'
    }
  },
  server: {
    open: true
  },
  plugins: [vue(), vueJsx()]
})
