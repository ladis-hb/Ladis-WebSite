<template>
  <div class="overflow-auto">
    <b-card title="编辑器">
      <editor :api-key="key" :init="opt" output-format="html" v-model="content" />
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import "../assets/css/product.css";
import { Settings } from "tinymce";
export default Vue.extend({
  components: {
    editor: Editor
  },
  props: ["html"],
  data() {
    const opt: Settings = {
      inline: true,
      language_url: "http://tinymce.ax-z.cn/static/tiny/langs/zh_CN.js",
      language: "zh_CN", //语言
      height: 500,
      menubar: "format",
      //importcss_append: true,
      plugins: [
        "importcss code autosave hr image insertdatetime link lists media save searchreplace template wordcount"
      ],
      toolbar:
        "save|styleselect | code template|anchor|restoredraft| hr |image media insertdatetime link |numlist bullist|searchreplace wordcount",
      content_css: "/css/productUtil.css",
      // 图片列表
      image_list: [
        { title: "狗", value: "mydog.jpg" },
        { title: "猫", value: "mycat.gif" }
      ],
      // 链接列表
      link_list: [
        { title: "My page 1", value: "https://www.tiny.cloud" },
        { title: "My page 2", value: "https://about.tiny.cloud" }
      ],
      // 模板
      templates: [
        {
          title: "productList",
          description: "productList",
          url: "/template/productList.html"
        },
        { title: "test", description: "test", url: "/template/test.html" }
      ],
      // 保存按钮触发
      save_onsavecallback: () => {
        this.$emit("update:html", this.$data.content);
      }
    };
    return {
      key: "ah01czhmyx4gu3m907gtiaw1gbcv33tsxzvu4u8uucryki7h",
      opt,
      content: this.html || ""
    };
  }
});
</script>