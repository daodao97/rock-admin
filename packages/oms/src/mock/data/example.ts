import _ from 'lodash'

const form = {
  saveApi: '/save',
  afterSubmit: '',
  afterReset: '',
  options: {
    column: 3,
    submitButton: {
      text: '提交'
    },
    cancelButton: {
      text: '取消',
      on: {
        click: '() => console.error(33333333)'
      }
    }
  },
  formItems: [
    {
      type: 'radio',
      field: 'radio',
      label: '单选框',
      info:
                '表单控件支持提示信息, 可写html <a class="el-link el-link--primary is-underline" target="_blank" href="http://github.com/daodao97">文档</a>',
      options: [
        {
          value: 1,
          label: '选项1'
        },
        {
          value: 2,
          label: '选项2'
        }
      ],
      value: 1,
      col: {
        span: 12
      }
    },
    {
      type: 'input',
      field: 'input',
      label: '输入框',
      value: 5,
      props: {
        maxlength: 10,
        suffixIcon: 'el-icon-date',
        slots: {
          prepend: '前缀'
        },
        showCopy: true,
        prefixIcon: 'el-icon-search'
      },
      rules: [{ required: true, message: '该项为必填项' }],
      depend: {
        field: 'radio',
        value: 1
      },
      computed: [
        {
          when: 'aaa',
          set: {
            checkbox: {
              value: [1]
            }
          }
        },
        {
          when: 'bbb',
          set: {
            checkbox: {
              value: [2, 3]
            }
          }
        }
      ],
      info: '当前控件依赖 单选框 的值, 仅在 选项1 下显示',
      col: {
        span: 12
      }
    },
    {
      type: 'number',
      field: 'number',
      label: '数字',
      props: {
        step: 2
      },
      computed: {
        // when: ["$self", ">", 10],
        // when: [">", 3],
        when: 4,
        set: {
          range_number: {
            label: '数字区间2'
          }
        }
      },
      col: {
        span: 12
      },
      value: 4
    },
    {
      type: 'number-range',
      field: 'range_number',
      label: '数字区间',
      col: {
        span: 12
      }
    },
    {
      type: 'checkbox',
      field: 'checkbox',
      label: '复选框',
      value: [],
      options: [
        { value: 1, label: '复选框1' },
        { value: 2, label: '复选框2' },
        { value: 3, label: '复选框3' }
      ],
      info: '动态计算, 当 输入框 字段的值 为 aaa 时, 复选框1将被选中, 为 bbb 时, 复选框2,3 将被选中',
      col: {
        span: 8
      }
    },
    {
      type: 'date',
      field: 'date',
      label: '日期',
      props: {
        disabled: true
      },
      info: '禁用控件',
      col: {
        span: 8
      }
    },
    {
      type: 'date',
      field: 'date_range',
      label: '日期范围',
      value: '',
      props: {
        type: 'daterange',
        rangeSeparator: '~',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      },
      col: {
        span: 8
      }
    },
    {
      type: 'time',
      field: 'time',
      label: '时间'
    },
    {
      type: 'time',
      field: 'time_range',
      label: '时间范围',
      props: {
        isRange: true
      }
    },
    {
      type: 'datetime',
      field: 'datetime',
      label: '日期时间'
    },
    {
      type: 'datetime',
      field: 'datetime_range',
      label: '日期时间范围',
      props: {
        type: 'datetimerange'
      }
    },
    {
      type: 'select',
      field: 'select',
      label: '下拉框',
      options: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
        { value: 3, label: '选项3' },
        { value: 4, label: '选项4' }
      ],
      props: {
        selectApi: '/user/select'
      }
    },
    {
      type: 'switch',
      field: 'switch',
      label: '开关'
    },
    {
      type: 'slider',
      field: 'slider',
      label: '滑块'
    },
    {
      type: 'upload',
      field: 'upload',
      label: '上传',
      value: 'http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg',
      props: {}
    },
    {
      type: 'upload',
      field: 'upload_multiple',
      label: '上传多张',
      props: {
        limit: 3
      }
    },
    {
      type: 'transfer',
      field: 'transfer',
      label: '穿梭框',
      options: [
        { value: 1, label: '备选项1' },
        { value: 2, label: '备选项2' },
        { value: 3, label: '备选项3' }
      ],
      value: []
    },
    {
      type: 'color',
      field: 'color',
      label: '颜色'
    },
    {
      type: 'rate',
      field: 'rate',
      label: '评分',
      value: 3
    },
    {
      type: 'sub-form',
      field: 'sub_form',
      label: '多项子表单',
      props: {
        repeat: true,
        formItems: [
          {
            type: 'input',
            field: 'sub_input',
            label: '输入框',
            rules: [
              {
                required: true,
                message: '子表单的校验将在上层表单校验通过后执行'
              }
            ],
            info: 'input 输入框支持 mask',
            props: {
              mask: '99-9999999'
            }
          },
          {
            type: 'input',
            field: 'sub_input_1',
            label: '输入框1'
          }
        ]
      }
    },
    {
      type: 'sub-form',
      field: 'sub_form_not_repeat',
      label: '子表单',
      props: {
        options: {
          inline: true
        },
        formItems: [
          {
            type: 'input',
            field: 'sub_input',
            label: '输入框',
            rules: [
              {
                required: true,
                message: '子表单的校验将在上层表单校验通过后执行'
              }
            ]
          },
          {
            type: 'input',
            field: 'sub_input_1',
            label: '输入框1'
          }
        ]
      }
    },
    {
      type: 'icon-select',
      field: 'icon',
      label: '图标'
    },
    {
      type: 'json',
      field: 'json',
      label: 'json',
      value: '{"a":1}'
    },
    {
      type: 'template',
      field: 'p3',
      label: '自定义',
      comp: {
        inject: ['formData'],
        template: '<div>{{ msg }}<br/>当前的表单数据是:<pre>{{JSON.stringify(formData, null, 2)}}</pre><el-button @click="onclick">click</el-button></div>',
        data: {
          msg: 'this is custom data'
        },
        methods: {
          onclick: '() => { console.log(this)}'
        }
      },
      info: '在通用表单控件无法满足需求时, 可以编写 `template` 模板组件'
    }
  ]
}

