<template>
  <b-container>
    <b-row id="products_345">
      <b-col cols="12" class="breadcrumb_345">
        <h3 class="p-4">预览</h3>
      </b-col>
      <b-col cols="12">
        <h4 class="text-capitalize">{{ title }}</h4>
      </b-col>
      <b-col cols="12" md="7" class="carousel">
        <b-carousel
          id="carousel-345"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <b-carousel-slide
            v-for="(val, key) in carouselPics"
            :key="key"
            :img-src="val"
          ></b-carousel-slide>
        </b-carousel>
      </b-col>

      <b-col cols="12" md="5" class="t1">
        <div v-html="content_head"></div>
      </b-col>
      <b-col cols="12 border-top mt-5">
        <div v-html="content_body"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content_head: "",
      content_body: "",
      carouselPics: []
    };
  },
  mounted() {
    
    
    let query = this.$route.params;
    console.log(query);
    this.title = query.title;
    this.carouselPics = query.carouselPic;
    this.content_head = query.content_head;
    this.content_body = query.content_body;
  }
};
</script>

<style lang="scss" scoped>
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
