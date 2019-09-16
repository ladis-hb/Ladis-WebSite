<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div class=" my-4 border-bottom">
          <h5>{{ id }}</h5>
        </div>
        <div id="text" class=" px-5">
          <p v-for="(val, key) in list.text || []" :key="key">{{ val }}</p>
        </div>
        <div id="pic" class=" px-5">
          <b-img-lazy
            v-for="(val, key) in list.pic || []"
            :key="key"
            v-bind="mainProps"
            :src="val"
            :alt="id"
            class=" m-0 p-0 w-75 my-2"
          ></b-img-lazy>
        </div>
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
        blankColor: "#bbb"
      }
    };
  },
  async asyncData({ $axios, params, payload }) {
    let id = params.id;
    let list;
    if (payload) {
      list = payload.data;
    } else {
      list = await $axios.$get(
        `/api/Get_arg?table=news_list&title=${encodeURI(id)}`
      );
    }
    return { id, list: list.data };
  },
  head() {
    return {
      title: `${this.id}-雷迪司`,
      meta: [
        { name: "keywords", content: this.id },
        { name: "description", content: this.list.text.slice(0, 5).join(",") }
      ]
    };
  },
  created() {
    //console.log(this.list);
  }
};
</script>

<style lang="scss" scoped></style>
