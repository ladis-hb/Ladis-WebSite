import { Configuration } from "@nuxt/types"
const webpack = require('webpack')
const Host = 'https://www.ladishb.com/admin'
const isProduction = process.env.NODE_ENV === "production"
export default {
  telemetry: true,
  mode: "spa",
  /*
   ** Headers of the page
   */
  server: {
    port: 9006,
    host: isProduction ? "0.0.0.0" : "localhost"
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: []
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ['assets/main.css'],
  /*
  ** Plugins to load before mounting the App

  */
  plugins: [
    { src: '~/plugins/my-component.js', ssr: false },
    //{ src: '~/plugins/vue-editor.js', ssr: false  },
    //{ src: "~plugins/nuxt-quill-plugin.js", ssr: false },
    { src: "~plugins/v-region.js", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    '@nuxtjs/apollo'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: isProduction ? Host : 'http://localhost:9006'
    //baseURL:'http://localhost:9006'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "post", propertyName: "user" }
        },
        tokenRequired: true,
        tokenType: "bearer"
      }
    },
    redirect: {
      login: "/admin/login",
      logout: "/admin/login",
      //callback: '/admin/edit',
      home: "/admin/"
    }
  },

  // Give apollo module options
  apollo: {
    tokenName: 'ladisServer',
    cookieAttributes: {
      expires: 7,
      path: '/',
      domain: 'example.com',
      secure: false,
    },
    includeNodeModules: true,
    authenticationType: 'Basic',
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: 'http://www.ladishb.com:9006',//isProduction? 'http://www.ladishb.com:9006': 'http://127.0.0.1:9006',
        browserHttpEndpoint: isProduction ? '/admin/graphql' : '/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        tokenName: 'apollo-token', // optional
      }
    }
  },

  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Build configuration
   */
  build: {
    publicPath: isProduction ? Host + '/_nuxt/' : '/_nuxt/',
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) { },
  },
  //
  router: {
    // base: isProduction ? 'admin/' : '/',
    middleware: ["auth"]
  }
} as Configuration
