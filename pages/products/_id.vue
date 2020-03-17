<template>
  <b-row no-gutters>
    <b-col cols="12" md="4" v-for="(val, key) in data" :key="key" class="p-4">
      <b-card class=" h-100">
        <my-img :src="val.img" :alt="val.title"></my-img>
        <!-- <b-card-img :src="val.img" :alt="val.title"></b-card-img> -->
        <b-link
          :to="{ path: `/productsList/${val.title}` }"
          class="text-dark stretched-link text-decoration-none"
        >
          {{ val.title }}
        </b-link>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import MyImg from "@/components/MyImg";
import { GeneralGetInfo } from "../../api/axios";
export default {
  components: { MyImg },
  async asyncData({ $axios, params }) {
    const { data } = await GeneralGetInfo($axios, { table: "Product",title:params.id });
    return { data, params };
  },

  head() {
    return {
      title: `${this.params.id} 模块化UPS电源_不间断电源厂家【价格 型号 参数 图片】-雷迪司`,
      meta: [
        { name: "keywords", content: this.params.id },
        {
          name: "description",
          content:
            "雷迪司厂家生产商提供模块化UPS电源,模块化UPS不间断电源，包含模块化UPS电源,模块化UPS不间断电源品牌、参数、报价、价格、规格、大图片等，同时提供维修、维护、售后服务-深圳雷迪司科技股份有限公司"
        }
      ]
    };
  }
};
</script>
