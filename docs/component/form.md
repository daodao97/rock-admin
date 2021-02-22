### 基本应用
```vue-demo
<template>
  <v-form v-bind="schema"/>
</template>
<script>
export default {
    data() {
        return {
            schema: {
                saveApi: "/save",
                formItems: [
                    {
                        field: "test",
                        label: "字段1",
                        type: "input"
                    }
                ]
            }
        }
    }
}
</script>
```

### 完整控件
```vue-demo
<template>
  <v-form v-bind="schema"/>
</template>
<script>
export default {
    data() {
        return {
            schema: {
                saveApi: "/save",
                formItems: [
                    {
                        field: "test",
                        label: "单行文本",
                        type: "input",
                        info: "表单控件支持提示信息, 支持html <a href=http://github.com/daodao97>RockAdmin</a>",
                        props: {
                            maxlength: 10,
                            suffixIcon: "el-icon-date",
                            slots: {
                                prepend: "前缀"
                            },
                            showCopy: true,
                            prefixIcon: "el-icon-search"
                        },
                        rules: [{ required: true, message: "该项为必填项" }],
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
                        ]
                     },
                    {
                        type: "radio",
                        field: "radio",
                        label: "单选框",
                        options: [
                          {
                            value: 1,
                            label: "选项1"
                          },
                          {
                            value: 2,
                            label: "选项2"
                          }
                        ],
                        value: 1
                    },
                    {
                         type: "number",
                         field: "number",
                         label: "数字",
                         props: {
                           step: 2
                         },
                         computed: {
                           when: [">", 5],
                           set: {
                             range_number: {
                               label: "数字区间2"
                             }
                           }
                         },
                         value: 4
                    },
                    {
                         type: "number-range",
                         field: "range_number",
                         label: "数字区间"
                    },
                    {
                        type: "checkbox",
                        field: "checkbox",
                        label: "复选框",
                        value: [],
                        options: [
                          { value: 1, label: "复选框1" },
                          { value: 2, label: "复选框2" },
                          { value: 3, label: "复选框3" }
                        ],
                        info: '动态计算, 当 输入框 字段的值 为 aaa 时, 复选框1将被选中, 为 bbb 时, 复选框2,3 将被选中'
                      },
                      {
                        type: "date",
                        field: "date",
                        label: "日期"
                      },
                      {
                        type: "date",
                        field: "date_range",
                        label: "日期范围",
                        value: "",
                        props: {
                          type: "daterange",
                          rangeSeparator: "~",
                          startPlaceholder: "开始日期",
                          endPlaceholder: "结束日期"
                        }
                    },
                    {
                        type: "time",
                        field: "time",
                        label: "时间"
                      },
                      {
                        type: "time",
                        field: "time_range",
                        label: "时间范围",
                        props: {
                          isRange: true
                        }
                      },
                      {
                        type: "datetime",
                        field: "datetime",
                        label: "日期时间"
                      },
                      {
                        type: "datetime",
                        field: "datetime_range",
                        label: "日期时间范围",
                        props: {
                          type: "datetimerange"
                        }
                      },
                      {
                          type: "select",
                          field: "select",
                          label: "下拉框",
                          options: [
                            { value: 1, label: "选项1" },
                            { value: 2, label: "选项2" },
                            { value: 3, label: "选项3" },
                            { value: 4, label: "选项4" }
                          ],
                          props: {
                            selectApi: "/user/select"
                          }
                        },
                        {
                          type: "switch",
                          field: "switch",
                          label: "开关"
                        },
                        {
                          type: "slider",
                          field: "slider",
                          label: "滑块"
                        },
                        {
                          type: "upload",
                          field: "upload",
                          label: "上传",
                          value: "https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg",
                          props: {}
                        },
                        {
                            type: "upload",
                            field: "upload_multiple",
                            label: "上传多张",
                            props: {
                              limit: 3
                            }
                          },
                          {
                            type: "transfer",
                            field: "transfer",
                            label: "穿梭框",
                            options: [
                              { value: 1, label: "备选项1" },
                              { value: 2, label: "备选项2" },
                              { value: 3, label: "备选项3" }
                            ],
                            value: []
                          },
                          {
                            type: "color",
                            field: "color",
                            label: "颜色"
                          },
                          {
                            type: "rate",
                            field: "rate",
                            label: "评分",
                            value: 3
                          },
                      {
                         type: "sub-form",
                         field: "sub_form",
                         label: "多项子表单",
                         props: {
                           repeat: true,
                           formItems: [
                             {
                               type: "input",
                               field: "sub_input",
                               label: "输入框",
                               rules: [
                                 {
                                   required: true,
                                   message: "子表单的校验将在上层表单校验通过后执行"
                                 }
                               ],
                               info: "input 输入框支持 mask",
                               props: {
                                 mask: "99-9999999"
                               }
                             },
                             {
                               type: "input",
                               field: "sub_input_1",
                               label: "输入框1"
                             }
                           ]
                         }
                       },
                      {
                         type: "sub-form",
                         field: "sub_form_not_repeat",
                         label: "子表单",
                         props: {
                           options: {
                             inline: true
                           },
                           formItems: [
                             {
                               type: "input",
                               field: "sub_input",
                               label: "输入框",
                               rules: [
                                 {
                                   required: true,
                                   message: "子表单的校验将在上层表单校验通过后执行"
                                 }
                               ]
                             },
                             {
                               type: "input",
                               field: "sub_input_1",
                               label: "输入框1"
                             }
                           ]
                         }
                       },
                       {
                         type: "icon-select",
                         field: "icon",
                         label: "图标"
                       },
                     {
                        type: "json",
                        field: "json",
                        label: "json",
                        value: "{\"a\":1}"
                    },
                    {
                        type: 'template',
                        field: 'p3',
                        label: '自定义组件',
                        comp: {
                          inject: ['formData'],
                          template: '<div>{{ msg }}<br/>当前的表单数据是:<br/><json-view :data="formData" icon-style="circle"/>',
                          data: {
                            msg: 'this is custom data'
                          }
                        },
                        info: '在通用表单控件无法满足需求时, 可以编写 `template` 模板组件'
                      }
                ]
            }
        }
    }
}
</script>
```

