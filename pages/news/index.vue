<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter()"
            >{{ $t("index.59ij5u") }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('企业新闻')"
            >{{ $t("index.maq2tk") }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('产品新闻')"
            >{{ $t("index.lvd54v") }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('行业新闻')"
            >{{ $t("index.e2cbfj") }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('服务通告')"
            >{{ $t("index.jpiy4n") }}</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9" class=" mt-3 mb-5">
        <b-list-group
          :per-page="perPage"
          :current-page="currentPage"
          id="my-table"
        >
          <b-list-group-item
            v-for="(val, key) in listArray.slice(
              currentPage * 10 - 10,
              currentPage * 10
            )"
            :key="key"
          >
            <card-copy
              :img="val.data.img"
              :text="val.data.text"
              :title="val.data.name"
              :time="val.data.time"
              :href="val.data.href"
            ></card-copy>
          </b-list-group-item>
        </b-list-group>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          v-show="rows > 10"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CardCopy from "@/components/CardCopy";
import { GeneralGetInfo } from '../../api/axios';
export default {
  components: {
    CardCopy
  },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        class: "my-5"
      },
      perPage: 10,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.listArray.length;
    }
  },
  async asyncData({ $axios, payload }) {
    let backListArray = [];
    let listArray = await GeneralGetInfo($axios,{table:"News",isNews:true}) //GetNews( $axios);
    listArray = Object.values(listArray);
    backListArray = Array.from(new Set(listArray));
    return { listArray, backListArray };
  },
  head() {
    return {
      title: `全部新闻-雷迪司`,
      meta: [
        { name: "keywords", content: `全部新闻-雷迪司` },
        { name: "description", content: `全部新闻-雷迪司` }
      ]
    };
  },
  methods: {
    vrFilter(type) {
      this.currentPage = 1;
      this.listArray = this.backListArray.filter(el => {
        return el.data.name.includes(type) || !type;
      });
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
.lazy-pic {
  width: 30% !important;
  margin: 0 !important;
}
</style>
