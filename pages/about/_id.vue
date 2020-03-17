<template>
  <div>
    <div class="pt-5 border-bottom text-center">
      <h5>{{ title }}</h5>
    </div>
    <div>
      <b v-html="result || ''" class=" px-5 ctlimg content-img ql-editor"></b>
    </div>
  </div>
</template>

<script>
import aboutInfo from "./about";
import { GeneralGetInfo } from "../../api/axios";
export default {
  async asyncData(ctx) {
    const localUrl = ctx.store.state.localUrl;
    const title = ctx.params.id;
    const argument = { table: "About", title };
    const backInfo = aboutInfo[title].content.body;
    let result = await GeneralGetInfo(ctx.$axios, argument);
    if (result) {
      const body = result.content.filter(el => el.webSite == localUrl);
      if (body.length < 1) result = backInfo;
      else result = body[0].body;
    } else {
      result = backInfo;
    }
    return { title, result };
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
