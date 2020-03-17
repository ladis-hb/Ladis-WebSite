<template>
  <b-row no-gutters>
    <b-col cols="12" md="4" v-for="(val, key) in all" :key="key" class="p-4">
      <b-card class=" h-100">
        <my-img :src="val.img" :alt="val.title"></my-img>
        <!-- <b-card-img :src="val.img" :alt="val.title"></b-card-img> -->
        <b-link
          :to="{ path: `/productsList/${val.title}` }"
          class="text-dark  stretched-link text-decoration-none"
        >
          {{ val.title }}
        </b-link>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import MyImg from "../../components/MyImg";
import { GeneralGetInfo } from "../../api/axios";
export default {
  components: { MyImg },
  async asyncData({$axios}) {
    var all = await GeneralGetInfo($axios,{
      table: "product",
      title: "All"
    }).then(el => el.data);
    return { all };
  }
};
</script>
