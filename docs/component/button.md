### 页面跳转
```vue-demo
<template>
  <v-button v-bind="schema1"/>
  <v-button v-bind="schema2"/>
</template>
<script>
export default {
    data() {
        return {
            schema1: {
                type: "jump",
                text: "网址跳转",
                target: "http://github.com/daodao97"
            },
            schema2: {
                type: "jump",
                text: "路由跳转",
                target: "/guide/preview"
            }
        }
    }
}
</script>
```

### 模态框
```vue-demo
<template>
  <v-button v-bind="schema1"/>
  <v-button v-bind="schema2"/>
</template>
<script>
export default {
    data() {
        return {
            schema1: {
                type: "form",
                text: "本地表单",
                form: {
                    saveApi: "/save",
                    formItems: [
                        {
                            field: "test",
                            label: "字段1",
                            type: "input"
                        }
                    ]
                }
            },
            schema2: {
                type: "form",
                text: "远程表单",
                form: {
                    saveApi: "/save",
                    infoApi: "/form_info" 
                }
            }
        }
    }
}
</script>
```

### 抽屉
```vue-demo
<template>
  <v-button v-bind="schema1"/>
  <v-button v-bind="schema2"/>
</template>
<script>
export default {
    data() {
        return {
            schema1: {
                type: "form",
                container: "drawer",
                text: "本地表单",
                form: {
                    saveApi: "/save",
                    formItems: [
                        {
                            field: "test",
                            label: "字段1",
                            type: "input"
                        }
                    ]
                }
            },
            schema2: {
                type: "form",
                container: "drawer",
                text: "远程表单",
                form: {
                    saveApi: "/save",
                    infoApi: "/form_info" 
                }
            }
        }
    }
}
</script>
```

### 接口请求
```vue-demo
<template>
  <v-button v-bind="schema1"/>
  <v-button v-bind="schema2"/>
</template>
<script>
export default {
    data() {
        return {
            schema1: {
                type: "api",
                text: "删除",
                target: "/delete",
                props: {
                    type: "danger"
                }
            },
            schema2: {
                type: "api",
                text: "PUT",
                target: "/delete",
                api: {
                    method: "PUT"
                }
            }
        }
    }
}
</script>
```

### 按钮组
```vue-demo
<template>
  <v-button-group :buttons="schema"/>
</template>
<script>
export default {
    data() {
        return {
            schema: [ 
                {
                    type: "api",
                    text: "删除",
                    target: "/delete",
                    props: {
                        type: "danger"
                    }
                 },
                 {
                    type: "api",
                    text: "PUT",
                    target: "/delete",
                    api: {
                        method: "PUT"
                    }
                } 
            ]
        }
    }
}
</script>
```

### props

| 参数   | 说明                                               | 类型   | 默认值 | 可选值             |
| ------ | -------------------------------------------------- | ------ | ------ | ------------------ |
| text   | 按钮文案                                           | String | 空     |                    |
| tips   | 提示文案, 按钮形式是可用                           | String | 空     |                    |
| type   | 按钮类型, 可为 页面跳转/接口请求/表单/列表         | String | 空     | jump/api/form/list |
| target | 目标, 可为 vue-router/path , url, api              | String | 空     |                    |
| api    | type为api时, 如 {method: 'POST', url: '/test_api’} | Object | {}     |                    |
| form   | type为form时可用, 表单属性                         | Object | {}     |                    |
| table  | type为list时可用, 列表属性                         | Object | {}     |                    |

### event

| 事件名 | 说明            | 回调参数          |
| ------ | --------------- | ----------------- |
| click  | 点击事件        | function(bnt)     |
| action | api请求成功事件 | function(payload) |

#### VButtonGroup 按钮组

### props

| 参数    | 说明     | 类型   | 默认值 | 可选值      |
| ------- | -------- | ------ | ------ | ----------- |
| type    | 展示类型 | String | button | button/link |
| buttons | 按钮配置 | Array  | []     |             |

### event

| 事件名 | 说明            | 回调参数          |
| ------ | --------------- | ----------------- |
| click  | 点击事件        | function(bnt)     |
| action | api请求成功事件 | function(payload) |
