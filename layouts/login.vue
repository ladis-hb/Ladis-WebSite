<template>
  <div class=" d-flex flex-column h-100 overflow-hidden">
    <div class=" bg-info p-2 d-flex flex-row align-items-center">
      <h4 class=" text-light text-center ml-3 mb-0">官网资讯发布</h4>
      <b-nav align="right" class=" ml-auto">
        <b-nav-item href="/">官网主页</b-nav-item>
        <b-nav-item  v-if="!$auth.loggedIn"  :to="{ path: '/admin/register' }">注册</b-nav-item>
        <b-nav-item v-if="$auth.loggedIn" >{{$auth.user}}</b-nav-item>
        <b-nav-item v-if="$auth.loggedIn" @click="$auth.logout('local')">退出登录</b-nav-item>        
      </b-nav>
    </div>
    <nuxt/>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
li {
  a {
    color: aliceblue;
  }
}
</style>
