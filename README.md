# 修改日志

## v1.0.0 (2017/6/6)
*   项目集成 用户权限判断，验证码，cookie，加密服务，用户和服务端ip地址获取，邮件服务，redis与session实现session共享，mysql服务
*   vue+node,采用node做服务层，vue做前端框架，前端路由采用vue-router，后端路由采用express，使用了connect-history-api-fallback中间件，使得后端路由没有找到，则会跳转前端路由
*   数据流传输采用vuex
*   webapack热启动，增加webpack-hot-middleware以及webpack-dev-middleware，测试是文件直接生成在内存中
*   日志配置服务，生成日志
*   服务器信息配置
*   前后端通用过滤器
*   本地调试：nodemon以及nodemon.json

# 技术选型


* `nodeJs` ：服务层，目前版本v7.2.0

* `express` ：web应用开发框架

* `webpack` ：前端打包工具

* `vue` ：前端框架，mvvm模式，实现数据双向绑定

* `vuex`:数据流传输工具

* `vue-router`:vue路由

* `elementUI`:前端ui组件库

* `ejs` ：页面模板

* `ccap`：生成验证码

* `cookie`:服务端cookie服务

* `crypto`:加密服务

* `mail` :邮件服务

* `redis`:redis缓存服务

* `mysql`:数据库服务


# 文件结构
```
        |-- bin <br/>
            |-- demo_system
        |-- build
            |-- build.js
            |-- dev-client.js
            |-- dev-server.js
            |-- webpack.base.conf.js
            |-- webpack.dev.conf.js
            |-- webpack.prod.conf.js
        |-- common
            |-- auth.js
            |-- ccap.js
            |-- cookie.js
            |-- crypto.js
            |-- getIP.js
            |-- mail.js
            |-- redis.js
        |-- controller
            |-- 路由文件
        |-- logConfig
            |-- log4js.json
            |-- logs.js
        |-- logs
        |-- src
            |-- assets
                |-- 静态资源
            |-- components
                |-- vue组件
            |-- router
                |-- 前端路由文件
            |-- store
                |-- actions.js
                |-- getters.js
                |-- index.js
                |-- mutations.js
            |-- views
            |-- App.vue
            |-- index.template.html
            |-- main.js
        |-- models
            |-- db.js
        |-- static
            |-- css
            |-- js
            |-- images
        |-- serverConfig
            |-- config.global.js
        |-- utils
            |-- filter
        |-- theme
            |-- elementUI主题文件
        |-- element-variables.css
        |-- .babelrc
        |-- .gitignore
        |-- app.js
        |-- nodemon.json
        |-- packjson
```


# 启动方式

*   `Windows`:启动`dos`窗口;

*   `mac`:启动`terminal.app`;

## 测试环境

```
1、npm run dev


```

## 线上环境

```
1、 npm run build

2、 npm run start

```


