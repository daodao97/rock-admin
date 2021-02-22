### 基础应用
```vue-demo
<template>
  <v-table v-bind="schema"/>
</template>
<script>
export default {
    data() {
        return {
            schema: {
                filter: [
                   {
                     field: "name",
                     type: "input",
                     label: "姓名"
                   },
                   {
                     field: "sex",
                     type: "select",
                     label: "性别",
                     options: [
                       { value: 1, label: "男" },
                       { value: 0, label: "女" }
                     ]
                   }
                ],
                headers: [
                {
                   field: "name",
                    label: "姓名",
                    info: "表头提示"
                  },
                  {
                    field: "sex",
                    type: "enum",
                    label: "性别",
                    options: [
                    { value: 1, label: "男" },
                    { value: 0, label: "女" }
                  ],
                    state: {
                    1: "info",
                     0: "warning"
                  },
                    props: {
                      sortable: true
                    }
                  },
                  {
                    field: "github",
                    type: "link",
                    label: "主页"
                  },
                  {
                    field: "image",
                    type: "image",
                    label: "头像"
                  }
                ],
                list: [
                    {
                        name: "杨过",
                        sex: 1,
                        link: "http://github.com/daodao97",
                        image: "http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg",
                        html: "<S>显示删除线1</S>",
                        json: {slogan:"左手代码右手诗"},
                        richText: "在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>" 
                    },
                    {
                        name: "小龙女",
                        sex: 0,
                        link: "http://github.com/daodao97",
                        image: "http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg",
                        html: "<S>显示删除线1</S>",
                        json: {slogan:"左手代码右手诗"},
                        richText: "在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>" 
                    },
                ],
                normalButton: [
                    {
                        type: "jump",
                        target: "/user/form",
                        text: "新建"
                    }
                ],
                rowButton: [
                    {
                        type: "jump",
                        target: "/user/{id}",
                        text: "编辑"
                    },
                    {
                        type: "api",
                        target: "/user/{id}",
                        text: "删除",
                        props: {
                            type: "danger"
                        }
                    }
                ],
                batchButton: [
                   {
                        type: "api",
                        target: "/user/batch_del",
                        text: "批量删除",
                        props: {
                            type: "danger"
                        }
                    } 
                ]
            }
        }
    }
}
</script>
```

### props

| 参数           | 说明                                                         | 类型          | 默认值                                                       | 可选值 |
| -------------- | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ | ------ |
| filter         | 表单过滤项, 同formItems                                      | Array         | []                                                           |        |
| headers        | 表头                                                         | Array         | []                                                           |        |
| list           | 默认列表数据                                                 | Array         | []                                                           |        |
| listApi        | 列表数据拉取接口                                             | String        | 空                                                           |        |
| infoApi        | 组件属性拉取接口                                             | String        | 空                                                           |        |
| batchButton    | 批量操作按钮                                                 | Array         | []                                                           |        |
| normalButton   | 表单操作按钮                                                 | Array         | []                                                           |        |
| rowButton      | 行操作按钮                                                   | Array         | []                                                           |        |
| showPagination | 是否显示分页组件                                             | Boolen        | true                                                         |        |
| selectedNotice | 批量选中时的提示文案                                         | String/Object | 空                                                           |        |
| listIncrease   | 编辑模式, 新增行按钮                                         | Boolen/Object | false                                                        |        |
| tableProps     | ElementPlus 表格原始属性 [文档](https://element-plus.gitee.io/#/table-attributes) | Object        | {<br/>  **"border"**:**true**,<br/>  **"stripe"**:**true**,<br/>  **"size"**:**"mini"**,<br/>  **"rowKey"**:**"id"**,<br/>  **"lazy"**:**true**,<br/>  **"defaultExpandAll"**:**false**<br/>} |        |

### table event

| 事件名      | 说明       | 回调参数              |
| ----------- | ---------- | --------------------- |
| cell-change | 行变动事件 | {index, field, value} |
