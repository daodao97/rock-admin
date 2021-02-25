import { BuildOptions, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'

const config : UserConfigExport = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    open: true
  },
  plugins: [
    vue(),
    vueJsx(),
    typescript({
      declaration: true,
      declarationDir: 'lib/types',
      rootDir: 'src'
    })
  ]
}

const build : BuildOptions = {
  outDir: 'lib',
  lib: {
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'oms',
    formats: ['umd', 'es']
  },
  sourcemap: true,
  rollupOptions: {
    external: [
      'vue',
      /^codemirror*/,
      /^element-plus*/,
      /^core-js*/,
      /^path-to-regex*/,
      /^file-saver*/,
      /^echarts*/,
      /^mitt*/,
      /^vue-router*/,
      /^vuex*/,
      /^axios*/,
      /^lodash*/,
      /^resize-detector*/,
      /^jsonlint*/,
      /^file-sever*/,
      /^xlsx*/,
      /^mockjs*/,
      /^system*/,
      /^nprogress*/,
      /^inputmask*/,
      /^qs*/,
      /^normalize.css*/,
      /^js-cookie*/,
      /^node-sql-parser*/
    ],
    output: {
      globals: {
        vue: 'Vue',
        'vue-router': 'vueRouter',
        vuex: 'vuex',
        axios: 'axios',
        'js-cookie': 'Cookie',
        lodash: '_',
        'resize-detector': 'resizeDetector',
        'codemirror': 'CodeMirror',
        jsonlint: 'jsonLint',
        xlsx: 'XLSX',
        mitt: 'mitt',
        'node-sql-parser': 'nodeSqlParser',
        'element-plus': 'ElementPlus',
        mockjs: 'Mock',
        'echarts/index.simple.js': 'echarts',
        nprogress: 'Nprogress',
        'file-saver': 'fileSaver',
        qs: 'qs',
        inputmask: 'Inputmask',
        'element-plus/lib/el-message': 'Message',
        'element-plus/lib/el-message-box': 'MessageBox',
        'element-plus/lib/locale/lang/zh-cn': 'local',
        'path-to-regexp': 'pathToRegexp'
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  config.build = build
}

export default config
