<template>
  <my-card title="案例详情" :load="$apollo.loading">
    <div id="editSelect">
      <my-keywords
        :title.sync="PageTitle"
        :keywords.sync="Pagekeywords"
        :description.sync="Pagedescription"
      ></my-keywords>
      <b-form-group label="案例类型:" label-align="right" label-cols="2">
        <b-form-select v-model="type" :options="editOption"></b-form-select>
      </b-form-group>
      <b-form-group label="案例标题:" label-align="right" label-cols="2">
        <b-form-input v-model.trim="title"></b-form-input>
      </b-form-group>
      <my-selectfile :isPic="true" :files.sync="file"></my-selectfile>
    </div>
    <section id="editBody" class="my-3">
      <my-code :html.sync ='content'></my-code>
    </section>
    <div id="editFooter">
      <b-button variant="success" class="float-right" @click="SendEdit('case')">确定</b-button>
    </div>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { selectFiles, cases, caseList } from "../../types/typing";
import deepmerge from "deepmerge";
export default Vue.extend({
  data() {
    return {
      PageTitle: "",
      Pagekeywords: "",
      Pagedescription: "",
      title: "",
      type: "",
      file: "",
      content: ``,
      editOption: ["UPS电源", "一体化机柜", "数据中心", "机房空调"],
      // apollo
      case: null,
      caseList: null
    };
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
        this.$data.content = newVal.content;
      }
    }
  },

  apollo: {
    case: {
      query: gql`
        query($title: String) {
          case: getCase(title: $title) {
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
          caseList: getCaseList(title: $title) {
            PageTitle
            Pagekeywords
            Pagedescription
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
      const date =
        this.$data?.cases?.date || new Date().toLocaleDateString("zh");
      const link =
        this.$data?.case?.link || `/case/${date + new Date().getSeconds()}`;
      const newsContent: cases = {
        MainUrl: "",
        MainTitle: editType,
        MainParent: "home",
        table: "Case",
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
    }
  }
});
</script>
