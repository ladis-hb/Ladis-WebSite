<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div class="my-4 border-bottom">
          <h5 class=" text-center">{{ id }}</h5>
        </div>
        <div v-if="typeof list === 'string'">
          <div id="newsText" class="px-5 ctlimg ql-editor" v-html="list"></div>
        </div>
        <div v-else>
          <div id="newsText" class="px-5 ctlimg">
            <p v-for="(val, key) in list.text || []" :key="key">{{ val }}</p>
          </div>
          <div id="pic" class="px-5">
            <my-img
              v-for="(val, key) in list.pic || []"
              :key="key"
              :src="val"
              :alt="id"
              class="m-0 p-0 w-75 my-2"
            ></my-img>
            <!-- <b-img-lazy
              v-for="(val, key) in list.pic || []"
              :key="key"
              v-bind="mainProps"
              :src="val"
              :alt="id"
              class=" m-0 p-0 w-75 my-2"
              onerror="console.log(val)"
            ></b-img-lazy>-->
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyImg from "@/components/MyImg";
export default {
  components: {
    MyImg
  },
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
  async asyncData({ $axios, params }) {
    let id = params.id;
    let list = await $axios.$get(
      `/api/Get_arg?table=news_list&title=${encodeURI(id)}`
    );
    return { id, list: list.data, listNew: list.new };
  },
  head() {
    return {
      title: `${this.id}-雷迪司`,
      meta: [
        { name: "keywords", content: this.id },
        { name: "description", content: this.id }
      ]
    };
  }
};
</script>

<style lang="scss">
.content-img img {
  max-width: 100%;
  margin: 10px;
}
#newsText img {
  max-width: 100% !important;
  height: auto;
}
</style>
