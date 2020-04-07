<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>产品列表</span>
      <b-button class="float-right" size="sm" variant="primary" to="addProduct">添加</b-button>
    </b-card-header>
    <b-card-body>
      <b-table
        :items="products"
        id="table"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      >
        <template v-slot:cell(oprate)="row">
          <b-button-group>
            <b-button variant="info" :to="{name:'index-addProduct',query:{title:row.item.title}}">编辑</b-button>
            <b-button @click="deletes(row.item.title)">删除</b-button>
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
      products: [],
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "MainTitle", label: "类别", sortable: true },
        { key: "title", label: "标题" },
        { key: "oprate", label: "操作" }
      ]
    };
  },
  computed: {
    rows() {
      return this.$data.products.length;
    }
  },
  apollo: {
    products: {
      query: gql`
        query {
          products: getProducts {
            MainTitle
            title
          }
        }
      `
    }
  },
  methods: {
    async deletes(title: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除产品:${title} 吗?`,
        { title: "delete?", buttonSize: "sm" }
      );
      if (isDel) {
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($title: String) {
              delProduct(title: $title) {
                ok
              }
            }
          `,
          variables: { title }
        });
        this.$apollo.queries.products.refresh();
      }
    }
  }
});
</script>