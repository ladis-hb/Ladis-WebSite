/* jshint esversion:8 */
const axios = require("axios");
module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  server: {
    port: 80,
    host: process.env.NODE_ENV === "production" ? "116.62.48.175" : "localhost"
  },
  head: {
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      /* {
        rel: "stylesheet",
        type: "stylesheet",
        href: "@/assets/css/bootstrap-ie8.css"
      },
      {
        rel: "stylesheet",
        type: "stylesheet",
        href: "@/assets/css/bootstrap-ie9.css"
      } */
    ],
    script: [
      /* { src: "@/assets/js/bootstrap-ie8.js" },
      { src: "@/assets/js/bootstrap-ie9.js" } */
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    //"@/assets/css/theme-chalk/icon.css",
    "@/assets/css/theme-chalk/message-box.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css",
    "@/assets/main.css"
  ],
  /*
  ** Plugins to load before mounting the App

  */
  plugins: [
    { src: "~plugins/nuxt-quill-plugin.js", ssr: false },
    { src: "~plugins/v-region.js", ssr: false },
    { src: "~/plugins/Vue-i18n.js" },
    { src: "~/plugins/axios" }
    //{ src: "@/plugins/components.js" }
    //{ src: "~/plugins/router.js" }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",

    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    //
    "nuxt-i18n",
    //优化图像加载
    '@bazzite/nuxt-optimized-images',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  optimizedImages: {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif','jpg'],
    optimizeImages: true
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US"
      },
      {
        code: "zh",
        name: "简体中文",
        iso: "zh-CN"
      }
    ],
    defaultLocale: "zh",
    //翻译文件
    vueI18n: {
      fallbackLocale: "zh",
      messages: {
        en: require("./locales/en.json"),
        zh: require("./locales/zh.json")
      }
    },
    //持久化语言
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: "Ladis_WebSite_I18n"
    },
    //路由配置
    strategy: "prefix_except_default"
    /* parsePages: false,

    pages: {
      "admin/edit": false,
      "admin/edit/:id?": false
    }, */
    //SEO
    //baseUrl: 'https://my-nuxt-app.com',
    //seo: true
  },
  axios: {
    //proxy: true // Can be also an object with default options
  },

  proxy: {
    /*  "/api": {
      target: "http://116.62.48.175",
      changeOrigin: true, // 表示是否跨域
      pathRewrite: { "^/api/": "" }
    } */
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  //
  router: {
    //base: "./",
    /* scrollBehavior: function(to, from, savedPosition) {
            return { x: 0, y: 0 };
        } */
  },
  generate: {
    //subFolders: false,
    routes: function() {
      return axios.get("http://116.62.48.175/api/GET_router").then(res => {
        return res.data;
      });
    }
  }
};
