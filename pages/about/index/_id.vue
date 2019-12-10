<template>
  <div>
    <div class="pt-5 border-bottom">
      <h5>联系我们</h5>
    </div>
    <div>
      <b
        v-html="body.body || ''"
        class=" px-5 ctlimg content-img ql-editor"
      ></b>
    </div>
  </div>
</template>

<script>
import { getAbout } from "../../../api/axios";
export default {
  computed: {
    webSite() {
      return this.$store.state.localUrl;
    }
  },

  async asyncData({ $axios, req, params }) {
    let bodys = await $axios.$get(`/api/Get_arg`, {
      params: { table: "About", title: params.id }
    });
    let localUrl = req.headers.host;    
    let body = bodys.content.filter(el => el.webSite == localUrl)[0];
    console.log(body);
    
    if (!body ||!body.body)
      body = bodys.content.filter(el => el.webSite == "localhost")[0];
    return {body };
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
