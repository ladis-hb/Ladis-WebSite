<template>
  <my-card title="案例列表" :load="$apollo.loading">
    <template v-slot:head>
      <b-button class="float-right" size="sm" variant="primary" to="addCase">添加</b-button>
    </template>
    <b-table
      :items="cases"
      :fields="fields"
      id="table"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template v-slot:cell(oprate)="row">
        <b-button-group>
          <b-button variant="info" :to="{name:'index-addCase',query:{title:row.item.text}}">编辑</b-button>
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
  </my-card>
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
          cases: getCases {
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
              delCase(title: $title) {
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