### 布局
```vue-demo
<template>
  <v-form v-bind="schema" />
</template>
<script>
export default {
  data() {
    return {
      schema: {
        formItems: [
          {
            type: "input",
            label: "span12-1",
            col: {
              span: 12
            }
          },
          {
            type: "input",
            label: "span12-1",
            col: {
              span: 12
            }
          },
          {
            type: "input",
            label: "span6-1",
            col: {
              span: 6
            }
          },
          {
            type: "input",
            label: "span6-1",
            col: {
              span: 6
            }
          },
          {
            type: "input",
            label: "span"
          }
        ]
      }
    }
  }
}
</script>
```

### 分片
```vue-demo
<template>
  <v-form v-bind="schema" />
</template>
<script>
export default {
  data() {
    return {
      schema: {
        formItems: [
          {
            type: "input",
            label: "span12-1",
            col: {
              span: 12
            }
          },
          {
            type: "input",
            label: "span12-1",
            col: {
              span: 12
            }
          },
          {
            type: "input",
            label: "span6-1",
            section: "表单片段1",
            col: {
              span: 6
            }
          },
          {
            type: "input",
            label: "span6-1",
            col: {
              span: 6
            }
          },
          {
            type: "input",
            label: "span",
            section: "表单片段2"
          }
        ]
      }
    }
  }
}
</script>
```

### 组件属性

| 参数        | 说明                                       | 类型   | 默认值   | 可选值        |
| ----------- | ------------------------------------------ | ------ | -------- | ------------- |
| modelValue  | 表单各字段默认值                           | Object | {}       |               |
| formItems   | 表单字段配置, 具体见下方                   | Array  | []       |               |
| infoApi     | 表单schema拉取接口, 不为空是将覆盖本地属性 | String | 空字符串 |               |
| saveApi     | 表单保存接口                               | String | 空       |               |
| options     | 表单配置                                   | Object | 见下方   |               |
| afterSubmit | 表单提交后动作                             | String | 空       | goback/reload |
| afterReset  | 变动取消按钮点击后动作                     | String | 空       | goback/reload |

#### options默认值, 其他配置参见 [element-plus/form](https://element-plus.gitee.io/#/form-attributes)

```javascript
{
  inline: false, // 行模式
  labelPosition: 'right', 
  labelWidth: '100px',
  submitButton: { // false时则隐藏提交按钮
    show: true,
    type: 'primary',
    text: '提交'
  },
  cancelButton: { // false时则隐藏取消按钮
    show: true,
    type: 'info',
    text: '取消'
  }
}
```

#### formItems 表单控件配置

可查看 [example](https://github.com/daodao97/rock-admin/blob/master/example/mock/data/example.js) 完整样例,

表单控件各项配置说明

```javascript
[
  {
    type: "input", // 字段类型
    field: "field_name", // 字段名
    label: "展示名",
    value: "", // 字段值, 默认undefind
    info: "表单控件提示信息", // 支持html
    rules: [], // 字段校验规则
    props: {}, // element-plush 组件原生的属性, 如 https://element-plus.gitee.io/#/input-attributes
    options: [], // select/radio/checkbox 等组件的备选项
    col: { span: 12 }, // 控件布局
    section: "" // 表单分片
  }
]
```
### 事件

| 事件名            | 说明         | 回调参数               |
| ----------------- | ------------ | ---------------------- |
| submit            | 表单提交事件 | formData               |
| reset             | 表单取消事件 |                        |
| fieldchange       | 字段变动事件 | function(field, value) |
| update:modelValue | 更新事件     | formData               |
| mounted           | 组件挂载     |                        |

### 表单布局

### 数据版本

### 完整控件列表

-   input
-   number
-   number-range
-   select
-   radio
-   checkbox
-   image
-   upload
-   witch
-   icon-select
-   date
-   datetime
-   sub-form
-   cascader
-   cascader-panel
-   codemirror
-   slider
-   transfer
-   color
-   rate
