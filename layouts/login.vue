<template>
  <div class=" d-flex flex-column h-100 overflow-hidden">
    <div class=" bg-info p-2 d-flex flex-row align-items-center">
      <h4 class=" text-light text-center ml-3 mb-0">官网资讯发布</h4>
      <b-nav align="right" class=" ml-auto">
        <b-nav-item>
          <strong class="">{{
            $i18n.locale === "zh" ? "中文编辑模式" : "英文编辑模式"
          }}</strong>
        </b-nav-item>
        <b-nav-item href="/">官网主页</b-nav-item>
        <b-nav-item v-if="!$auth.loggedIn" :to="{ path: '/admin/register' }"
          >注册</b-nav-item
        >
        <b-nav-item v-if="$auth.loggedIn">{{ $auth.user }}</b-nav-item>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em class=" text-light">{{ $t("head.vix4n3") }}</em>
          </template>
          <b-dropdown-item
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="Setlang(locale.code)"
            >{{ locale.name }}</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item v-if="$auth.loggedIn" @click="$auth.logout('local')"
          >退出登录</b-nav-item
        >
      </b-nav>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped>
li {
  a {
    color: aliceblue;
  }
}
</style>
