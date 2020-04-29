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

