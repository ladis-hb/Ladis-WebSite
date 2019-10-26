# Ladis WebSite

> My astounding Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
“＃Ladis-WebSite”

# 文件目录
.
├── README.md
├── api      //抽象后台管理系统api
│   └── axios.js    //aioxs请求
├── app.html        //网站HTML模版
├── assets          //css,js,资源文件目录,build会预编译
│   ├── css
│   │   ├── bootstrap-ie8.css
│   │   ├── bootstrap-ie9.css
│   │   └── theme-chalk
│   │       ├── fonts
│   │       │   ├── element-icons.ttf
│   │       │   └── element-icons.woff
│   │       ├── icon.css
│   │       └── message-box.css
│   ├── favicon.icon
│   ├── js
│   │   ├── bootstrap-ie8.js
│   │   └── bootstrap-ie9.js
│   └── main.css
├── components          //公共复用组件
│   ├── CardCopy.vue    //提供vr,case,news单元
│   ├── RouterRoad.vue  //product页面上路径列表
│   ├── footer.vue      //default.layout 公共页脚
│   ├── head.vue        //同上 公共导航栏
│   ├── list.vue        //
│   └── section.vue       //同上，官网主页main导航
├── layouts                 //nuxt模版
│   ├── default.vue         //官网前台模版
│   ├── login.vue           //官网后台登陆模版
│   └── map.vue             //
├── locales                 //nuxt.i18n 多语言翻译源文件
│   ├── en.json
│   └── zh.json
├── middleware              //nuxt中间件
│   ├── README.md
│   └── i18n.js
├── nuxt.config.js          //nuxt环境配置
├── package.json               
├── pages                   //页面目录
│   ├── about               //关于我们
│   │   ├── index
│   │   │   └── _id.vue     //关于我们子页面
│   │   └── index.vue       //主页面
│   ├── admin               //官网后台--------------------------------
│   │   ├── accont.vue        //登陆页面
│   │   ├── edit                //内容编辑页面
│   │   │   ├── _id.vue         //case,news 
│   │   │   ├── buy.vue         //经销商
│   │   │   ├── carousel.vue    //轮播图
│   │   │   ├── down.vue        //软件下载，常见问题 support编辑
│   │   │   ├── picSource.vue   //图片，软件，文件等资源上传
│   │   │   └── product.vue     //产品信息添加编辑
│   │   ├── edit.vue          //内容编辑主页
│   │   ├── prewive.vue         //产品信息预览
│   │   └── register.vue        //用户注册
//-----------------------------------------------------------------
│   ├── buy                   //经销商
│   │   ├── _id.vue
│   │   └── index.vue
│   ├── case                    //成功案例
│   │   ├── _id.vue
│   │   └── index.vue
│   ├── index.vue               //官网主页
│   ├── news                    //新闻资讯
│   │   ├── _id.vue
│   │   └── index.vue
│   ├── products                //产品信息
│   │   ├── _id.vue
│   │   ├── index.vue
│   │   └── list
│   │       ├── _id.vue
│   │       └── index.vue
│   ├── sitemap.vue             //网站地图
│   ├── support                 //软件下载，常见问题
│   │   ├── _id.vue
│   │   ├── index.vue
│   │   ├── problem
│   │   │   └── _id.vue
│   │   ├── 常�\201�\227��\230.vue
│   │   ├── 维修�\234\215�\212�.vue
│   │   └── �\206�\221�\225\231�\213.vue
│   └── vr                      //360全景
│       └── index.vue   
├── plugins                     //nuxt插件
│   ├── Vue-i18n.js
│   ├── axios.js
│   ├── components.js
│   ├── nuxt-quill-plugin.js
│   ├── router.js
│   └── v-region.js
├── server                      //server目录
│   ├── Koa.js                  //弃用
│   ├── Secret.js               //token加解密
│   ├── config.js               //server公用配置
│   ├── index.js                //server主页
│   ├── mongoose                //mongoose 数据库定义
│   │   ├── admin.js                //定义用户相关
│   │   ├── content.js              //定义连接
│   │   └── momgoose.js             //主文件
│   ├── router                  //koa-router路由
│   │   ├── admin.js                //用户相关
│   │   ├── edit.js                 //内容编辑
│   │   ├── index.js                //router分流，官网前台数据请求响应
│   │   └── upload.js               //文件上传
│   └── util                    //公用工具
│       ├── Format.js               //格式化工具
│       ├── MongoLass.js            //弃用
│       └── multiparty.js           //上传format解析
├── static                      //静态文件，（下载，图片。。。）
├── store                       //vuex
│   ├── README.md
│   ├── action.js
│   └── index.js
└── tools                       //测试工具
    ├── DB_mongo.js
    ├── MongoDB.js
    ├── crawler.js
    ├── head
    │   └── products.js
    ├── newSeriz.js             //爬虫。爬取官网主页
    ├── seriz.js                //同上。先运行下面这个爬虫，再运行上面的，有依赖关系
    └── ttt.js

# 前台说明


# 前置操作
npm install          //获取依赖
node /tool/seriz.js  //运行爬虫爬取老官网上页面的文本信息，链接信息，存储到mongoose
node /tool/newSeriz.js  //同上，依赖seriz。js创建的collection
npm run dev用于测试开发环境
npm run start 用于生产环境  
    //由于配置使用了80端口，linux环境下请使用sudo权限


# 后台登陆
登陆地址为 http://116.62.48.175/admin/accont
后台页面已做登陆效验，生命周期已localStoring,2day
所有api请求都会附加user，token给服务端效验