const buttons = [
  {
    type: 'jump',
    text: '跳转',
    target: 'http://github.com/daodao97'
  },
  {
    type: 'api',
    text: '请求接口',
    target: '/test_api',
    extra: {
      method: 'POST',
      url: '/test_api'
    }
  },
  {
    type: 'table',
    text: '表格',
    extra: {
      infoApi: '/student/list_info',
      listApi: '/student/list'
    },
    props: {
      type: 'info'
    }
  },
  [
    {
      type: 'jump',
      text: '跳转',
      target: 'http://github.com/daodao97'
    },
    {
      type: 'api',
      text: '请求接口',
      extra: {
        method: 'POST',
        url: '/test_api'
      }
    }
  ],
  {
    type: 'form',
    text: '表单',
    extra: {
      infoApi: '/form',
      saveApi: '/save'
    },
    props: {
      type: 'success'
    }
  }
]

const table = {
  filter: [
    {
      field: 'name',
      type: 'input',
      label: '姓名'
    },
    {
      field: 'sex',
      type: 'select',
      label: '性别',
      options: [
        { value: 1, label: '男' },
        { value: 0, label: '女' }
      ]
    }
  ],
  headers: [
    {
      field: 'name',
      label: '姓名',
      info: '表头提示'
    },
    {
      field: 'sex',
      type: 'enum',
      label: '性别',
      options: [
        { value: 1, label: '男' },
        { value: 0, label: '女' }
      ],
      state: {
        1: 'info',
        0: 'warning'
      },
      props: {
        sortable: true
      }
    },
    {
      field: 'github',
      type: 'link',
      label: '主页'
    },
    {
      field: 'html',
      type: 'html',
      label: 'HTML'
    },
    {
      field: 'image',
      type: 'image',
      label: '头像'
    },
    {
      field: 'json',
      type: 'json',
      label: '信息'
    },
    {
      field: 'richText',
      type: 'rich-text',
      label: '信息'
    }
  ],
  batchButton: buttons,
  rowButton: [
    {
      type: 'form',
      extra: {
        infoApi: '/user/{id}',
        saveApi: '/user/{id}'
      },
      props: {
        icon: 'el-icon-edit',
        type: 'success'
      }
    },
    {
      type: 'api',
      extra: {
        method: 'POST',
        url: '/student/{id}'
      },
      props: {
        icon: 'el-icon-delete',
        type: 'danger'
      }
    }
  ],
  normalButton: [
    ..._.cloneDeep(buttons),
    {
      type: 'jump',
      target: '/user/form',
      props: {
        icon: 'el-icon-plus',
        type: 'primary'
      }
    }
  ],
  selectedNotice: '当前共勾选: {selectedCount} 条',
  listApi: '/user/list'
}

const listMock = {
  code: 0,
  payload: {
    'list|0-100': [
      {
        'id|0-1000': 1,
        name: '@cname',
        'sex|0-1': 1,
        'score|0-100': 60,
        link: 'http://github.com/daodao97',
        image: 'http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg',
        html: '<S>显示删除线1</S>',
        json: { slogan: '左手代码右手诗' },
        richText: '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
      }
    ],
    page: {
      'count|1-10': 2,
      'page|1-5': 2
    }
  }
}

const layoutForm = {
  afterSubmit: '',
  afterReset: '',
  formItems: [
    {
      type: 'input',
      label: 'span12-1',
      col: {
        span: 12
      }
    },
    {
      type: 'input',
      label: 'span12-1',
      col: {
        span: 12
      }
    },
    {
      type: 'input',
      label: 'span6-1',
      col: {
        span: 6
      }
    },
    {
      type: 'input',
      label: 'span6-1',
      col: {
        span: 6
      }
    },
    {
      type: 'input',
      label: 'span'
    }
  ]
}

const layoutSection = {
  afterSubmit: '',
  afterReset: '',
  formItems: [
    {
      type: 'input',
      label: 'span12-1',
      col: {
        span: 12
      }
    },
    {
      type: 'input',
      label: 'span12-1',
      col: {
        span: 12
      }
    },
    {
      type: 'input',
      label: 'span6-1',
      section: '表单片段1',
      col: {
        span: 6
      }
    },
    {
      type: 'input',
      label: 'span6-1',
      col: {
        span: 6
      }
    },
    {
      section: '表单片段2',
      type: 'input',
      label: 'span'
    }
  ]
}

export default { form, table, listMock, layoutForm, layoutSection }

