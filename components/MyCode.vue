<template>
  <div class="overflow-auto border">
    <b-card title="编辑器">
      <editor
        :api-key="key"
        :init="opt"
        output-format="html"
        v-model="content"
        @onFocus="fouce"
        @onBlur="blur"
        @onInit="loginit"
        placeholder="此处开始编写代码"
        class="border rounded-sm p-3"
      >loading</editor>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import "../assets/css/product.css";
import { Settings, Events, Editor as edit } from "tinymce";
function URLConverter(
  url: string,
  node: HTMLElement,
  on_save: boolean,
  name: string
) {
  if(['src','href'].includes(name)){
    if(/http*/g.test(url)){
      return new URL(url).pathname
    }
  }
  return url
}
export default Vue.extend({
  components: {
    editor: Editor
  },
  props: ["html"],
  data() {
    const opt: Settings = {
      inline: true,
      language_url: "/js/Tiny-language.js",
      language: "zh_CN", //语言
      height: 500,
      menubar: "format",
      // default
      cache_suffix: "?v=5.0.0",
      draggable_modal: true,
      elementpath: true,
      convert_urls: false,
      urlconverter_callback: URLConverter,
      //importcss_append: true,
      plugins: [
        "importcss code autosave hr image insertdatetime lists media save searchreplace template wordcount",
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount"
      ],
      toolbar:
        "save|undo redo |styleselect | code template|anchor|restoredraft| hr |image media insertdatetime link |numlist bullist|searchreplace wordcount| bold italic backcolor ",
      content_css: "/css/productUtil.css",
      typeahead_urls: false,
      image_prepend_url: "/",
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
  watch: {
    html: function(val) {
      if (val !== this.content) {
        this.content = val || " ";
      }
    }
  },
  methods: {
    fouce(Fouce: Events.FocusBlurEvent, edit: edit) {
      if(!this.content){
        this.content = this.html
      }
    },
    blur() {
      this.$emit("update:html", this.$data.content);
    },
    loginit() {
      console.log("loginit");
    }
    // 处理链接
  }
});
</script>