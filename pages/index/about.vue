<template>
  <b-card>
    <b-card-header>代理商列表</b-card-header>
    <b-card-body>
      <b-table-lite :items="webSites" :fields="fields">
          <template v-slot:cell(oprate)="row">
              <b-button-group>
                  <b-button variant="info" :to="{name:'index-addAbout',query:{name:row.item.name}}">编辑</b-button>
                  <b-button @click="deletes(row.item.name)">删除</b-button>
              </b-button-group>
          </template>
      </b-table-lite>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
export default Vue.extend({
  data() {
    return {
      webSites: [],
      fields:[
          {key:'name',label:'代理商'},
          {key:'url',label:'网址'},
          {key:'oprate',label:'操作'}
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
  methods:{
     async deletes(name:string){
          const isDel = await this.$bvModal.msgBoxConfirm(`确定删除代理：${name} 的相关信息吗？`,{buttonSize:'sm',title:"Info?",headerBgVariant:'info'})
      }
  }
});
</script>