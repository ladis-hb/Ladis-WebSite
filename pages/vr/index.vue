<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item class=" bg-dark rounded-0 my-1"
            >全景展示</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('house')"
            >机房全景展示</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('dev')"
            >产品全景展示</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9" class=" mt-3 mb-5">
        <div
          class=" d-flex flex-row"
          v-for="(val, key) in backListArray"
          :key="key"
        >
          <b-img :src="val.img" fluid class=" w-25"></b-img>
          <span class=" d-flex flex-column justify-content-center ml-4">
            <span class=" my-1"
              ><b class=" text-primary font-weight-bold">{{ val.name }}</b
              ><i>{{ val.time }}</i></span
            >
            <strong class=" my-1">{{ val.text }}</strong>
            <b-link class="my-2" :href="val.link" target="_blank">{{ val.linkText }}</b-link>
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
      backListArray: this.listArray
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
      list = await $axios.$get(`/api/Get_arg?table=VR`);
    }
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
