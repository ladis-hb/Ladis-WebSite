<template>
  <b-container fluid class=" h-100  m-0 p-0">
    <b-row class=" h-100">
      <b-col cols="12" md="2" class="bg-info border-top text-center p-3">
        <b-nav vertical id="nav">
          <b-nav-item
            :to="{
              path: '/readme',
            }"
            >使用说明</b-nav-item
          >
          <b-nav-item :to="{ name: 'index-news' }">新闻资讯</b-nav-item>
          <b-nav-item :to="{ name: 'index-case' }">案例管理</b-nav-item>
          <b-nav-item :to="{ name: 'index-buy' }">经销商管理</b-nav-item>
          <b-nav-item :to="{ name: 'index-about' }">相关管理</b-nav-item>
          <b-nav-item-dropdown text="服务支持">
            <b-dropdown-item
              :to="{
                name: 'index-down',
                query: { index: 0 },
              }"
              >软件</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'index-down',
                query: { index: 1 },
              }"
              >彩页</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'index-down',
                query: { index: 3 },
              }"
              >视频教程</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'index-down',
                query: { index: 4 },
              }"
              >常见问题</b-dropdown-item
            >
            <b-dropdown-item
              :to="{
                name: 'index-down',
                query: { index: 2 },
              }"
              >资质</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'index-product' }">产品分类</b-nav-item>
          <b-nav-item-dropdown text="首页管理">
            <b-dropdown-item :to="{ name: 'index-carousel' }"
              >轮播图</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'index-picSource' }">素材管理</b-nav-item>
          <b-nav-item>
            <b-button v-b-modal.modal-1 variant="info">
              已选素材
              <b-badge pill>{{ SourceFile.length }}</b-badge>
            </b-button>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col class="p-5 overflow-auto mh-100">
        <b-overlay :show="$apollo.loading">
          <transition>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </b-overlay>
      </b-col>
    </b-row>
    <b-modal id="modal-1" title="已选素材" cancel-disabled>
      <b-list-group>
        <b-list-group-item
          v-for="file in SourceFile || []"
          :key="file.name"
          v-b-toggle="'pic' + file.name"
          >{{ file.name }}
          <b-collapse
            :id="'pic' + file.name"
            visible
            accordion="my-accordion2"
            role="tabpanel"
          >
            <b-card v-if="file.filetype === 'img'">
              <b-card-img-lazy
                :src="file.path"
                :alt="file.path"
              ></b-card-img-lazy>
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
    </b-modal>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { selectFiles } from '../server/typing/interface'
export default Vue.extend({
  layout: 'login',
  computed: {
    SourceFile(): selectFiles[] {
      return this.$store.state.SourceFile
    },
  },
})
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
