/* jshint esversion:8 */
const axios = require("axios");
module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  server: {
    port: 9000,
    host: "116.62.48.175"
  },
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      //{ rel:"stylesheet",type:'stylesheet',href:"https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css"}
    ],
    script: [
      //{src:"https://cdn.staticfile.org/jquery/3.3.1/jquery.js"},
      //{src:"https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"}
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
  ** Plugins to load before mounting the App

  */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",

    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  generate: {
    //subFolders: false,
    routes: function() {
      return axios.get("http://localhost:3000/api/GET_router").then(res => {
        return res.data;
      });
    }
  }
};
