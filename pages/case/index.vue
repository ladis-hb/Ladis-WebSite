<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter()"
            >成功案例</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('UPS电源')"
            >UPS电源</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('一体化机柜')"
            >一体化机柜</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('数据中心')"
            >数据中心</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('机房空调')"
            >机房空调</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9" class=" mt-3 mb-5">
        <div
          class=" d-flex flex-row my-4 px-5"
          v-for="(val, key) in backListArray"
          :key="key"
        >
          <b-img-lazy
            v-bind="mainProps"
            :src="val.img"
            :alt="val.text"
            class=" lazy-pic"
          ></b-img-lazy>
          <span class=" d-flex flex-column justify-content-center ml-4">
            <span class=" my-1"
              ><b class=" text-primary font-weight-bold">{{ val.name }}</b
              ><i>{{ val.time }}</i></span
            >
            <strong class=" my-1">{{ val.text }}</strong>
            <b-link class="my-2" :to="{ path: val.href }">{{
              val.linkText
            }}</b-link>
          </span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      backListArray: this.listArray,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        class: "my-5"
      }
    };
  },
  computed: {
    show() {}
  },
  async asyncData({ $axios, payload }) {
    let list = [],
      listArray = [];
    if (payload) {
    } else {
      list = await $axios.$get(`/api/Get_arg?table=case`);
    }
    list.forEach(element => {
      listArray = [...listArray, ...element.data];
    });
    return { list, listArray };
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
      if (!type) this.backListArray = this.listArray;
      else {
        let list = [];
        this.listArray.forEach(el => {
          if (el.name.includes(type)) list.push(el);
        });
        this.backListArray = list;
      }
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
