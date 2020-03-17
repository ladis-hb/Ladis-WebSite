<template>
  <b-container fluid id="ladis-body" class="p-0 m-0 d-flex flex-column">
    <b-row class="main-default" no-gutters>
      <b-col cols="12">
        <!-- head头 -->
        <ladis-head></ladis-head>
      </b-col>
    </b-row>
    <b-row class="flex-grow-1" no-gutters>
      <b-col>
        <nuxt class=" p-0"></nuxt>
      </b-col>
    </b-row>
    <b-row no-gutters class=" ">
      <b-col>
        <ladis-footer></ladis-footer>
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
  head: {
    link: [
      {
        href: "//at.alicdn.com/t/font_1290509_iyq1zhprcvc.css",
        type: "text/css",
        rel: "stylesheet"
      }
    ]
  }
};
</script>

<style scss>
html{
  height: 100%;
}
body,
#__nuxt,
#__layout,
#ladis-body{
  min-height: 100%;
  display: flex;
  width: 100%;
}
</style>
