import mockApis from '../mock'
import Test from './views/Test.vue'
import { Layout } from 'oms'
import * as storeModules from './store'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: 'test',
        name: 'Test',
        component: Test,
        meta: { title: 'Test', icon: 'el-icon-help' }
      }
    ]
  }
]

export default {
  routes: routes,
  mockApis: mockApis,
  storeModules: storeModules
}
