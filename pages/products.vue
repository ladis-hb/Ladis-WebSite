<template>
  <b-container>
    <b-row no-gutters class="h-100">
      <b-col cols="12" md="2" class="list">
        <b-navbar
          toggleable="lg"
          type="dark"
          variant="info"
          style="padding:0"
          class=" bg-info"
        >
          <b-navbar-toggle target="list-collapse"></b-navbar-toggle>
          <b-collapse id="list-collapse" is-nav>
            <b-navbar-nav vertical>
              <b-nav-item to="/products">
                <h3>{{ $t("index.j8it8b") }}</h3>
              </b-nav-item>
            </b-navbar-nav>
            <div v-for="(val, key) in list" :key="key">
              <b-navbar-nav variant="dark">
                <b-nav-item :href="`/products/${val.title}`">
                  {{ val.title }}
                </b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-for="(val1, key1) in val.args" :key="key1">
                <b-nav-item :href="`/products/${val1.title}`">
                  {{ val1.title }}
                </b-nav-item>
              </b-navbar-nav>
            </div>
            <hr />
          </b-collapse>
        </b-navbar>
      </b-col>
      <b-col class="h-100 overflow-auto">
        <nuxt-child />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    list() {
      let locale = this.$i18n.locale;
      let list = [
        {
          title: "UPS电源",
          args: [
            {
              title: "后备式UPS电源"
            },
            {
              title: "高频单相UPS电源"
            },
            {
              title: "高频三相UPS电源"
            },
            {
              title: "工频UPS电源"
            },
            {
              title: "机架式UPS电源"
            },
            {
              title: "模块化UPS电源"
            },
            {
              title: "UPS蓄电池"
            }
          ]
        },
        {
          title: "数据中心",
          args: [
            {
              title: "户外一体柜ETC"
            },
            {
              title: "微模块机房"
            },
            {
              title: "一体化机柜"
            },
            {
              title: "配电PDU"
            },
            {
              title: "动环监控"
            },
            {
              title: "网络机柜"
            }
          ]
        },
        {
          title: "机房空调",
          args: [
            {
              title: "房间空调"
            },
            {
              title: "列间空调"
            },
            {
              title: "机架空调"
            }
          ]
        }
      ];
      return list;
    }
  },
  /* async asyncData({ $axios, params }) {
    var list = await $axios.$get("/api/Products_list");
    return { list: list.data };
  }, */
  head: {
    title: "（LADS）品牌产品厂家【价格 型号 参数 图片】-雷迪司",
    meta: [
      {
        name: "keywords",
        content: "（LADS）品牌产品厂家【价格 型号 参数 图片】-雷迪司"
      },
      {
        name: "description",
        content:
          "雷迪司厂家生产商提供LADS品牌产品，包含LADS品牌产品品牌、参数、报价、价格、规格、大图片等，同时提供维修、维护、售后服务-深圳雷迪司科技股份有限公司"
      }
    ]
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
    .row {
      flex-direction: column;
    }
  }
  .main1 {
    .mw {
      max-width: 9rem;
    }
  }
}
.list {
  #list-collapse {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    align-items: flex-start;
    margin: 1rem;
    h3 {
      color: white;
      padding: 0.5rem;
      font-style: oblique;
      text-align: center;
    }
    a {
      color: aliceblue;
    }
  }
}

.main1 {
  display: flex;
  flex-flow: row wrap;
  div {
    margin: 1rem;
  }
  .mw {
    max-width: 17rem;
  }
}
</style>
