import FormBuilder from './views/formBuilder/index.vue'
import TableBuilder from './views/tableBuilder/index.vue'
import { Container } from 'oms'

const routes = [
  {
    path: '/',
    component: Container,
    meta: { title: '开发工具', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '/devtool/gen_from',
        name: 'GenForm',
        component: FormBuilder,
        meta: { title: '表单构建', icon: 'el-icon-s-tools', newTab: true }
      },
      {
        path: '/devtool/gen_table',
        name: 'GenTable',
        component: TableBuilder,
        meta: { title: '列表构建', icon: 'el-icon-s-tools', newTab: true }
      }
    ]
  }
]

export {
  routes
}
