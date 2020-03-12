<template>
  <b-container fluid class="p-0 m-0 ladis-body d-flex flex-column">
    <b-row class="main-default" no-gutters>
      <b-col cols="12">
        <!-- head头 -->
        <ladis-head></ladis-head>
      </b-col>
    </b-row>
    <b-row class=" flex-grow-1" no-gutters>
      <b-col>
        <nuxt  class=" p-0"></nuxt>
      </b-col>
    </b-row>

    <!-- <div class="main-default">
      <ladis-head></ladis-head>
      <nuxt></nuxt>
    </div>
 -->
    <!-- footer -->
    <!-- <ladis-footer class=" mt-auto"></ladis-footer> -->
    <b-row class=" mt-auto" no-gutters>
      <b-col>
        <ladis-footer class=" mt-auto"></ladis-footer>
      </b-col>
    </b-row>
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
    /* flex: 1 0 auto; */
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
