<template>
  <b-container fluid class="h-100 m-0 p-0">
    <b-row class="h-100">
      <b-col cols="12" md="2" class="bg-dark border-top text-center p-3">
        <b-nav vertical id="nav">
          <b-nav-item to="/admin/readme">使用说明</b-nav-item>
          <b-nav-item to="/admin/news">新闻资讯</b-nav-item>
          <b-nav-item to="/admin/case">案例管理</b-nav-item>
          <b-nav-item to="/admin/buy">经销商管理</b-nav-item>
          <b-nav-item to="/admin/about">相关管理</b-nav-item>
          <b-nav-item to="/admin/down">服务支持</b-nav-item>
          <b-nav-item to="/admin/product">产品分类</b-nav-item>
          <b-nav-item-dropdown text="首页管理">
            <b-dropdown-item to="/admin/carousel">轮播图</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/admin/">空编辑器</b-nav-item>
          <b-nav-item to="/admin/picSource">素材管理</b-nav-item>
          <b-nav-item>
            <b-button v-b-toggle.modal-1 variant="info">
              已选素材
              <b-badge pill>{{ SourceFile.length }}</b-badge>
            </b-button>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </b-col>
    </b-row>
    <b-sidebar id="modal-1" title="已选素材" bg-variant="dark" text-variant="light" shadow>
      <b-list-group>
        <b-list-group-item
          v-for="file in SourceFile || []"
          :key="file.name"
          v-b-toggle="'pic' + file.name"
          class="bg-dark text-light"
        >
          <b-badge>{{String(file.filetype).toLocaleUpperCase()}}</b-badge>
          {{file.name.split("__").pop() }}
          <b-collapse
            :id="'pic' + file.name"
            visible
            accordion="my-accordion2"
            role="tabpanel"
            class="bg-light"
          >
            <b-img-lazy v-if="file.filetype === 'img'" class="modalImg" :src="file.path"></b-img-lazy>
            <b-link v-else :href="file.path" class>{{file.path}}</b-link>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </b-container>
</template>
<script lang="ts">
import Vue from "vue";
import { selectFiles } from "../../types/typing";
export default Vue.extend({
  computed: {
    SourceFile(): selectFiles[] {
      let a = "";
      a.toLocaleUpperCase;
      return this.$store.state.SourceFile;
    }
  },
  scrollToTop:true,
  watchQuery:true
});
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
.modalImg {
  height: 200px;
  width: auto;
}
</style>
