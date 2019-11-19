<template>
  <b-row no-gutters>
    <b-col cols="12">
      <b-carousel
        id="carousel-1"
        :interval="3000"
        fade
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-end="swithProblem"
      >
        <b-carousel-slide
          v-for="(val, key) in carousel"
          :key="key"
          :img-src="val"
        ></b-carousel-slide>
      </b-carousel>
    </b-col>
    <b-col cols="12" class="bg-dark p-1">
      <b-row no-gutters class>
        <b-col md="6" class="d-none d-sm-block d-md-block px-3">
          <b-link :href="'/news/'" class="float-right">
            <b-img :src="problemsrc" />
          </b-link>
        </b-col>
        <b-col class="d-flex align-items-center">
          <b-link
            :href="`/news/${problemTitle}`"
            class="text-light stretched-link"
          >
            {{ problemTitle }}
          </b-link>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" md="4" v-for="(val, key) in imgLinks" :key="key" >
      <b-link :href="val.href" class="text-decoration-none">
        <div class="d-flex flex-row">
          <b-img :src="val.src" :alt="val.title" class="w-50 d-inline"></b-img>
          <span class="d-flex flex-column p-4">
            <h5 class="text-primary">{{ val.title }}</h5>
            <span class="flex-grow-1 text-dark">
              <p class="m-0 p-0" v-for="(text, key) in val.content" :key="key">
                {{ text.join("/") }}
              </p>
            </span>
            <span>
              <i class="px-2 py-1 rounded-pill bg-secondary text-light"
                >点击进入>></i
              >
            </span>
          </span>
        </div>
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
import picSourec from "../assets/picSourec.json"
export default {
  data() {
    return {
      problemsrc: "a_images/public/information.png",
      problemNum: 0,
      problemTitle: `室外一体化机柜的组成`,
      imgLinks: [
        {
          src:picSourec.ziliaoxizao,
            
          href: "/support/监控软件下载",
          title: "资料下载",
          content: [["软件下载", "资质下载"], ["彩页下载", "产品维修"]]
        },
        {
          src:picSourec.changjianwenti,
          href: "/support/常见问题",
          title: "常见问题",
          content: [
            ["软件设置", "电池连接"],
            ["硬件安装", "错误代码"],
            ["技术文档"]
          ]
        },
        {
          src:picSourec.fuwuwangdian,
            
          href: this.localSite?"/buy/":"https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1DER4Qq&scene=SCE00003943#/",
          title: this.localSite?"服务网点":"服务咨询",
          content: this.localSite?[["全国服务网点"]]:[["客服咨询"]]
        }
      ]
    };
  },
  async asyncData({ $axios }) {
    let GetNews = await $axios.$get("/api/Get_index_news_list");
    GetNews = GetNews.map(el => {
      return el.title;
    });
    let carousel = await $axios.$get(`/api/Get_arg?title=Carousel&table=Head`);
    console.log(carousel);
    if (!carousel) {
      carousel = [
        "a_images/banner/banner01-pc.jpg",
        "a_images/banner/banner02-pc.jpg",
        "a_images/banner/banner03-pc.jpg",
        "a_images/banner/banner04-pc.jpg"
      ];
    } else {
      carousel =carousel.data;
    }    
    return { GetNews, carousel };
  },
  computed: {
    newsNum() {
      return this.GetNews.length || 0;
    },
    localSite() {
      return this.$store.state.localSite 
    },
  },
  methods: {
    swithProblem() {
      if (this.problemNum === this.newsNum) this.problemNum = 1;
      else this.problemNum += 1;
      this.problemTitle = this.GetNews[this.problemNum - 1];
    }
  },

  head: {
    title: "UPS电源_不间断电源_精密空调_机房一体化机柜_数据中心建设-雷迪司",
    meta: [
      {
        name: "keywords",
        content: `雷迪司,UPS,机房专用空调,UPS电源,不间断电源,机房空调,精密空调,微模块,模块化机房,
          数据中心,精密配电柜,UPS蓄电池,一体化机柜`
      },
      {
        name: "description",
        content: `雷迪司(LADS厂家官网)-提供UPS电源、不间断电源蓄电池、专用机房空调、恒温恒湿精密空调、
          机房精密配电柜、智能一体化机柜、动力环境监控、微模块化机房冷通道机柜等数据中心工程建设解决方案。
          研发、生产、维修：UPS不间断电源、UPS蓄电池、机房专用空调、恒温恒湿精密空调、柜式机房、动环监控系统、
          微模块化数据中心等机房一体化产品。销售服务中心遍及：
          北京市、上海、杭州、石家庄、合肥、成都、武汉、长沙、福州、厦门、南京、郑州、南昌、南宁、长沙、天津、
          济南、太原、西安、重庆、贵阳、昆明、兰州、宁夏、西宁、呼和浩特、乌鲁木齐、拉萨、沈阳等城市，
          机房装修建设就找深圳雷迪司科技股份有限公司`
      }
    ]
  }
};
</script>

<style lang="scss">
#carousel-1{
  min-height: 100%;
}
</style>
