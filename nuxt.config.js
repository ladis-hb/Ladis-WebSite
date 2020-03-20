module.exports = {
  mode: "spa",
  /*
   ** Headers of the page
   */
  server: {
    port: 9006,
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"
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
  css: [
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css"
  ],
  /*
  ** Plugins to load before mounting the App

  */
  plugins: [
    { src: "~plugins/nuxt-quill-plugin.js", ssr: false },
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
      login: "/login",
      logout: "/login",
      //callback: '/admin/edit',
      home: "/"
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
        httpEndpoint: 'http://127.0.0.1:9006',
        browserHttpEndpoint: '/graphql',
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
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  //
  router: {
    middleware: ["auth"]
  }
};
