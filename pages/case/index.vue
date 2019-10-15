<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item class=" bg-dark rounded-0  my-1 text-light" button
            >{{ $t('index.tqie7y') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('UPS电源')"
            >{{ $t('index.a89hfi') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('一体化机柜')"
            >{{ $t('index.1gcuye') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('数据中心')"
            >{{ $t('index.6vnevq') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('机房空调')"
            >{{ $t('index.uns46v') }}</b-list-group-item
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
            <div class=" d-flex flex-row my-4 px-4">
              <b-img-lazy
                v-bind="mainProps"
                :src="val.data.img"
                :alt="val.data.text"
                class=" lazy-pic"
              ></b-img-lazy>
              <span class=" d-flex flex-column justify-content-center ml-4">
                <span class=" my-1"
                  ><b class=" text-primary font-weight-bold">{{
                    val.data.name
                  }}</b
                  ><i>{{ val.data.time }}</i></span
                >
                <strong class=" my-1">{{ val.data.text }}</strong>
                <b-link class="my-2" :to="{ path: val.data.href }">{{
                  val.data.linkText
                }}</b-link>
              </span>
            </div>
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
export default {
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
    let list = [],
      listArray = [],
      backListArray = [];
    if (payload) {
    } else {
      listArray = await $axios.$get(`/api/Get_case_list`);
    }
    //Object.values(list).reverse();
    /* list.forEach(element => {
      listArray = [...element.data, ...listArray];
    }); */
    listArray = Object.values(listArray);
    backListArray = Array.from(new Set(listArray));
    return { list, listArray, backListArray };
  },
  head() {
    return {
      title: `成功案例-雷迪司`,
      meta: [
        { name: "keywords", content: `成功案例-雷迪司` },
        { name: "description", content: `成功案例-雷迪司` }
      ]
    };
  },
  methods: {
    vrFilter(type) {
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
