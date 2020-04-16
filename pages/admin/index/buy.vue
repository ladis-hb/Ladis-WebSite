<template>
  <my-card title="经销商列表" :load="$apollo.loading">
    <template v-slot:head>
      <b-button class="float-right" size="sm" variant="primary" to="addBuy">添加</b-button>
    </template>
    <b-table-lite :items="buys" :fields="fields">
      <template v-slot:cell(oprate)="row">
        <b-button-group>
          <b-button
            variant="info"
            :to="{name:'admin-index-addBuy',query:{title:row.item.title,daqu:row.item.parentsUntil}}"
          >编辑</b-button>
          <b-button @click="deletes(row.item.title)">删除</b-button>
        </b-button-group>
      </template>
    </b-table-lite>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
export default Vue.extend({
  data() {
    return {
      buys: [],
      fields: [
        { key: "parentsUntil", label: "大区" },
        { key: "parent", label: "省市" },
        { key: "title", label: "经销商" },
        { key: "content", label: "详情" },
        { key: "oprate", label: "操作" }
      ]
    };
  },
  apollo: {
    buys: {
      query: gql`
        query {
          buys: getbuys {
            parentsUntil
            parent
            title
            content
          }
        }
      `
    }
  },
  methods: {
    async deletes(title: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除代理商：${title} 吗？`,
        { title: "delete?", buttonSize: "sm" }
      );
    }
  }
});
</script>