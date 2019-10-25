<template>
  <b-container fluid class="p-0 m-0 ladis-body d-flex flex-column">
    <div class="main-default">
      <!-- head头 -->
      <ladis-head></ladis-head>
      <!-- main主体 -->
      <nuxt></nuxt>
    </div>

    <!-- footer -->
    <ladis-footer class=" mt-auto"></ladis-footer>
  </b-container>
</template>

<script>
import ladisHead from "../components/head";
import ladisFooter from "../components/footer";
export default {
  components: {
    ladisHead,
    ladisFooter
  },
  data() {
    return {
      collapse: true
    };
  },

  head: {
    link: [
      {
        href: "//at.alicdn.com/t/font_1290509_iyq1zhprcvc.css",
        type: "text/css",
        rel: "stylesheet"
      }
      /* {href:'@assets/css/index.scss',type:'text/css',rel:"stylesheet"} */
    ]
  }
};
</script>

<style scss>
@media screen and (min-width: 768px) {
  .main-default {
    flex: 1 0 auto;
  }
}
/* @media screen and (max-width: 989px) {
  .footer-default {
    margin-top: auto;
  }
} */

html,
body,
#__nuxt,
#__layout,
.ladis-body {
  height: 100%;
}
</style>
