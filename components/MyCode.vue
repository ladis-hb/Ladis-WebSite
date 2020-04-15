<template>
  <div class="overflow-auto border">
    <b-card title="编辑器">
      <editor
        :api-key="key"
        :init="opt"
        output-format="html"
        v-model="content"
        initial-value="Once upon a time..."
        @onFocus="fouce"
        @onInit="loginit"
      >loading</editor>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import "../assets/css/product.css";
import { Settings,Events,Editor as edit } from "tinymce";
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
        "importcss code autosave hr image insertdatetime link lists media save searchreplace template wordcount",
        'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        "save|styleselect | code template|anchor|restoredraft| hr |image media insertdatetime link |numlist bullist|searchreplace wordcount| bold italic backcolor ",
      content_css: "/css/productUtil.css",
      /* // 图片列表
      image_list: this.$store.getters.getFiles(true),
      // 链接列表
      link_list: [
        { title: "My page 1", value: "https://www.tiny.cloud" },
        { title: "My page 2", value: "https://about.tiny.cloud" }
      ], */
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
      content: ""
    };
  },
  mounted() {
    console.log({ s: this.$store.getters.getFiles(true) });
  },
  methods:{
    fouce(Fouce:Events.FocusBlurEvent,edit:edit){
      if(this.html && !this.content){
        this.content = this.html
      }
      console.log({Fouce,edit});
      //edit.init()
    },
    loginit(){
      console.log("loginit");
      
    }
  }
});
</script>