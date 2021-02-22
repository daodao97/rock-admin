系统对 `axios` 做了简单封装, 组件中所有api请假将通过 [src/utils/request](https://github.com/daodao97/rock-admin/blob/master/src/utils/request.js) 进行请求.

所有请求将自动添加`header头` `Authorization`, 值为用户`Token`

### 接口响应的规范

正常响应 code为0
```json
{
  "code": 0,
  "payload": {}
}
```

错误响应 code为非0
```json
{
  "code": 500,
  "message": "系统错误"
}
```

!> 注意, 接口响应的 `code` 并非 `http response code`

## 系统依赖API

#### 用户相关
1.  登录接口
    - URI: `/usr/login`
    - Method: `POST`
    - Params
    ```js
        {
            "password":"111111",
            "username":"admin"
        }
    ```
    - Response
    ```js
        {
            "code":0,
            "payload":{
                "token":"admin-token"
            }
        }
    ```

2.  用户信息接口
    - URI: `/user/info`
    - Method: `GET`
    - Params: `token={token}`
    - Response
    ```js
        {
            "code":0,
            "payload":{
                "roles":[
                   "admin"
                ],
                "introduction":"I am a super administrator",
                "avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                "name":"Super Admin"
            }        
        }
    ```

3.  路由接口
    - URI: `/user/routes`
    - Method: `GET`
    - Params: `无`
    - Response: 
    ```js
 {
        "code":0,
    "payload":[
            {
                "name":"用户管理",
                "path":"#",
                "children":[
                    {
                        "path":"/user/list",
                        "name":"用户列表",
                        "icon":"el-icon-help",
                        "is_show":false
                    },
                    {
                        "path":"/user/form",
                        "name":"用户新建",
                        "icon":"el-icon-help",
                        "is_show":false
                    }
                ]
            },
            {
                "path":"/example/chart",
                "name":"图表",
                "view":"Chart"
            },
            {
                "name":"列表",
                "path":"#",
                "icon":"el-icon-help",
                "children":[
                    {
                        "path":"/list/example",
                        "name":"基础样例",
                        "view":"Test",
                        "icon":"el-icon-help"
                    },
                    {
                        "path":"/list/list",
                        "name":"页签样例",
                        "icon":"el-icon-help"
                    },
                    {
                        "name":"学生管理",
                        "path":"#",
                        "children":[
                            {
                                "path":"/student/list",
                                "name":"学生列表",
                                "icon":"el-icon-help",
                                "is_show":false
                            },
                            {
                                "path":"/student/form",
                                "name":"学生新建",
                                "icon":"el-icon-help",
                                "is_show":false
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ```
    
4.  站点配置接口

    -   URI: `/system/config`
    -   Method: `GET`
    -   Params: `无`
    -   Response

      ```js
    {
      "code":0,
      "payload":{
          "navBarNotice":"远程配置的导航顶部提示信息",
          "logo":"https://cdn.jsdelivr.net/gh/daodao97/FigureBed/uPic/hyperf-admin.png"
      }
    }
      ```


