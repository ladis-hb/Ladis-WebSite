<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h4>{{arg.title}}</h4>
        <hr />
      </b-col>
      <b-col cols="12">
        <div v-html="arg.html"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData({ $axios, params, error, payload }) {
    var title = params.id;
    var arg = await $axios.$get(
      "/api/Get_arg?table=support_list&title=" + encodeURI(title)
    );
    return { arg, title };
  },

  created() {
    console.log(this.arg);
  },
  head() {
    return {
      title: this.arg.title
    };
  }
};
</script>

<style lang='scss' scoped >
h4{
  margin: 1rem 0;
}
</style>
