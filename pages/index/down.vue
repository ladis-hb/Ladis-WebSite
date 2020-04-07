<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>服务支持</span>
      <b-button class="float-right" size="sm" variant="primary" to="/addDown">添加</b-button>
    </b-card-header>
    <b-card-body>
      <b-tabs fill>
        <b-tab title="软件下载" title-link-class=" text-dark">
          <b-table :items="downs" :fields="fieldsDown" responsive>
            <template v-slot:cell(oprate)="row">
              <b-button-group>
                <b-button
                  variant="info"
                  :to="{name:'index-addDown',query:{title:row.item.title}}"
                >编辑</b-button>
                <b-button @click="deleteDown(row.item.title)">删除</b-button>
              </b-button-group>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="彩页/资质" title-link-class=" text-dark">
          <b-table :items="pdfs" :fields="fieldsPdf">
            <template v-slot:cell(oprate)="row">
              <b-button-group>
                <b-button
                  variant="info"
                  :to="{name:'index-addDown',query:{title:row.item.title}}"
                >编辑</b-button>
                <b-button @click="deleteDown(row.item.title)">删除</b-button>
              </b-button-group>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="视频教程" title-link-class=" text-dark">
          <b-table :items="movies" :fields="fieldsMovie">
            <template v-slot:cell(oprate)="row">
              <b-button-group>
                <b-button
                  variant="info"
                  :to="{name:'index-addProblem',query:{title:row.item.title}}"
                >编辑</b-button>
                <b-button @click="deleteProblem(row.item.title)">删除</b-button>
              </b-button-group>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="常见问题" title-link-class=" text-dark">
          <b-table :items="problem" :fields="fieldsProblem">
            <template v-slot:cell(oprate)="row">
              <b-button-group>
                <b-button
                  variant="info"
                  :to="{name:'index-addProblem',query:{title:row.item.title}}"
                >编辑</b-button>
                <b-button @click="deleteProblem(row.item.title)">删除</b-button>
              </b-button-group>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { support, supportList } from "../../types/typing";
export default Vue.extend({
  data() {
    return {
      softs: [],
      problems: [],
      fieldsDown: [
        { key: "MainTitle", label: "平台", sortable: true },
        { key: "title", label: "标题" },
        { key: "platform", label: "适用类型" },
        { key: "language", label: "语言" },
        { key: "size", label: "MB" },
        { key: "version", label: "版本" },
        "oprate"
      ],
      fieldsPdf: [
        { key: "MainTitle", label: "平台", sortable: true },
        { key: "title", label: "标题" },
        "oprate"
      ],
      fieldsMovie: [
        { key: "MainParent", label: "类别" },
        { key: "MainTitle", label: "子类", sortable: true },
        { key: "title", label: "标题" },
        { key: "movie", label: "链接" },
        "oprate"
      ],
      fieldsProblem: [
        { key: "MainParent", label: "类别" },
        { key: "MainTitle", label: "子类", sortable: true },
        { key: "title", label: "标题" },
        "oprate"
      ]
    };
  },
  computed: {
    downs() {
      return this.$data.softs.filter((el: support) => el.type === "soft");
    },
    pdfs() {
      return this.$data.softs.filter((el: support) => el.type !== "soft");
    },
    movies() {
      return this.$data.problems.filter((el: supportList) => el.movie);
    },
    problem() {
      return this.$data.problems.filter((el: supportList) => !el.movie);
    }
  },
  apollo: {
    softs: {
      query: gql`
        query {
          softs: getSofts {
            MainTitle
            type
            title
            platform
            language
            size
            version
          }
        }
      `
    },
    problems: {
      query: gql`
        query {
          problems: getProblems {
            MainParent
            MainTitle
            title
            movie
          }
        }
      `
    }
  },
  methods: {
    async deleteDown(title: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除文件:${title} 吗?`
      );
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($title: String) {
            delSupportSoft(title: $title) {
              ok
            }
          }
        `,
        variables: {
          title
        }
      });
      this.$apollo.queries.softs.refresh();
    },
    async deleteProblem(title: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除问题:${title} 吗?`
      );
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($title: String) {
            delSupportProblem(title: $title) {
              ok
            }
          }
        `,
        variables: {
          title
        }
      });
      this.$apollo.queries.problems.refresh();
    }
  }
});
</script>