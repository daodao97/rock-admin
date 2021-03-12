import { MockApi, MockHttpMethod, MockOption } from '../types'
import menu from '../data/menu'
import role from '../data/role'
import example from '../data/example'

const userApis: MockApi[] = [
  {
    method: MockHttpMethod.POST,
    url: '/login',
    response(options: MockOption) {
      return {
        code: 0,
        payload: {
          name: 'daodao97',
          token: 'xxxxxxx'
        }
      }
    }
  },
  {
    method: MockHttpMethod.GET,
    url: '/user/info',
    response(options: MockOption) {
      return {
        code: 0,
        payload: {
          role_ids: [1],
          resource: [[0, 20, 'formItems', 'radio'], [0, 1, 2]]
        }
      }
    }
  },
  {
    url: '/user/routes',
    method: MockHttpMethod.GET,
    response: (options: MockOption) => {
      return {
        code: 0,
        payload: [
          {
            id: 0,
            label: '',
            routes: [
              {
                id: 20,
                path: '/form/overview1',
                name: '表单控件',
                icon: 'el-icon-help',
                page_type: 2,
                page_schema: example.form
              },
              {
                id: 1,
                name: '表单DEMO',
                path: '#',
                icon: 'el-icon-help',
                children: [
                  {
                    id: 2,
                    path: '/form/overview',
                    name: '表单控件',
                    icon: 'el-icon-help',
                    page_type: 2,
                    page_schema: example.form
                  },
                  {
                    id: 3,
                    path: '/form/layout',
                    name: '表单布局',
                    icon: 'el-icon-help',
                    page_type: 2,
                    page_schema: example.layoutForm
                  },
                  {
                    id: 4,
                    path: '/form/section',
                    name: '表单分片',
                    icon: 'el-icon-help',
                    page_type: 2,
                    page_schema: example.layoutSection
                  }
                ]
              },
              {
                name: '列表DEMO',
                path: '#',
                icon: 'el-icon-help',
                children: [
                  {
                    id: 5,
                    path: '/table/overview',
                    name: '列表概览',
                    icon: 'el-icon-help',
                    page_type: 1,
                    page_schema: example.table
                  }
                ]
              },
              {
                id: 6,
                name: '系统管理',
                path: '#',
                icon: 'el-icon-help',
                children: [
                  {
                    id: 7,
                    name: '用户管理',
                    path: '#',
                    children: [
                      {
                        id: 8,
                        path: '/user/list',
                        name: '列表',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 1,
                        page_schema: example.table
                      },
                      {
                        id: 9,
                        path: '/user/form',
                        name: '新建',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: example.form
                      },
                      {
                        id: 10,
                        path: '/user/:id',
                        name: '编辑',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: example.form
                      }
                    ]
                  },
                  {
                    id: 11,
                    name: '菜单管理',
                    path: '#',
                    children: [
                      {
                        id: 12,
                        path: '/menu/list',
                        name: '列表',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 1,
                        page_schema: menu.table
                      },
                      {
                        id: 13,
                        path: '/menu/form',
                        name: '新建',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: menu.form
                      },
                      {
                        id: 14,
                        path: '/menu/:id',
                        name: '编辑',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: menu.form
                      }
                    ]
                  },
                  {
                    id: 15,
                    name: '角色管理',
                    path: '#',
                    children: [
                      {
                        id: 16,
                        path: '/role/list',
                        name: '列表',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 1,
                        page_schema: role.table
                      },
                      {
                        id: 17,
                        path: '/role/form',
                        name: '新建',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: role.form
                      },
                      {
                        id: 18,
                        path: '/role/:id',
                        name: '编辑',
                        icon: 'el-icon-help',
                        is_show: false,
                        page_type: 2,
                        page_schema: role.form
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    url: '/user/list',
    method: MockHttpMethod.GET,
    response: (options: MockOption) => {
      return example.listMock
    }
  }
]

export default userApis
