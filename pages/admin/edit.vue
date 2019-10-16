<template>
  <b-container fluid class="h-100 m-0 p-0">
    <b-row class="h-100 overflow-auto">
      <b-col cols="12" md="2" class="h-100 bg-info border-top text-center p-3">
        <b-nav vertical id="nav">
          <b-nav-item-dropdown text="新闻资讯">
            <b-dropdown-item
              :to="{
                path: '/admin/edit/news',
                query: { type: 'cto' }
              }"
              >企业新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/news',
                query: { type: 'hy' }
              }"
              >行业新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/news',
                query: { type: 'cp' }
              }"
              >产品新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/news',
                query: { type: 'sv' }
              }"
              >服务通告</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="成功案例">
            <b-dropdown-item
              :to="{
                path: '/admin/edit/case',
                query: { type: 'power' }
              }"
              >UPS电源</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/case',
                query: { type: 'yth' }
              }"
              >一体化机柜</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/case',
                query: { type: 'dt' }
              }"
              >数据中心</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/case',
                query: { type: 'ac' }
              }"
              >机房空调</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ path: '/admin/edit/buy' }">经销商管理</b-nav-item>
          <b-nav-item-dropdown text="服务支持">
            <b-dropdown-item
              :to="{
                path: '/admin/edit/down',
                query: { index: 0 }
              }"
              >软件</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/down',
                query: { index: 1 }
              }"
              >彩页</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/down',
                query: { index: 2 }
              }"
              >视频教程</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/down',
                query: { index: 3 }
              }"
              >常见问题</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/admin/edit/down',
                query: { index: 4 }
              }"
              >资质</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ path: '/admin/edit/product' }"
            >产品分类</b-nav-item
          >
          <b-nav-item-dropdown text="首页管理">
            <b-dropdown-item :to="{ path: '/admin/edit/carousel' }"
              >轮播图</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ path: '/admin/edit/picSource' }"
            >素材管理</b-nav-item
          >
          <b-nav-item>
            已选素材
            <b-button pill variant="dark">
              {{ SourceFile.length }}
            </b-button>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col class="p-5 overflow-auto mh-100">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: "login",
  //nuxtI18n: false,
  computed: {
    SourceFile() {
      return this.$store.state.SourceFile;
    }
  },
  mounted() {
    let user = sessionStorage.getItem("user");
    let token = sessionStorage.getItem("token");
    //console.log({ user, token });
    if (!user || !token) {
      this.$router.push({ path: "/admin/accont" });
    } else {
      this.$store.commit("setUser", user);
      this.$store.commit("setToken", token);
    }
  }
};
</script>

<style lang="scss" scope>
#nav {
  span,
  a {
    color: aliceblue;
  }
  .dropdown-item {
    color: black;
  }
}
</style>
