<template>
  <div class="carousel-main">
    <!-- carousel -->
    <div class="carousel">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        fade
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="(val, key) in carousel"
          :key="key"
          :caption="val.caption"
          :text="val.text"
          :img-src="val.src"
        ></b-carousel-slide>
      </b-carousel>
    </div>

    <!--  -->
    <div class="news">
      <b-link :to="{ path: '/news/' }">
        <b-img-lazy :src="news.title.src" />
      </b-link>

      <div class="news1">
        <!-- <a :href="news.newo.src">{{ news.newo.date }}{{ news.newo.text }}</a> -->
        <b-link :to="{ path: `/news/${news.newo.title}` }"
          >{{ news.newo.date }}{{ news.newo.title }}</b-link
        >
      </div>
    </div>

    <!-- after-sales -->
    <div class="after-sales">
      <div class="sales-title">
        <h2>售后支持</h2>
      </div>
      <div class="sales-body">
        <b-link href="" class="sales-li">
          <b-img-lazy
            src="/_CMS_NEWS_IMG_/2017-10/27/d71a90e4-b197-497b-80d6-abb20ac2a919.jpg"
          ></b-img-lazy>
        </b-link>
        <b-link href="" class="sales-li">
          <b-img-lazy
            src="/_CMS_NEWS_IMG_/2017-10/27/581b3273-d44f-4f43-8b09-24fee8a37af9.jpg"
          ></b-img-lazy>
        </b-link>
        <b-link href="" class="sales-li">
          <b-img-lazy
            src="/_CMS_NEWS_IMG_/2017-10/27/5ca0c263-3fd4-486f-923f-8f0762f1d161.jpg"
          ></b-img-lazy>
        </b-link>
      </div>
    </div>
  </div>

  <!--  -->
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      news: {
        num: 0,
        title: {
          href: "http://www.ladis.com.cn/news/index_2.shtml",
          src: "a_images/public/information.png"
        },
        newo: {
          date: "",
          text: "",
          src: ""
        }
      },
      swiperOption: {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      },
      carousel: [
        //text 文字内容 caption 标题
        {
          text: "",
          caption: "",
          src: "a_images/banner/banner01-pc.jpg"
        },
        {
          text: "",
          caption: "",
          src: "a_images/banner/banner02-pc.jpg"
        },
        {
          text: "",
          caption: "",
          src: "a_images/banner/banner03-pc.jpg"
        },
        {
          text: "",
          caption: "",
          src: "a_images/banner/banner04-pc.jpg"
        }
      ]
    };
  },
  async asyncData({ $axios }) {
    let GetNews = await $axios.$get("/api/Get_index_news_list");
    return { GetNews };
  },

  head: {
    title: "UPS电源_不间断电源_精密空调_机房一体化机柜_数据中心建设-雷迪司",
    meta: [
      {
        name: "keywords",
        content:
          "雷迪司,UPS,机房专用空调,UPS电源,不间断电源,机房空调,精密空调,微模块,模块化机房,数据中心,精密配电柜,UPS蓄电池,一体化机柜"
      },
      {
        name: "description",
        content:
          "雷迪司(LADS厂家官网)-提供UPS电源、不间断电源蓄电池、专用机房空调、恒温恒湿精密空调、机房精密配电柜、智能一体化机柜、动力环境监控、微模块化机房冷通道机柜等数据中心工程建设解决方案。研发、生产、维修：UPS不间断电源、UPS蓄电池、机房专用空调、恒温恒湿精密空调、柜式机房、动环监控系统、微模块化数据中心等机房一体化产品。销售服务中心遍及：北京市、上海、杭州、石家庄、合肥、成都、武汉、长沙、福州、厦门、南京、郑州、南昌、南宁、长沙、天津、济南、太原、西安、重庆、贵阳、昆明、兰州、宁夏、西宁、呼和浩特、乌鲁木齐、拉萨、沈阳等城市，机房装修建设就找深圳雷迪司科技股份有限公司"
      }
    ]
  },

  methods: {
    onSlideStart() {},
    onSlideEnd() {
      var n = this.news.num;
      if (n < this.GetNews.length) {
        this.news.newo = this.GetNews[n];
        this.news.num += 1;
      } else {
        this.news.num = 0;
      }
    }
  }
};
</script>

<style lang="scss">
.carousel-main {
  margin: 0;
  width: 100%;
}
.carousel {
  margin: 0;
  width: 100%;
  padding: 0;
}
.news {
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: #343a40;
  padding: 5px;
}
.news1 {
  margin-left: 1rem;
}

a:hover {
  color: yellowgreen;
}

.after-sales {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: auto;
  align-items: center;
  justify-items: center;
}
.sales-title {
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: dodgerblue;
}
.sales-body {
  display: flex;
  flex-flow: row;
  width: 100%;
}
.sales-li {
  width: 33%;
  img {
    max-width: 100%;
  }
}
</style>
