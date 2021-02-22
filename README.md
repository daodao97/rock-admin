<div align="center">
  <p>
    <img width="284" src="https://gitee.com/daodao97/asset/raw/master/imgs/rock-admin.png">
  </p>
  <div align="center">

[vue3](https://vue3js.cn/docs/zh/) |
[element-plus](https://element-plus.gitee.io/#/zh-CN/component/quickstart) |
[vite2](https://cn.vitejs.dev/guide/why.html) 

  </div>

  <div>

[体验站点](http://daodao97.gitee.io/rock-admin-demo) |
[详细文档](https://daodao97.gitee.io/rock-admin) |
[表单构建](http://daodao97.gitee.io/rock-admin-demo/#/devtool/gen_from) |
[列表构建](http://daodao97.gitee.io/rock-admin-demo/#/devtool/gen_table)

  </div>

</div>

`rock-admin` 是基于 `Vue3`, `element-plus`, `vue-admin-template` 的配置化后台构建工具, 核心概念是配置化渲染, 页面根据后端下发的 `PageSchema` 自动渲染, 辅助可视化`PageSchema`构造工具, 使常见的后台页面可以无代码实现.

### 目标

打造一套完整的低代码后台构建工具集, 包含前端和后端的完整链路, 通过可视化搭建, 即可实现常见的后台功能.

### 本地启动

```shell
git clone https://github.com/daodao97/rock-admin.git
cd rock-admin/exmaple
yarn
yarn serve
```

### 生态项目

- Golang + RockAdmin [go-rock-amdin](https://github.com/daodao97/go-rock-admin)

- PHP(hyperf) + RockAdmin [hyperf-admin](https://github.com/hyperf-admin/hyperf-admin)

### 运行流程

<div align="center">
    <img src="https://gitee.com/daodao97/asset/raw/master/imgs/Y66eHA.png">
</div>

### 插件机制

#### `rock-admin` 
  
  核心组件, 用于构建整个后台应用机制, 包括 路由/鉴权/菜单/PageSchema解析等基础能力
  
#### `rock-plugin-devtool`
  
  辅助开发组件, 注册页面构建工具的菜单及功能实现

> Don't Repeat Yourself

