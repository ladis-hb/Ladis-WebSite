<template>
  <my-card title="代理商列表" :load="$apollo.loading">
    <b-form>
      <b-form-group label="网站名称:" label-align="right" label-cols="2">
        <b-input v-model="LinkFrend.name" />
      </b-form-group>
      <b-form-group label="网站网址:" label-align="right" label-cols="2">
        <b-input v-model="LinkFrend.link"></b-input>
      </b-form-group>
      <b-button block size="sm" @click="addLinkFrend">添加友情链接</b-button>
    </b-form>
    <b-table :items="links"></b-table>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
export default Vue.extend({
  data() {
    return {
      links: [],
      LinkFrend: {
        name: "",
        link: "http://"
      }
    };
  },
  apollo: {
    links: {
      query: gql`
        query {
          links: getLinkFrends {
            name
            link
          }
        }
      `
    }
  },
  methods: {
    async addLinkFrend() {
      const { name, link } = this.LinkFrend;
      
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation addLinkFrend($name: String, $link: String) {
            addLinkFrend(name: $name, link: $link) {
              ok
              msg
            }
          }
        `,
        variables: { name, link }
      });
      this.$apollo.queries.links.refetch();
      this.LinkFrend.name = "";
      this.LinkFrend.link = "";
    }
  }
});
</script>