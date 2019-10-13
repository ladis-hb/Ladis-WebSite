<template>
  <div class="section">
    <div class="col-12">
      <div class="row">
        <div class="col-6 colsm-2" v-for="(val, key) in list" :key="key">
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
        [this.$t("section.gk11oe")]: [
          {
            title: this.$t("section.4t9bzs"),
            href: "/products/UPS电源"
          },
          {
            title: this.$t("section.4r35dn"),
            href: "/products/数据中心"
          },
          {
            title: this.$t("section.f7h57b"),
            href: "/products/机房空调"
          }
        ],
        [this.$t("section.q5vjss")]: [
          {
            title: this.$t("section.ps0tuh"),
            href: "/buy"
          },
          {
            title: this.$t("section.y2a257"),
            href: "/support/"
          },
          {
            title: this.$t("section.o5n0th"),
            href: "/support/常见问题"
          }
        ],
        [this.$t("section.21ws8d")]: [
          {
            title: this.$t("section.u7wjbw"),
            href: "/buy/"
          },
          {
            title: this.$t("section.6v39gj"),
            href: "https://lgsm.tmall.com/",
            target: "_bank"
          },
          {
            title: this.$t("section.k9mydj"),
            href: "https://leidisi.tmall.com/",
            target: "_bank"
          },
          {
            title: this.$t("section.pfuunc"),
            href: "https://leidisi.tmall.com/",
            target: "_bank"
          }
        ],
        [this.$t("section.567cgp")]: [
          {
            title: this.$t("section.v0otza"),
            href: "/about/"
          },
          {
            title: this.$t("section.qis2vp"),
            href: "/news/"
          }
        ],
        [this.$t("section.ri1giq")]: [
          {
            title: this.$t("section.l7qkwb"),
            href: "http://www.pesiv.com",
            target: "_bank"
          },
          {
            title: this.$t("section.wkyimq"),
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
