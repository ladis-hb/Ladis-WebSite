<template>
  <b-container fluid class=" h-100  m-0 p-0">
    <b-row class=" h-100">
      <b-col cols="12" md="2" class="bg-info border-top text-center p-3">
        <b-nav vertical id="nav">
          <b-nav-item
            :to="{
              path: '/readme'
            }"
            >使用说明</b-nav-item
          >
          <b-nav-item-dropdown text="新闻资讯">
            <b-dropdown-item
              :to="{
                path: '/index/news',
                query: { type: 'cto' }
              }"
              >企业新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/news',
                query: { type: 'hy' }
              }"
              >行业新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/news',
                query: { type: 'cp' }
              }"
              >产品新闻</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/news',
                query: { type: 'sv' }
              }"
              >服务通告</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="成功案例">
            <b-dropdown-item
              :to="{
                path: '/index/case',
                query: { type: 'power' }
              }"
              >UPS电源</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/case',
                query: { type: 'yth' }
              }"
              >一体化机柜</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/case',
                query: { type: 'dt' }
              }"
              >数据中心</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/case',
                query: { type: 'ac' }
              }"
              >机房空调</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ path: '/index/buy' }">经销商管理</b-nav-item>
          <b-nav-item :to="{ path: '/index/about' }">相关管理</b-nav-item>
          <b-nav-item-dropdown text="服务支持">
            <b-dropdown-item
              :to="{
                path: '/index/down',
                query: { index: 0 }
              }"
              >软件</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/down',
                query: { index: 1 }
              }"
              >彩页</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/down',
                query: { index: 2 }
              }"
              >视频教程</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/down',
                query: { index: 3 }
              }"
              >常见问题</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                path: '/index/down',
                query: { index: 4 }
              }"
              >资质</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'index-product' }"
            >产品分类</b-nav-item
          >
          <b-nav-item-dropdown text="首页管理">
            <b-dropdown-item :to="{ name: 'index-carousel' }"
              >轮播图</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'index-picSource' }"
            >素材管理</b-nav-item
          >
          <b-nav-item>
            <b-button v-b-modal.modal-1 variant="info">
              已选素材
              <b-badge pill>{{ SourceFile.length }}</b-badge>
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
    <b-modal id="modal-1" title="已选素材">
      <b-list-group>
        <b-list-group-item
          v-for="(img, key) in SourceFile"
          :key="key"
          v-b-toggle="'pic' + key"
          >{{ img.text }}
          <b-collapse
            :id="'pic' + key"
            visible
            accordion="my-accordion2"
            role="tabpanel"
          >
            <b-card>
              <b-card-img-lazy
                :src="img.value"
                :alt="img.value"
              ></b-card-img-lazy>
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
    </b-modal>
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
