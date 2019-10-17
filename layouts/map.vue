<template>
  <b-container fluid class=" pl-0 pr-3">
    <b-nav class=" bg-info  text-center">
      <h3 class=" text-light  m-3">网站地图</h3>
      <b-link class=" float-right" to="/"
        ><h3 class=" text-light  m-3">官网主页</h3></b-link
      >
    </b-nav>
    <b-row>
      <b-col cols="12">
        <nuxt />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head: {
    title: "网站地图",
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

<style lang="scss" scoped></style>
