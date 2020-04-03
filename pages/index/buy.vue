<template>
  <div>
    <b-card>
      <b-card-header class="bg-dark text-light">经销商列表</b-card-header>
      <b-card-body>
        <b-table-lite :items="buys" :fields="fields">
          <template v-slot:cell(oprate)="row">
            <b-button-group>
              <b-button
                variant="info"
                :to="{name:'index-addBuy',query:{title:row.item.title,daqu:row.item.parentsUntil}}"
              >编辑</b-button>
              <b-button @click="deletes(row.item.title)">删除</b-button>
            </b-button-group>
          </template>
        </b-table-lite>
      </b-card-body>
    </b-card>
  </div>
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