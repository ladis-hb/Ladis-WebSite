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
            <template slot="button-content"
              ><em>产品分类</em></template
            >
            <b-dropdown-item :to="{ path: '/products/' }"
              >所有产品</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/products/UPS电源' }"
              >UPS电源</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/products/数据中心' }"
              >数据中心</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/products/机房空调' }"
              >机房空调</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content"
              ><em>服务支持</em></template
            >
            <b-dropdown-item :to="{ path: '/support/' }"
              >服务支持</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/监控软件下载' }"
              >监控软件下载</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/产品彩页说明' }"
              >产品彩页说明</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/证书资质' }"
              >证书资质</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/常见问题' }"
              >常见问题</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/视频教程' }"
              >视频教程</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/support/维修服务' }"
              >维修服务</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template slot="button-content"
              ><em>购买指南</em></template
            >
            <b-dropdown-item :to="{ path: '/buy/' }"
              >销售服务中心</b-dropdown-item
            >
            <b-dropdown-item href="https://leidisi.tmall.com/" target="_blank"
              >天猫旗舰店</b-dropdown-item
            >
            <b-dropdown-item
              href="https://mall.jd.com/index-131620.html"
              target="_blank"
              >京东旗舰店</b-dropdown-item
            >
            <b-dropdown-item href="https://lgsm.tmall.com/" target="_blank"
              >蓝光数码专营店</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item :to="{ path: '/vr/' }">全景展示</b-nav-item>
          <b-nav-item :to="{ path: '/case/' }">成功案例</b-nav-item>
          <!-- <b-nav-item-dropdown right>
            <template slot="button-content"
              ><em>成功案例</em></template
            >
            <b-dropdown-item :to="{ path: '/case/' }">所有案例</b-dropdown-item>
            <b-dropdown-item href="#">UPS电源</b-dropdown-item>
            <b-dropdown-item href="#">数据中心</b-dropdown-item>
            <b-dropdown-item href="#">机房空调</b-dropdown-item>
            <b-dropdown-item href="#">更多案例</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <template slot="button-content"
              ><em>关于我们</em></template
            >
            <b-dropdown-item :to="{ path: '/about/' }"
              >公司简介</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/about/' }"
              >服务承诺</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/about/' }"
              >经营理念</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/buy/' }"
              >经销商列表</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/buy/' }"
              >销售服务中心</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/news/' }"
              >新闻资讯</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/about/' }"
              >联系我们</b-dropdown-item
            >
            <b-dropdown-item :to="{ path: '/about/' }"
              >加入我们</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "ladis-head"
};
</script>
