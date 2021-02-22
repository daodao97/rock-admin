
用户登录后, 从 `/user/routes` 接口拉取后端路由及页面配置, 从 `/user/info` 拉取用户的权限

经过权限过滤后, 将当前用户拥有的 `路由` 及 `PageScheme 节点`, 注册到系统中去, 完成后端的渲染.

1. 分配权限
   ![9GmnCk](https://gitee.com/daodao97/asset/raw/master/imgs/9GmnCk.png)

2. `/user/info` 下发资源列表

3. 前端 `filterResource` 对资源进行过滤, [源码](https://github.com/daodao97/rock-admin/blob/master/src/store/modules/user.js#L183)

4. `addRoute` 路由注册, [源码](https://github.com/daodao97/rock-admin/blob/master/src/store/modules/user.js#L198)

5. 页面渲染, 页面配置 `PageSchem` 保存在 `this.$route.meta.pageSchema` 中, 访问某路由时将自动获取页面的配置并完成渲染.
   ![ZgzCjd](https://gitee.com/daodao97/asset/raw/master/imgs/ZgzCjd.png)
   ![eMgvGT](https://gitee.com/daodao97/asset/raw/master/imgs/eMgvGT.png)
