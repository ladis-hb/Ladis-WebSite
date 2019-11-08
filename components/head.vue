<template>
  <!-- <div class=" head-h">

  </div> -->
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">
      <img src="/a_images/public/logo.png" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ $t("head.pneaqh") }}</em>
          </template>
          <b-dropdown-item href="/products/">{{
            $t("head.spa5wv")
          }}</b-dropdown-item>
          <b-dropdown-item href="/products/UPS电源">{{
            $t("head.oa0e4r")
          }}</b-dropdown-item>
          <b-dropdown-item href="/products/数据中心">{{
            $t("head.1t6jqi")
          }}</b-dropdown-item>
          <b-dropdown-item href="/products/机房空调">{{
            $t("head.odglin")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ $t("head.lcnmgn") }}</em>
          </template>
          <b-dropdown-item href="/support/">{{
            $t("head.g4jhzj")
          }}</b-dropdown-item>
          <b-dropdown-item href="/support/监控软件下载">{{
            $t("head.98cjrs")
          }}</b-dropdown-item>
          <b-dropdown-item href="/support/产品彩页说明">{{
            $t("head.7d0ctl")
          }}</b-dropdown-item>
          <b-dropdown-item href="/support/证书资质">{{
            $t("head.dqsax9")
          }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/support/常见问题">{{
            $t("head.zqdzou")
          }}</b-dropdown-item>
          <b-dropdown-item href="/support/视频教程">{{
            $t("head.vq1hew")
          }}</b-dropdown-item>
          <b-dropdown-item href="/support/维修服务">{{
            $t("head.z3w3pi")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ $t("head.pku7s6") }}</em>
          </template>
          <b-dropdown-item href="/buy" v-if="localSite">{{ $t("head.azg9np") }}</b-dropdown-item>
          <b-dropdown-divider  v-if="localSite"></b-dropdown-divider>
          <b-dropdown-item href="https://leidisi.tmall.com/" target="_blank">{{
            $t("head.1cufnl")
          }}</b-dropdown-item>
          <b-dropdown-item
            href="https://mall.jd.com/index-131620.html"
            target="_blank"
            >{{ $t("head.kj9sli") }}</b-dropdown-item
          >
          <b-dropdown-item href="https://lgsm.tmall.com/" target="_blank">{{
            $t("head.4ggyxs")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="/vr/">{{ $t("head.yiyt7o") }}</b-nav-item>
        <b-nav-item href="/case/">{{ $t("head.ekilla") }}</b-nav-item>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ $t("head.n5tjum") }}</em>
          </template>

          <b-dropdown-item href="/buy/" v-if="localSite">{{
            $t("head.028ccn")
          }}</b-dropdown-item>
          <b-dropdown-item href="/buy/" v-if="localSite">{{
            $t("head.vy3lqf")
          }}</b-dropdown-item>
          <b-dropdown-item href="/news/">{{
            $t("head.t1vwuq")
          }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/about/公司简介">{{
            $t("head.2mff1f")
          }}</b-dropdown-item>
          <b-dropdown-item href="/about/服务承诺">{{
            $t("head.n4jshj")
          }}</b-dropdown-item>
          <b-dropdown-item href="/about/经营理念">{{
            $t("head.aabk1p")
          }}</b-dropdown-item>

          <b-dropdown-item href="/about/联系我们">{{
            $t("head.i05srl")
          }}</b-dropdown-item>
          <b-dropdown-item href="/about/加入我们">{{
            $t("head.yvtl7f")
          }}</b-dropdown-item>
          <b-dropdown-item href="/about/使用声明">{{
            $t("footer.amhzvr")
          }}</b-dropdown-item>
          <b-dropdown-item href="/about/隐私政策">{{
            $t("footer.5d7lkm")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ $t("head.vix4n3") }}</em>
          </template>
          <b-dropdown-item
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="Setlang(locale.code)"
            >{{ locale.name }}</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item
          href="https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1DER4Qq&scene=SCE00003943#/"
          target="_blank"
          >{{ $t('head.vnvsqr') }}</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar> 
</template>
<script>
export default {
  name: "ladis-head",
  
  methods: {
    Setlang(lang) {
      this.$i18n.setLocaleCookie(lang);
      //location.reload();
      this.$router.push(this.switchLocalePath(lang));
    }
  },
  computed: {
    localSite() {
      return this.$store.state.localSite 
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  }
};
</script>
<style scoped>
.nav-h {
  height: 56px;
  z-index: 100;
}
.head-h {
  height: 56px;
}
</style>
