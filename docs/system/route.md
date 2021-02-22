
`oms` 的路由为 `本地` + `远程` 两种模式, 

### 本地路由

```js
import { createAdmin, Layout } from 'oms'
createAdmin({
    routes: [
      {
        path: '/',
        component: Layout,
        meta: { title: '开发工具', icon: 'el-icon-s-tools' },
        children: [
          {
            path: '/devtool/gen_from',
            name: 'GenForm',
            component: FormSchema,
            meta: { title: '表单构建', icon: 'el-icon-s-tools' }
          }
        ]
      }
    ]
}
```

### 远程路由

用户登录完成后, 将自动调用 `/user/routes` 接口, 拉取远程路由, 并加载到 `vue-router` 中.

展示如下

![MzxJKy](https://gitee.com/daodao97/asset/raw/master/imgs/MzxJKy.png ':size=30%')
