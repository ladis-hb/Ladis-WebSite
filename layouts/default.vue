<template>
  <b-container fluid class="m-0 p-0 ladis-body">
    <b-row no-gutters class="ladis-body d-flex flex-row ">
      <b-col cols="12">
        <ladis-head></ladis-head>
      </b-col>
      <b-col cols="12" id="main" class="h-100 cdsxc">
        <nuxt class=" h-100"></nuxt>
      </b-col>
      <b-col cols="12" id="footer" class=" mt-auto">
        <ladis-section></ladis-section>
        <ladis-footer></ladis-footer>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ladisHead from "../components/head";
import ladisSection from "../components/section";
import ladisFooter from "../components/footer";
export default {
  components: {
    ladisHead,
    ladisSection,
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

<style>
/* html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
} */
html,
body,
#__nuxt,
#__layout,
.ladis-body {
  min-height: 100%;
}

</style>
