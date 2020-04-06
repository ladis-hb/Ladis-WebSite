<template>
  <div>
    <b-card>
      <b-card-header class="bg-info text-light">Case</b-card-header>
      <b-card-body>
        <div id="editSelect">
          <b-form-group label="页面标题:" label-align="right" label-cols="2">
            <b-form-input v-model.trim="PageTitle" />
          </b-form-group>
          <b-form-group label="页面关键字:" label-align="right" label-cols="2">
            <b-form-textarea v-model="Pagekeywords" />
          </b-form-group>
          <b-form-group label="页面描述:" label-align="right" label-cols="2">
            <b-form-textarea v-model="Pagedescription" />
          </b-form-group>
          <b-form-group label="新闻类型:" label-align="right" label-cols="2">
            <b-form-select v-model="type" :options="editOption"></b-form-select>
          </b-form-group>
          <b-form-group label="新闻标题:" label-align="right" label-cols="2">
            <b-form-input v-model.trim="title"></b-form-input>
          </b-form-group>
          <b-form-group label="主题图片:" label-align="right" label-cols="2">
            <b-form-select v-model="file" :options="SourceFile"></b-form-select>
          </b-form-group>
          <b-form-group label="图片预览:" label-align="right" label-cols="2">
            <b-form-text>{{file}}</b-form-text>
            <b-img :src="file" height="100" fluid></b-img>
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
          <b-button variant="success" class="float-right" @click="SendEdit('case')">确定</b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { selectFiles, cases, caseList } from "../../types/typing";
import deepmerge from "deepmerge";
export default Vue.extend({
  data() {
    const hljs = null;
    const editorOption = {
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
          highlight: (text: any) => (hljs as any).highlightAuto(text).value
        }
      }
    };
    return {
      PageTitle: "",
      Pagekeywords: "",
      Pagedescription: "",
      title: "",
      type: "",
      file: "",
      content: ``,
      editOption: ['行业新闻', '产品新闻', '企业新闻', '服务通告'],
      editorOption,
      // apollo
      case: null,
      caseList: null
    };
  },
  computed: {
    SourceFile() {
      const SourceFile: selectFiles[] = this.$store.state.SourceFile;
      const result = SourceFile.filter(
        file => file.filetype === "img"
      ).map(file => Object.assign(file, { text: file.name, value: file.path }));
      return result;
    }
  },
  watch: {
    case: function(newVal: cases) {
      if (newVal) {
        this.$data.type = newVal.MainTitle;
        this.title = newVal.title;
        this.file = newVal.img;
      }
    },
    caseList: function(newVal: caseList) {
      if (newVal) {
        this.$data.PageTitle = newVal.PageTitle;
        this.$data.Pagekeywords = newVal.Pagekeywords;
        this.$data.Pagedescription = newVal.Pagedescription;
        this.$data.content = newVal.content || newVal.text;
      }
    }
  },

  apollo: {
    case: {
      query: gql`
        query($title: String) {
          case: getNew(title: $title) {
            MainTitle
            title: text
            img
            link
            date
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      }
    },
    caseList: {
      query: gql`
        query($title: String) {
          caseList: getNewList(title: $title) {
            PageTitle
            Pagekeywords
            Pagedescription
            text
            pic
            content
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      }
    }
  },

  methods: {
    async SendEdit(Type: string) {
      let {
        PageTitle,
        Pagekeywords,
        Pagedescription,
        file,
        type: editType,
        content,
        title
      } = this.$data;
      if (!file || !content || !title || !editType)
        return this.$bvModal.msgBoxOk("参数不能为空", { title: "输入错误" });
      const date = this.$data?.cases?.date || new Date().toLocaleDateString("zh");
      const link =  this.$data?.case?.link || `/case/${date + new Date().getSeconds()}`;
      const newsContent: cases = {
        MainUrl: "",
        MainTitle: editType,
        MainParent: "home",
        table: "News",
        date,
        link,
        href: "",
        name: `[${editType}]`,
        img: file,
        text: title,
        title,
        linkText: "查看详情 >",
        time: date
      };

      const newListContent: caseList = deepmerge(newsContent, {
        PageTitle,
        Pagekeywords,
        Pagedescription,
        MainTitle: title,
        MainUrl: link,
        MainParent: editType,
        title,
        content,
        text: null
      });
      // console.log({newsContent,newListContent});

      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setCaseNews(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: { newsContent, newListContent } }
      });
      // console.log(result);

      const isOpen = await this.$bvModal.msgBoxConfirm("success");
      if (isOpen) window.open("http://www.ladishb.com" + link, "_blank");
    },
    onEditorChange({ html }: { html: string }) {
      this.content = html;
    }
  }
});
</script>

<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  width: auto;
  overflow-y: auto;
}
</style>
