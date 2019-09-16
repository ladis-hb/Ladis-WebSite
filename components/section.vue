<template>
  <div class="section ">
    <div class="col-12">
      <div class="row">
        <div class="col-6 colsm-2 " v-for="(val, key) in list" :key="key">
          <ul>
            <li>
              <strong>{{ key }}</strong>
            </li>
            <li v-for="(val1, key1) in val" :key="key1">
              <a :href="val1.href" :target="val1.target">{{ val1.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ladis-section",
  data() {
    return {
      list: {
        产品系列: [
          {
            title: "UPS电源",
            href: "/products/UPS电源"
          },
          {
            title: "数据中心",
            href: "/products/数据中心"
          },
          {
            title: "机房空调",
            href: "/products/机房空调"
          }
        ],
        服务支持: [
          {
            title: "服务中心",
            href: "/buy"
          },
          {
            title: "相关下载",
            href: "/support/"
          },
          {
            title: "常见问题",
            href: "/support/常见问题"
          }
        ],
        购买指南: [
          {
            title: "经销商查询",
            href: "/buy/"
          },
          {
            title: "蓝光数码专营店",
            href: "https://lgsm.tmall.com/",
            target: "_bank"
          },
          {
            title: "雷迪司天猫旗舰店",
            href: "https://leidisi.tmall.com/",
            target: "_bank"
          },
          {
            title: "雷迪司京东旗舰店",
            href: "https://leidisi.tmall.com/",
            target: "_bank"
          }
        ],
        关于雷迪司: [
          {
            title: "公司简介",
            href: "/about/"
          },
          {
            title: "新闻资讯",
            href: "/news/"
          }
        ],
        关联网站: [
          {
            title: "云监控平台",
            href: "http://www.pesiv.com",
            target: "_bank"
          },
          {
            title: "新版云监控平台",
            href: "http://116.62.48.175:81",
            target: "_bank"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
@media (min-width: 576px) {
  .colsm-2 {
    flex: 0 0 20%;
    max-width: 20%;
    height: fit-content;
  }
}

* {
  color: rgba(255, 255, 255, 0.5);
}
.section {
  height: min-content;
  width: 100%;
  background-color: #333;
  padding: 10px 25px;
}
.main {
  width: 100%;
}
.col-20 {
  width: 17%;
  border-right: ridge 1px;
  margin: 5px;
}
a:hover {
  color: white;
}
</style>
