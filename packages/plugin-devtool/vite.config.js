import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
  server: {
    open: true
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'oms-plugin-devtool',
      formats: ['umd', 'es']
    },
    sourcemap: false,
    rollupOptions: {
      external: [
        'vue',
        /^oms*/,
        /^core-js*/,
        /^system*/,
        /^node-sql-parser*/
      ],
      output: {
        globals: {
          vue: 'Vue',
          'node-sql-parser': 'nodeSqlParser',
          'element-plus': 'ElementPlus',
          'oms': 'OMS'
        }
      }
    }
  },
  plugins: plugins
})
