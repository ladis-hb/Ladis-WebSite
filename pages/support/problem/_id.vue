<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12" class=" text-center">
        <h4>{{ arg.title }}</h4>
        <hr />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col cols="12" class=" px-2">
        <div v-html="arg.html" v-if="!arg.movie"></div>
        <div v-else>
          <iframe
            id="frame"
            frameborder="0"
            width="100%"
            height="480"
            allowfullscreen
            :src="arg.movie"
          ></iframe>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GeneralGetInfo } from "../../../api/axios";
export default {
  async asyncData({ $axios, params }) {
    const title = params.id;
    const arg = await GeneralGetInfo($axios, { table: "Support_list", title });
    return { arg, title };
  },
  head() {
    return {
      title: this.arg.title
    };
  }
};
</script>

<style lang="scss" scoped>
h4 {
  margin: 1rem 0;
}
</style>
