<template>
  <div class="container-fluid ladis-body">
    <!-- head -->
    <div class="row" id="head">
      <div class="col-12 head-backcolor">
        <ladis-head></ladis-head>
      </div>
    </div>
    <!-- main -->
    <div class="main" id="main">
      <nuxt />
    </div>

    <!-- footer -->
    <div class="row afooter" id="footer" :class="{ afooter: collapse, afooterm: !collapse }">
      <div class="section">
        <div class="collp" v-b-toggle.demo1 @mouseenter="hover">
          <a class="a-collp">
            <i class="iconfont icon-icon_threeline_fill"></i>
          </a>
        </div>
        <b-collapse visible id="demo1">
          <ladis-section></ladis-section>
        </b-collapse>
      </div>

      <ladis-footer></ladis-footer>
    </div>
  </div>
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
  },
  methods: {
    hover() {
      this.$root.$emit("bv::toggle::collapse", "demo1");
    },
    leave() {}
  },
  mounted() {
    //注册监听折叠事件，collapseId折叠元素ID, isJustShown折叠事件boolean
    this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
      this.collapse = isJustShown;
    });
    this.hover();
  }
};
</script>

<style>
@media screen and (min-height: 700px) {
  html {
    height: 100%;
  }
}

body,
#__nuxt,
#__layout,
.ladis-body {
  height: 100%;
}
.ladis-body {
  display: flex;
  flex-flow: column wrap;
  margin: 0px;
  padding: 0px;
}

#head {
  display: flex;
  flex-direction: row;
  height: 76px;
  margin: 0px;
}
.head-backcolor {
  background-color: #343a40;
  z-index: 99;
}

.main {
  width: 100%;
  height: auto;
  flex: 1;
  margin: 0;
  display: flex;
  overflow: auto;
}
#footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
}
/* #section{
    width: 100%;
    height: 100px;
    bottom: 50;
    background-color: #333;
  } */
#demo1 {
  width: 100%;
}
.afooter {
  width: 100%;
  bottom: 0;
}
.afooterm {
  width: 100%;
  bottom: 0;
}
.collp {
  background-color: #343a40;
  width: 100%;
}

.section {
  width: 100%;
}
</style>
