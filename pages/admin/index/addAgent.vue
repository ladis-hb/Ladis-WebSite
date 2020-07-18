<template>
  <my-card title="关于代理" :load="$apollo.loading">
    <div>
      <b-form-group label="代理商名称:" label-align="right" label-cols="2">
        <b-input v-model="name"></b-input>
      </b-form-group>
      <b-form-group label="区域网址:" label-align="right" label-cols="2">
        <b-input v-model="url"></b-input>
      </b-form-group>
    </div>
    <div id="editFooter">
      <b-button variant="success" class="float-right" @click="SendEdit">确定</b-button>
    </div>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { about } from "../../../types/typing";
export default Vue.extend({
  data() {
    return {
      name:"",
      url:""
    };
  },
  
  methods: {
    async SendEdit() {
      let { name, url } = this.$data;
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            addAgent(arg: $arg) {
              ok
            }
          }
        `,
        variables: {
          arg: {name,url}
        }
      });
      // console.log(result);
      this.$bvModal.msgBoxOk("操作成功", { buttonSize: "sm" });
      this.$data.content = "";
    },

  }
});
</script>

