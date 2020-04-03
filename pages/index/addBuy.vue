<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-card title="经销商Mg" sub-title="添加经销商">
          <b-card-body>
            <b-form-group label="选择区域:" label-align="right" label-cols="2">
              <b-form-select :options="daqu" v-model="ad.daqu"></b-form-select>
            </b-form-group>
            <b-form-group label="名称:" label-align="right" label-cols="2">
              <b-form-input v-model="ad.title"></b-form-input>
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
            <b-button @click="Submit" block variant="success">提交</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { buy, buyList } from "../../types/typing";
export default Vue.extend({
  data() {
    return {
      ad: {
        title: this.$route.query.title || "",
        daqu: this.$route.query.daqu || "",
        province: "",
        city: "",
        area: "",
        address: "",
        tel: "",
        linkman: "",
        phone: "",
      },
      daqu: [
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
      ]
    };
  },
  methods: {
    regionChange(data: any) {
      let { area, city, province } = data;
      this.ad.area = area ? area.value : "";
      this.ad.city = city ? city.value : "";
      this.ad.province = province ? province.value : "";
    },
    async Submit() {
      const {
        title,
        daqu,
        province,
        city,
        area,
        address,
        tel,
        linkman,
        phone
      } = this.$data.ad;
      const info = `区域：${daqu}
                    省市县(区)：${province}|${city}|${area}
                    详细地址：${address}
                    联系人：${linkman}|${tel}|${phone}`

      const isQ = await this.$bvModal.msgBoxConfirm(info, {
        title: "核对信息",
        buttonSize: "sm"
      });
      if (isQ) {
        const date = new Date().toLocaleDateString("zh");
        const link = `/about/${date + new Date().getSeconds()}`;
        const ad: buyList = {
          MainTitle: daqu,
          MainParent: "经销商列表",
          table: "Buy_list",
          link,
          parentsUntil: daqu,
          parent: (province as string).replace(/[省市]/,''),
          title,
          content: info
        };
        await this.$apollo.mutate({
          mutation: gql`
            mutation($arg: JSON) {
              setBuy(arg: $arg) {
                ok
              }
            }
          `,
          variables: { arg: ad }
        });
        this.$bvModal.msgBoxOk("添加成功");
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
