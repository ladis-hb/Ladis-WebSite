<template>
  <b-container>
    <b-row no-gutters class="min-vh-100 overflow-auto">
      <b-col cols="12">
        <RouterRoad></RouterRoad>
      </b-col>
      <b-col cols="12" class="border-bottom">
        <h4 class="text-capitalize">{{ title }}</h4>
      </b-col>
      <b-col cols="12">
        <b-row no-gutters class="p-4">
          <b-col cols="12" md="6" class="carousel px-2">
            <b-carousel
              id="carousel-345"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide v-for="(val, key) in all.img" :key="key">
                <template v-slot:img>
                  <my-img :src="val" alt="Image 1"></my-img>
                  <!-- <b-img-lazy v-bind="mainProps" :src="val" alt="Image 1"></b-img-lazy> -->
                </template>
              </b-carousel-slide>
            </b-carousel>
          </b-col>
          <b-col cols="12" md="6" class="t1 px-2">
            <div class="ql-editor" v-html="all.t1.content" v-if="all.t1"></div>
            <div class="ql-editor" v-html="all.content_head" v-else></div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="p-5 border-top">
        <b-row>
          <b-col cols="12" class="mb-3">
            <strong>产品特点</strong>
          </b-col>
          <b-col cols="12" class="t2">
            <div v-html="all.t2.content" v-if="all.t2" class="t2-s content-img"></div>
            <div v-html="all.content_body" v-else class="content-img"></div>
          </b-col>
          <b-col cols="12" class="down" v-if="all.t2 && all.t2.type != 'html'">
            <h4>{{ $t("list._id.q9xyoe") }}</h4>
            <b-list-group>
              <b-list-group-item v-for="(val, key) in all.down" :key="key">
                <b-link target="_blank" :href="pic(val.href)">
                  {{
                  val.title
                  }}
                </b-link>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RouterRoad from "../../../components/RouterRoad";
import MyImg from "../../../components/MyImg";
export default {
  data() {
    return {
      items: [
        { text: "主页", href: "/" },
        { text: "所有产品", href: "/products" }
      ]
    };
  },
  components: {
    RouterRoad,
    MyImg
  },
  computed: {
    t1() {
      if (this.all.type == "html") return true;
    },
    t2() {
      if (typeof this.all.html.t2 == "string") return true;
    }
  },
  async asyncData({ $axios, params, error, payload }) {
    if (payload) {
      var all = payload.data;
      var head = payload.head;
    } else {
      var all = await $axios.$get(
        `/api/Get_arg?title=${encodeURI(params.id)}&table=Product_list`
      );
      var title = all.title;
      all = all.data;
    }
    return { params, title, all };
  },
  created() {
    //console.log(this.all);
  },

  methods: {
    onSlideStart() {},
    onSlideEnd() {},
    pic(p) {
      //return `http://www.ladis.com.cn/${p}`;
      return p;
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        { name: "keywords", content: this.title },
        { name: "description", content: this.title }
      ]
    };
  }
};
</script>

<style lang="scss">
img {
  max-width: 100%;
  height: auto;
}
.content-img img {
  max-width: 100%;
  margin: 10px;
}
#products_345 {
  width: 100%;
  margin: 0;
  .text-capitalize {
    border-bottom: inset 1px;
  }
  .breadcrumb_345 {
    margin: 0;
    padding: 0;
    .breadcrumb {
      background-color: white;
      a {
        color: black;
      }
      a:hover {
        color: green;
      }
    }
  }
  .carousel {
    padding: 0;
  }
  .t1 {
    padding: 1rem;
  }
  .t2 {
    margin: 1rem 0;
    border-top: inset 1px;
    border-bottom: inset 1px;
    padding: 1rem;
    .t2-s {
      display: flex;
      flex-flow: column nowrap;
    }
  }
  .down {
    padding-bottom: 2rem;
  }
}
</style>
