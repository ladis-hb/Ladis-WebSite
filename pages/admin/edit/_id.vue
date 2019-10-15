<template>
  <div>
    <b-card>
      <b-card-header class=" bg-light">{{ edit.title }}</b-card-header>
      <b-card-body>
        <div id="editSelect">
          <b-form-group label="新闻类型:" label-align="right" label-cols="2">
            <b-form-select v-model="edit.editType" :options="edit.editOption">
            </b-form-select>
          </b-form-group>
          <b-form-group label="新闻标题:" label-align="right" label-cols="2">
            <b-form-input v-model.trim="title"></b-form-input>
          </b-form-group>
          <b-form-group label="图片:" label-align="right" label-cols="2">
            <b-form-select  v-model="file" :options="SourceFile"></b-form-select>
          </b-form-group>
        </div>
        <section id="editBody" class=" my-3">
          <div
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>
        <div id="editFooter">
          <b-button @click="testRout">testRout</b-button>
          <b-button variant="success" class=" float-right" @click="SendEdit"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";
export default {
  //nuxtI18n: false,
  data() {
    return {
      title: "",
      file: "",
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
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
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  watch: {
    $route() {
      console.log("zasxxd");
    }
  },
  computed: {
    ...mapState(["user", "token","SourceFile"]),
    
    edit() {
      let id = this.$route.params.id;
      let result = {
        title: "",
        editType: this.$route.query.type || "null",
        editOption: []
      };
      switch (id) {
        case "news":
          result.title = "NEWS";
          result.editType = this.$route.query.type;
          result.editOption = [
            { value: "null", text: "选择编辑类型" },
            { value: "cto", text: "企业新闻" },
            { value: "hy", text: "行业新闻" },
            { value: "cp", text: "产品新闻" },
            { value: "sv", text: "服务通告" }
          ];
          break;
        case "case":
          result.title = "CASES";
          result.editType = this.$route.query.type;
          result.editOption = [
            { value: "null", text: "选择编辑类型" },
            { value: "power", text: "UPS电源" },
            { value: "yth", text: "一体化机柜" },
            { value: "dt", text: "数据中心" },
            { value: "ac", text: "机房空调" }
          ];
          break;
      }
      return result;
    }
  },

  methods: {
    testRout() {
      console.log(this.$route);
    },
    async SendEdit() {
      let id = this.$route.params.id;
      let { file, content, title } = this.$data;
      let editType = this.edit.editType;
      if (!file || !content || !title || !editType)
        return MessageBox("参数不能为空", "输入错误");
      if (title.length > 50) return MessageBox("标题长度过长", "输入错误");
      if (file.size > 2048000)
        return MessageBox("图片大大小不能超过2MB", "输入错误");
      let data = new FormData();
      data.append("pic", file);
      data.append("content", content);
      data.append("title", title);
      data.append("editType", editType);
      data.append("user", this.user);
      data.append("token", this.token);
      data.append("inputType", id);

      let result = await this.$axios.$put(`/uploads/${id}`, data);
      if (result.stat) {
        MessageBox.confirm(result.msg, "编辑成功").then(() => {
          this.$router.push({ path: result.href });
        });
      } else {
        switch (result.error) {
          case "tokenValidationError":
            MessageBox.confirm(result.msg, "提交错误")
              .then(() => {
                this.$router.push({ path: "/admin/accont" });
              })
              .catch(() => {
                this.$router.push({ path: "/admin/accont" });
              });
            break;
        }
      }
    },
    onEditorChange({ editor, html, text }) {
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
</style>
