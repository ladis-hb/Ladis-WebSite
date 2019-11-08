<template>
  <b-row no-gutters>
    <b-col cols="12">
      <b-row no-gutters class=" bg-dark px-4 pt-3 pb-0">
        <b-col cols="12" md="2">
          <ul>
            <li>
              <strong>{{ $t("section.gk11oe") }}</strong>
            </li>
            <li>
              <a href="/products/UPS电源">{{ $t("section.4t9bzs") }}</a>
            </li>
            <li>
              <a href="/products/数据中心">{{ $t("section.4r35dn") }}</a>
            </li>
            <li>
              <a href="/products/机房空调">{{ $t("section.f7h57b") }}</a>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="2">
          <ul>
            <li>
              <strong>{{ $t("section.q5vjss") }}</strong>
            </li>
            <li v-if="localSite">
              <a href="/buy" v-if="localSite">{{ $t("section.ps0tuh") }}</a>
            </li>
            <li>
              <a href="/support/">{{ $t("section.y2a257") }}</a>
            </li>
            <li>
              <a href="/support/常见问题">{{ $t("section.o5n0th") }}</a>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="2">
          <ul>
            <li>
              <strong>{{ $t("section.21ws8d") }}</strong>
            </li>
            <li v-if="localSite">
              <a href="/buy" >{{ $t("section.u7wjbw") }}</a>
            </li>
            <li>
              <a href="https://lgsm.tmall.com/">{{ $t("section.6v39gj") }}</a>
            </li>
            <li>
              <a href="https://leidisi.tmall.com/" target="_bank">{{
                $t("section.k9mydj")
              }}</a>
            </li>
            <li>
              <a href="https://leidisi.tmall.com/" target="_bank">{{
                $t("section.pfuunc")
              }}</a>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="2">
          <ul>
            <li>
              <strong>{{ $t("section.567cgp") }}</strong>
            </li>
            <li>
              <a href="/about/公司简介">{{ $t("section.v0otza") }}</a>
            </li>
            <li>
              <a href="/news/">{{ $t("section.qis2vp") }}</a>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="2">
          <ul>
            <li>
              <strong>{{ $t("section.ri1giq") }}</strong>
            </li>
            <li>
              <a href="http://www.pesiv.com" target="_bank">{{
                $t("section.l7qkwb")
              }}</a>
            </li>
            <li>
              <a href="http://116.62.48.175:81" target="_bank">{{
                $t("section.wkyimq")
              }}</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12">
      <div class=" bg-dark p-2 d-flex flex-row flex-wrap">
        <b-link href="/sitemap">{{ $t("footer.9c708c") }}</b-link>
        <b-link href="/about/联系我们">{{ $t("footer.fp5qvs") }}</b-link>
        <b-link href="/about/加入我们">{{ $t("footer.ce1e0h") }}</b-link>
        <b-link href="/about/使用声明">{{ $t("footer.amhzvr") }}</b-link>
        <b-link href="/about/隐私政策">{{ $t("footer.5d7lkm") }}</b-link>
        <span class=" ml-auto">
          <span> <em>© 2019 All Rights Reserved</em> 雷迪司 </span>
          <span>
            &nbsp; 浙
            <em>ICP</em>备
            <em>09040710号</em>
          </span>
        </span>
      </div>
    </b-col>
  </b-row>
  <!--  -->
</template>

<script>
export default {
  name: "ladis-footer",
  computed: {
    localSite() {
      return this.$store.state.localSite;
    }
  }
};
</script>

<style scoped>
@media (min-width: 576px) {
  .colsm-2 {
    flex: 0 0 20%;
    max-width: 20%;
    height: fit-content;
  }
}

* {
  color: rgba(255, 255, 255, 0.5);
}
.section {
  height: min-content;
  width: 100%;
  background-color: #333;
  padding: 10px 25px;
}
.main {
  width: 100%;
}
.col-20 {
  width: 17%;
  border-right: ridge 1px;
  margin: 5px;
}
a:hover {
  color: white;
}
em,
span,
a {
  color: aliceblue;
}
</style>
