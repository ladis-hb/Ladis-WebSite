<template>
  <my-card title="经销商Mg" :load="$apollo.loading">
    <b-form name="buy">
      <b-form-group label="类型:" label-align="right" label-cols="2">
        <b-form-select :options="['经销商列表','销售服务中心']" v-model="dev.MainParent"></b-form-select>
      </b-form-group>
      <b-form-group label="选择区域:" label-align="right" label-cols="2">
        <b-form-select :options="daqu" v-model="dev.parentsUntil"></b-form-select>
      </b-form-group>
      <b-form-group label="名称:" label-align="right" label-cols="2">
        <b-form-input v-model="dev.title"></b-form-input>
      </b-form-group>
      <b-form-group label="选择地址:" label-align="right" label-cols="2">
        <v-region @values="regionChange"></v-region>
      </b-form-group>
      <b-form-group label="详细地址:" label-align="right" label-cols="2">
        <b-form-input v-model="ad.address"></b-form-input>
      </b-form-group>

      <b-form-group label="联系人:" label-align="right" label-cols="2">
        <b-form-input v-model="ad.linkman"></b-form-input>
      </b-form-group>
      <b-form-group label="座机电话(多个电话用';'分隔)：" label-align="right" label-cols="2">
        <b-form-input v-model="ad.tel"></b-form-input>
      </b-form-group>
      <b-form-group label="手机(多个电话用';'分隔):" label-align="right" label-cols="2">
        <b-form-input v-model="ad.phone"></b-form-input>
      </b-form-group>
      <b-form-group label="格式化内容:" label-align="right" label-cols="2">
        <b-form-textarea v-model="dev.content" rows="5"></b-form-textarea>
      </b-form-group>
      <b-button @click="Submit" block variant="success">提交</b-button>
    </b-form>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { buy, buyList } from "../../../types/typing";
export default Vue.extend({
  data() {
    const daqu = [
      "华中地区销售服务中心",
      "华东地区销售服务中心",
      "华北地区销售服务中心",
      "华南地区销售服务中心",
      "西南地区销售服务中心",
      "东北地区销售服务中心",
      "西北地区销售服务中心",

      "华中地区经销商",
      "华东地区经销商",
      "华北地区经销商",
      "华南地区经销商",
      "西南地区经销商",
      "东北地区经销商",
      "西北地区经销商"
    ];
    return {
      ad: {
        province: "",
        city: "",
        area: "",
        address: "",
        tel: "",
        linkman: "",
        phone: ""
      },
      daqu,
      dev: {
        MainParent:'',
        parentsUntil: "",
        link: "",
        parent: "",
        title: "",
        content: ""
      } as buyList
    };
  },
  apollo: {
    dev: {
      query: gql`
        query getbuy($title: String) {
          dev: getbuy(title: $title) {
            MainParent
            parentsUntil
            link
            parent
            title
            content
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      },
      update: ({ dev }) => {
        if (dev) {
          return dev;
        } else {
          return {
            MainParent:'经销商列表',
            parentsUntil: "",
            link: "",
            parent: "",
            title: "",
            content: ""
          };
        }
      }
    }
  },
  methods: {
    regionChange(data: any) {
      let { area, city, province } = data;
      this.$data.ad.area = area ? area.value : "";
      this.$data.ad.city = city ? city.value : "";
      this.$data.ad.province = province ? province.value : "";
    },
    async Submit() {
      const ad = this.$data.ad;
      let { MainParent,parentsUntil, link, parent, title, content } = this.$data.dev;
      if (ad.address)
        content = `
                   联系人:${ad.linkman}
                   电 话:${ad.tel}                     
                   手机:${ad.phone}
                   地 址:${ad.province}${ad.city}${ad.area}${ad.address}`;
      const info = `区域：${parentsUntil}/${content}`;

      const isQ = await this.$bvModal.msgBoxConfirm(info, {
        title: "核对信息",
        buttonSize: "sm"
      });
      if (isQ) {
        this.$data.dev.content = content
        const date = new Date().toLocaleDateString("zh");
        link = link || `/about/${date + new Date().getSeconds()}`;
        const params: buyList = {
          MainTitle: parentsUntil,
          MainParent,
          table: "Buy_list",
          link,
          parentsUntil,
          parent: (ad.province as string).replace(/[省市]/, ""),
          title,
          content
        };
        await this.$apollo.mutate({
          mutation: gql`
            mutation($arg: JSON) {
              setBuy(arg: $arg) {
                ok
              }
            }
          `,
          variables: { arg: params }
        });
        this.$bvModal.msgBoxOk("添加成功");
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
