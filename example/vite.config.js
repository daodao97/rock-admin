import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer'

const plugins = [
  vue(),
  vueJsx()
]

if (process.env.REPORT === 'true') {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (moduleID) => {
          if (moduleID.includes('node_modules')) {
            return moduleID.match(/node_modules\/([^/]+)/)[1]
          }
        }
      }
    }
  },
  plugins
})
