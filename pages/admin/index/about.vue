<template>
  <my-card title="代理商列表" :load="$apollo.loading">
    <template v-slot:head>
      <b-button class="float-right" size="sm" variant="primary" to="addAgent">添加</b-button>
    </template>
    <b-table-lite :items="webSites" :fields="fields">
      <template v-slot:cell(oprate)="row">
        <b-button-group>
          <b-button variant="info" :to="{name:'admin-index-addAbout',query:{name:row.item.name}}">关于代理商</b-button>
          <b-button variant="success" :to="{name:'admin-index-agentConfig',query:{name:row.item.name}}">网站配置</b-button>
          <b-button @click="deletes(row.item.name)">删除</b-button>
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
      webSites: [],
      fields: [
        { key: "name", label: "代理商" },
        { key: "url", label: "网址" },
        { key: "oprate", label: "操作" }
      ]
    };
  },
  apollo: {
    webSites: {
      query: gql`
        query {
          webSites: getAgents {
            name
            url
          }
        }
      `
    }
  },
  methods: {
    async deletes(name: string) {
      const isDel = await this.$bvModal.msgBoxConfirm(
        `确定删除代理：${name} 的相关信息吗？`,
        { buttonSize: "sm", title: "Info?", headerBgVariant: "info" }
      );
    }
  }
});
</script>