<template>
  <b-container fluid class="p-0 m-0 ladis-body">
    <b-row no-gutters id="main" class="ladis-body flex-grow-1 d-flex flex-row">
      <b-col cols="12">
        <ladis-head></ladis-head>
        <nuxt class="ladis-body"></nuxt>
      </b-col>
      <b-col cols="12" id="footer" class=" d-flex flex-column-reverse">
        <ladis-footer></ladis-footer>
        <ladis-section></ladis-section>
      </b-col> </b-row
    ><!-- <b-row no-gutters class=" mt-auto">
      <b-col cols="12" id="footer">
        <ladis-section></ladis-section>
        <ladis-footer></ladis-footer>
      </b-col>
    </b-row> -->
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

<style scss>
/* html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
} */
html {
  height: 100%;
}
body,
#__nuxt,
#__layout {
  height: 100%;
}

.ladis-body {
  height: 100%;
}
</style>
