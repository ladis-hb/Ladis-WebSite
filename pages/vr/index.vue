<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item class=" bg-dark rounded-0 my-1">{{
            $t("index.0twzes")
          }}</b-list-group-item>
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('house')"
            >{{ $t("index.sn1yip") }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('dev')"
            >{{ $t("index.0ibgd6") }}</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9" class=" mt-3 mb-5">
        <b-list-group>
          <b-list-group-item v-for="(val, key) in backListArray" :key="key">
            <card-copy
              :img="val.img"
              :text="val.text"
              :title="val.name"
              :time="val.time"
              :href="Serize(val.link)"
            ></card-copy>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CardCopy from "../../components/CardCopy";
import { GeneralGetInfo } from "../../api/axios";
export default {
  components: {
    CardCopy
  },
  data() {
    return {
      backListArray: this.listArray
    };
  },
  computed: {
    show() {}
  },
  async asyncData({ $axios }) {
    const list = await GeneralGetInfo($axios, { table: "VR" }); //$axios.$get(`/api/Get_arg?table=VR`);
    let listArray = [];
    list.forEach(element => {
      listArray = [...listArray, ...element.data];
    });
    return { list, listArray };
  },
  head() {
    return {
      title: `全景展示-雷迪司`,
      meta: [
        { name: "keywords", content: `全景展示-雷迪司` },
        { name: "description", content: `全景展示-雷迪司` }
      ]
    };
  },
  methods: {
    vrFilter(type) {
      if (!type) this.backListArray = this.listArray;
      else {
        let list = [];
        switch (type) {
          case "dev":
            this.listArray.forEach(el => {
              if (el.name.includes("产品全景展示")) list.push(el);
            });
            break;
          case "house":
            this.listArray.forEach(el => {
              if (el.name.includes("机房全景展示")) list.push(el);
            });
            break;
        }
        this.backListArray = list;
      }
    },
    Serize(href) {
      if (href.includes("http://www.ladis.com.cn"))
        href = href.replace("http://www.ladis.com.cn", "");
      return `http://116.62.48.175${href}`;
    }
  },
  mounted() {
    this.vrFilter();
  }
};
</script>

<style lang="scss" scoped>
.list-group-item {
  border: 0ch;
}
</style>
