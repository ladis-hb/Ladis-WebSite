<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">
        <img src="/a_images/public/logo.png" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ $t("head.pneaqh") }}</em>
            </template>
            <b-dropdown-item :to="{ path: '/products/' }">{{
              $t("head.spa5wv")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/products/UPS电源' }">{{
              $t("head.oa0e4r")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/products/数据中心' }">{{
              $t("head.1t6jqi")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/products/机房空调' }">{{
              $t("head.odglin")
            }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ $t("head.lcnmgn") }}</em>
            </template>
            <b-dropdown-item :to="{ path: '/support/' }">{{
              $t("head.g4jhzj")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/监控软件下载' }">{{
              $t("head.98cjrs")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/产品彩页说明' }">{{
              $t("head.7d0ctl")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/证书资质' }">{{
              $t("head.dqsax9")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/常见问题' }">{{
              $t("head.zqdzou")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/视频教程' }">{{
              $t("head.vq1hew")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/support/维修服务' }">{{
              $t("head.z3w3pi")
            }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ $t("head.pku7s6") }}</em>
            </template>
            <b-dropdown-item :to="{ path: '/buy/' }">{{
              $t("head.azg9np")
            }}</b-dropdown-item>
            <b-dropdown-item
              href="https://leidisi.tmall.com/"
              target="_blank"
              >{{ $t("head.1cufnl") }}</b-dropdown-item
            >
            <b-dropdown-item
              href="https://mall.jd.com/index-131620.html"
              target="_blank"
              >{{ $t("head.kj9sli") }}</b-dropdown-item
            >
            <b-dropdown-item href="https://lgsm.tmall.com/" target="_blank">{{
              $t("head.4ggyxs")
            }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item :to="{ path: '/vr/' }">{{
            $t("head.yiyt7o")
          }}</b-nav-item>
          <b-nav-item :to="{ path: '/case/' }">{{
            $t("head.ekilla")
          }}</b-nav-item>
          <!-- <b-nav-item-dropdown right>
            <template slot="button-content"
              ><em>成功案例</em></template
            >
            <b-dropdown-item :to="{ path: '/case/' }">所有案例</b-dropdown-item>
            <b-dropdown-item href="#">UPS电源</b-dropdown-item>
            <b-dropdown-item href="#">数据中心</b-dropdown-item>
            <b-dropdown-item href="#">机房空调</b-dropdown-item>
            <b-dropdown-item href="#">更多案例</b-dropdown-item>
          </b-nav-item-dropdown>-->

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ $t("head.n5tjum") }}</em>
            </template>
            <b-dropdown-item :to="localePath({ path: '/about/' })">{{
              $t("head.2mff1f")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/about/' }">{{
              $t("head.n4jshj")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/about/' }">{{
              $t("head.aabk1p")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/buy/' }">{{
              $t("head.028ccn")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/buy/' }">{{
              $t("head.vy3lqf")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/news/' }">{{
              $t("head.t1vwuq")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/about/' }">{{
              $t("head.i05srl")
            }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/about/' }">{{
              $t("head.yvtl7f")
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
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
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
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  }
};
</script>
