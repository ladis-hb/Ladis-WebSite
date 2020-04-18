<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <div class="bg-dark p-2 d-flex flex-row align-items-center">
      <b-link to="/admin/">
        <h4 class="text-light text-center ml-3 mb-0">官网资讯发布</h4>
      </b-link>
      <b-nav align="right" class="ml-auto">
        <b-nav-item v-if="!$auth.loggedIn" to='/admin/register'>注册</b-nav-item>
        <b-nav-item v-if="$auth.loggedIn">
          <b-avatar variant="primary" size="sm"></b-avatar>
          {{ $auth.user }}
        </b-nav-item>
        <b-nav-item v-if="$auth.loggedIn" @click="$auth.logout('local')">退出登录</b-nav-item>
      </b-nav>
    </div>
    <nuxt />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  head: {
    title: "ladis网站后台"
  }
});
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}
li {
  a {
    color: aliceblue;
  }
}
</style>
