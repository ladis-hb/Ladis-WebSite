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
            <div v-for="(val, key) in list" :key="key">
              <b-navbar-nav variant="dark">
                <b-nav-item :href="val.href">{{ val.title }}</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-for="(val1, key1) in val.args" :key="key1">
                <b-nav-item :href="val1.href">{{ val1.title }}</b-nav-item>
              </b-navbar-nav>
            </div>
            <hr />
          </b-collapse>
        </b-navbar>
      </div>
      <b-col>
        <div class="main1">
          <div v-for="(val, key) in all" :key="key">
            <b-link :to="{ path: val.href }">
              <b-card
                :sub-title="val.title"
                :img-src="pig(val.img)"
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
  async asyncData({ $axios, params, error, payload }) {
    var list = await $axios.$get("/api/Products_list");
    if (payload) {
      var all = payload.data;
      var head = payload.head;
    } else {
      var all = await $axios.$get(
        `/api/Get_arg?title=${encodeURI(params.id)}&table=Product`
      );
      all = all.data;
      var head = await $axios.$get(
        "/api/Get_head?title=" + encodeURI(params.id)
      );
      head = head.data;
    }
    return { list, params, all, head };
  },

  created() {
    //console.log(this.all)
    //console.log(this.head)
  },

  head() {
    return {
      title: this.head.title,
      meta: [
        { name: "keywords", content: this.head.keywords },
        { name: "description", content: this.head.description }
      ]
    };
  },

  methods: {
    pig(p) {
      return p;
    }
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
