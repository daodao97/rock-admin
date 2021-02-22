### 组件安装

在现有项目中安装本组件

```shell
npm install rock-admin
# or
yarn add rock-admin
```

### UMD

```html
<script src="rockadmin.umd.min.js"></script>
```

### 模板项目

使用本项目提供的模板快速创建本地项目

```shell
vue create --preset daodao97/rock-admin my-admin
cd my-admin
yarn serve
```

```js
import 'element-plus/lib/theme-chalk/index.css'
import { createAdmin } from 'rock-admin'

import mockApis from '../mock'
import settings from './settings'
const nav = [
  {
    type: 'jump',
    text: '跳转',
    shape: 'icon',
    target: 'http://github.com/daodao97',
    props: {
      icon: 'ra-github1'
    }
  }
]

createAdmin({
  config: settings,
  nav: nav,
  mock: {
    apis: mockApis,
    enable: process.env.VUE_APP_ENABLE_MOCK === 'true',
    baseURI: process.env.VUE_APP_BASE_API
  }
})
```
