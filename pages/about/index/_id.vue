<template>
  <div>
    <div class="pt-5 border-bottom">
      <h5>{{ bodys.title }}</h5>
    </div>
    <div>
      <b v-html="bodys.body" class=" px-5 ctlimg content-img ql-editor"></b>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let bodys = await $axios.$get(`/api/Get_arg`, {
      params: { table: "About", title: params.id }
    });
    return { bodys };
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
