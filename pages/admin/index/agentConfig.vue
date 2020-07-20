<template>
  <my-card title="代理商网站配置" :load="$apollo.loading">
    <div>
      <b-form-group label="代理商名称:" label-align="right" label-cols="2">
        <b-input v-model="agent.name" disabled></b-input>
      </b-form-group>
      <b-form-group label="区域网址:" label-align="right" label-cols="2">
        <b-input v-model="agent.url" disabled></b-input>
      </b-form-group>
      <b-form-group label="端口:" label-align="right" label-cols="2">
        <b-input v-model="agent.port"></b-input>
      </b-form-group>
      <b-form-group label="百度统计网址:" label-align="right" label-cols="2">
        <b-input v-model="agent.hm"></b-input>
      </b-form-group>
      <b-form-group label="logo类型:" label-align="right" label-cols="2">
        <b-select v-model="agent.logoType" :options="['PNG','STRING']"></b-select>
      </b-form-group>
      <b-form-group label="logo值:" label-align="right" label-cols="2">
        <b-input v-model="agent.logoValue"></b-input>
      </b-form-group>
      <b-form-group label="网站备案号:" label-align="right" label-cols="2">
        <b-input v-model="agent.beian"></b-input>
      </b-form-group>
      <b-form-group label="网站标题:" label-align="right" label-cols="2">
        <b-input v-model="agent.title"></b-input>
      </b-form-group>
      <b-form-group label="网站关键字:" label-align="right" label-cols="2">
        <b-textarea v-model="agent.metaKeywords"></b-textarea>
      </b-form-group>
      <b-form-group label="网站申明:" label-align="right" label-cols="2">
        <b-textarea v-model="agent.metaDescription"></b-textarea>
      </b-form-group>
      <b-form-group label="联系QQ:" label-align="right" label-cols="2">
        <b-input v-model="agent.contactQQ"></b-input>
      </b-form-group>
      <b-form-group label="联系电话:" label-align="right" label-cols="2">
        <b-tags v-model="agent.contactTel"></b-tags>
      </b-form-group>
      <b-form-group label="400电话:" label-align="right" label-cols="2">
        <b-input v-model="agent.contact400"></b-input>
      </b-form-group>
      <b-form-group label="网店:" label-align="right" label-cols="2">
        <b-tags v-model="agent.tml" placeholder="名称和网址以逗号(:)分隔,例：天猫店铺:www.taobao.com"></b-tags>
      </b-form-group>
      <b-form-group label="是否添加为友情连接:" label-align="right" label-cols="2">
        <b-check v-model="agent.share"></b-check>
      </b-form-group>
    </div>
    <div id="editFooter">
      <b-button variant="success" class="float-right" @click="submit">确定</b-button>
    </div>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
export default Vue.extend({
  data() {
    return {
      name: this.$route.query.name,
      agent: {
        name: "",
        url: "",
        share: false,
        port: 80,
        hm: "",
        logoType: "PNG",
        logoValue: "/logo.png",
        beian: "",
        title: "",
        metaKeywords: "",
        metaDescription: "",
        contactQQ: "",
        contactTel: [],
        contact400: "",
        tml:[]
      }
    };
  },
  apollo: {
    agent: {
      query: gql`
        query getAgent($name: String) {
          agent: getAgent(name: $name) {
            name
            url
            share
            port
            hm
            logoType
            logoValue
            beian
            title
            metaKeywords
            metaDescription
            contactQQ
            contactTel
            contact400
            tml
          }
        }
      `,
      variables() {
        const name = this.$data.name;
        return { name };
      }
    }
  },
  methods: {
    async submit() {
      let agent = this.$data.agent;
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            addAgent(arg: $arg) {
              ok
            }
          }
        `,
        variables: {
          arg: agent
        }
      });
      // console.log(result);
      this.$bvModal.msgBoxOk("操作成功", { buttonSize: "sm" });
    }
  }
});
</script>