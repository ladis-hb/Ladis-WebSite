<template>
  <div class="overflow-auto">
    <b-card>
      <b-card-header class="bg-light">About</b-card-header>
      <b-card-body id="editSelect">
        <div>
          <b-form-group label="类型:" label-align="right" label-cols="2">
            <b-form-select v-model="selectType" :options="type"></b-form-select>
          </b-form-group>
          <b-form-group label="区域网址:" label-align="right" label-cols="2">
            <b-form-select
              v-model="webSite"
              :options="webSites"
            ></b-form-select>
          </b-form-group>
        </div>
        <section id="editBody" class="my-3">
          <div
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>

        <div id="editFooter">
          <b-button variant="success" class="float-right" @click="SendEdit"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { setAbout, getAbout } from "../../../api/axios";
export default {
  data() {
    return {
      type: [
        "公司简介",
        "服务承诺",
        "经营理念",
        "加入我们",
        "联系我们",
        "使用声明",
        "隐私政策"
      ],
      selectType: "联系我们",
      webSites: ["localhost", "www.ladis.com.cn", "www.ladishb.com"],
      webSite: "localhost",
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">
      Text content loading..</span></h2>`,

      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"] //, "video"]
          ],
          syntax: {
            highlight: text => this.highlightAuto(text).value
          }
        }
      }
    };
  },
  watch: {
    selectType: function(val) {
      let { selectType, webSite } = this.$data;
      getAbout({ selectType, webSite }).then(el => (this.content = el.data));
    },
    webSite: function(val) {
      let { selectType, webSite } = this.$data;
      getAbout({ selectType, webSite }).then(el => (this.content = el.data));
    }
  },

  methods: {
    async SendEdit() {
      let { selectType, webSite, content } = this.$data;
      if (selectType == "") return;
      setAbout({ selectType, webSite, content });
      this.$bvModal.msgBoxOk("操作成功", { buttonSize: "sm" });
    },

    onEditorChange({ html }) {
      this.content = html;
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  width: auto;
  overflow-y: auto;
}
.text-capitalize {
  border-bottom: inset 1px;
}
</style>
