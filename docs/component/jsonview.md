
组件来源于[zhaoxuhui1122/vue-json-view](https://github.com/zhaoxuhui1122/vue-json-view), 仅做了少量修改.

```vue-demo
<template>
  <json-view :data="json" icon-style="circle"/>
</template>
<script>
export default {
    data() {
        return {
            json: {
                saveApi: '/save',
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

### props


| 属性        | 说明                                                         | 类型    | 默认值                                                       |
| ----------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| json        | 传入的json数据（必填）                                       | Object  | -                                                            |
| closed      | 是否折叠全部                                                 | Boolean | false                                                        |
| deep        | 展开深度,越大渲染速度越慢,建议不超过5                        | Number  | 3                                                            |
| icon-style  | 折叠按钮样式，可选值为square、circle、triangle               | String  | square                                                       |
| icon-color  | 两个折叠按钮的颜色                                           | Array   | theme=vs-code时，['#c6c6c6', '#c6c6c6']，其他情况为['#747983', '#747983'] |
| theme       | 可选主题样式,可选值为one-dark、vs-code，不选时为默认的白色主题 | String  | -                                                            |
| font-size   | 字体大小,单位px                                              | Number  | 14                                                           |
| line-height | 行高，单位px                                                 | Number  | 24                                                           |

**注：行高和字体大小不建议选用过大值，因为icon大小、每行的padding-left等参数并不会随之发生改变**
