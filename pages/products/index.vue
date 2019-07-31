<template>
  <b-container>
    <b-row>
      <div class="list">
        <b-navbar toggleable="lg" type="dark" variant="info" style="padding:0">
          <b-navbar-toggle target="list-collapse"></b-navbar-toggle>

          <b-collapse id="list-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>
                <h3>产品分类</h3>
              </b-nav-item>
            </b-navbar-nav>
            <div v-for="(val,key) in list" :key="key">
              <b-navbar-nav variant="dark">
                <b-nav-item :to="{path:`/products/${val.title}`}">{{val.title}}</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-for="(val1,key1) in val.args" :key="key1">
                <b-nav-item :to="{path:`/products/${val1.title}`}">{{val1.title}}</b-nav-item>
              </b-navbar-nav>
            </div>
            <hr />
          </b-collapse>
        </b-navbar>
      </div>
      <b-col>
        <div class="main1">
          <div v-for="(val,key) in all" :key="key">
            <b-link :to="{path:val.href}" >
              <b-card
              :sub-title="val.title"
              :img-src="val.img"
              :img-alt="val.title"
              img-top
              tag="article"
              class="mb-2 mw"
            ></b-card>
            </b-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ $axios }) {
    var list = await $axios.$get("/api/Products_list");
    var all = await $axios.$get("/api/Products_all");
    return { list, all };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped >
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
