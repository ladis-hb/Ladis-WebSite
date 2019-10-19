<template>
  <b-container>
    <b-row no-gutters class=" h-100">
      <b-col cols="12" md="2" class="list bg-info">
        <b-navbar toggleable="lg" type="dark" variant="info" style="padding:0">
          <b-navbar-toggle target="list-collapse"></b-navbar-toggle>
          <b-collapse id="list-collapse" is-nav>
            <b-navbar-nav vertical>
              <b-nav-item>
                <h3>{{ $t("index.j8it8b") }}</h3>
              </b-nav-item>
            </b-navbar-nav>
            <div v-for="(val, key) in list" :key="key">
              <b-navbar-nav variant="dark">
                <b-nav-item :to="{ path: `/products/${val.title}` }">{{
                  val.title
                }}</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-for="(val1, key1) in val.args" :key="key1">
                <b-nav-item :to="{ path: `/products/${val1.title}` }">{{
                  val1.title
                }}</b-nav-item>
              </b-navbar-nav>
            </div>
            <hr />
          </b-collapse>
        </b-navbar>
      </b-col>
      <b-col cols="12" md="10" class=" h-100 overflow-auto">
        <b-row no-gutters>
          <b-col
            cols="12"
            md="4"
            v-for="(val, key) in all"
            :key="key"
            class="p-4"
          >
            <b-card>
              <b-card-img :src="val.img" :alt="val.title"></b-card-img>
              <b-link :to="{ path: val.href }" class=" text-dark">{{
                val.title
              }}</b-link>
            </b-card>
          </b-col>
        </b-row>
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
      /* var head = await $axios.$get(
        "/api/Get_head?title=" + encodeURI(params.id)
      );
      head = head.data; */
    }
    return { list, params, all };
  },

  created() {
    //console.log(this.all)
    //console.log(this.head)
  },

  head() {
    return {
      title: this.params.id,
      meta: [
        { name: "keywords", content: this.params.id },
        { name: "description", content: this.params.id }
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
