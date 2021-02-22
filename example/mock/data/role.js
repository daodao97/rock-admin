const form = {
  formItems: [
    {
      type: 'input',
      field: 'id',
      label: '#'
    },
    {
      type: 'input',
      field: 'pid',
      label: '父角色'
    },
    {
      type: 'input',
      field: 'name',
      label: '角色名'
    },
    {
      type: 'radio',
      label: '状态',
      field: 'status',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    },
    {
      type: 'number',
      label: '排序',
      field: 'sort'
    },
    {
      type: 'tree',
      label: '角色资源',
      field: 'role_resource'
    }
  ]
}

const table = {
  headers: [
    {
      type: 'input',
      field: 'id',
      label: '#'
    },
    {
      type: 'input',
      field: 'pid',
      label: '父角色'
    },
    {
      type: 'input',
      field: 'name',
      label: '角色名'
    }
  ],
  normalButton: [
    {
      type: 'jump',
      target: '/role/form',
      text: '新建'
    }
  ],
  rowButton: [
    {
      type: 'jump',
      target: '/role/{id}',
      props: {
        icon: 'el-icon-edit',
        type: 'success'
      }
    },
    {
      type: 'api',
      api: {
        method: 'DELETE',
        url: '/role/{id}'
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
