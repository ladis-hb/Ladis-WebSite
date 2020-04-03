<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>新闻列表</span>
      <b-button class="float-right" size="sm" variant="primary" to="addNews">添加</b-button>
    </b-card-header>
    <b-card-body>
      <b-table
        :items="cases"
        :fields="fields"
        id="table"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(oprate)="row">
          <b-button-group>
            <b-button variant="info" :to="{name:'index-addNews',query:{title:row.item.text}}">编辑</b-button>
            <b-button @click="deletes(row.item.text)">删除</b-button>
          </b-button-group>
        </template>
      </b-table>
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="table"
      ></b-pagination>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
export default Vue.extend({
  data() {
    return {
      cases: [],
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "MainTitle", label: "类别", sortable: true },
        { key: "date", label: "日期", sortable: true },
        { key: "text", label: "标题" },
        { key: "oprate", label: "操作" }
      ]
    };
  },
  computed: {
    rows() {
      return this.$data.cases.length;
    }
  },
  apollo: {
    cases: {
      query: gql`
        {
          cases: getNews {
            MainTitle
            date
            text
          }
        }
      `
    }
  },
  methods: {
    async deletes(title: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除案例:${title} 吗?`,
        { title: "delete?", buttonSize: "sm" }
      );
      if (isDel) {
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($title: String) {
              delNew(title: $title) {
                ok
              }
            }
          `,
          variables: { title }
        });
        this.$apollo.queries.cases.refresh();
      }
    }
  }
});
</script>