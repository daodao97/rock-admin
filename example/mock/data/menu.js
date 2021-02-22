const form = {
  submitApi: '/save',
  formItems: [
    {
      type: 'input',
      label: '名称'
    },
    {
      type: 'input',
      label: '上级菜单',
      field: 'pid'
    },
    {
      type: 'select',
      label: '类型',
      field: 'type',
      options: [
        { value: 0, label: '目录' },
        { value: 1, label: '菜单' },
        { value: 2, label: '页面' },
        { value: 3, label: '目录' }
      ]
    },
    {
      type: 'icon-select',
      field: 'icon',
      label: '图标'
    },
    {
      type: 'input',
      field: 'route_path',
      label: '前端路由'
    },
    {
      type: 'select',
      label: '页面类型',
      field: 'page_type',
      options: [
        { value: 0, label: '前端组件' },
        { value: 1, label: '列表' },
        { value: 2, label: '表单' },
        { value: 3, label: '自定义schema' }
      ]
    },
    {
      type: 'json',
      label: '页面定义',
      field: 'page_schema'
    },
    {
      type: 'input',
      label: '组件路径',
      field: 'view_path'
    },
    {
      type: 'number',
      label: '排序',
      field: 'sort'
    },
    {
      type: 'radio',
      label: '状态',
      field: 'status',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    }
  ]
}

const table = {
  filter: [
    {
      field: 'name',
      type: 'input',
      label: '名称'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    }
  ],
  headers: [
    {
      field: 'name',
      type: 'input',
      label: '名称'
    },
    {
      field: 'route_path',
      type: 'input',
      label: '前端路由'
    },
    {
      field: 'icon',
      type: 'icon',
      label: '图标'
    },
    {
      field: 'status',
      type: 'enum',
      label: '状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      state: {
        1: 'info',
        0: 'warning'
      }
    }
  ],
  normalButton: [
    {
      type: 'jump',
      target: '/menu/form',
      text: '新建'
    }
  ],
  rowButton: [
    {
      type: 'jump',
      target: '/menu/{id}',
      props: {
        icon: 'el-icon-edit',
        type: 'success'
      }
    },
    {
      type: 'api',
      api: {
        method: 'DELETE',
        url: '/menu/{id}'
      },
      props: {
        icon: 'el-icon-delete',
        type: 'danger'
      }
    }
  ]
}

const listMock = {
  code: 0,
  payload: {
    'list|0-20': [
      {
        'id|0-1000': 1,
        'pid|0-1000': 0,
        name: '@cname',
        route_path: '/route/path',
        icon: 'ra-code',
        'status|0-1': 1,
        'type|0-3': 0,
        'sort|0-99': 99
      }
    ],
    page: {
      'count|1-10': 2,
      'page|1-5': 2
    }
  }
}

export default { form, table, listMock }
