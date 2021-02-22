import { createAdmin } from 'oms'
import * as devtool from 'oms-plugin-devtool'
import settings from './settings'
import 'oms/style.css'
import 'oms-plugin-devtool/style.css'
import app from './app'

const env = import.meta.env

createAdmin({
  config: settings,
  mock: {
    enable: env.VITE_APP_ENABLE_MOCK === 'true',
    baseURI: env.VITE_APP_BASE_API
  },
  plugins: [
    app,
    devtool
  ]
})
