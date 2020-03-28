<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-card title="经销商Mg" sub-title="添加经销商">
          <b-card-body>
            <div class="mb-2">
              <p>选择地址:</p>
              <v-region @values="regionChange"></v-region>
            </div>

            <b-form-group label="详细地址:">
              <b-form-input v-model="ad.address"></b-form-input>
            </b-form-group>
            <b-form-group label="选择区域:">
              <b-form-select :options="daqu" v-model="ad.daqu"></b-form-select>
            </b-form-group>
            <b-form-group label="联系人:">
              <b-form-input v-model="ad.linkman"></b-form-input>
            </b-form-group>
            <b-form-group label="座机电话(多个电话用';'分隔)：">
              <b-form-input v-model="ad.tel"></b-form-input>
            </b-form-group>
            <b-form-group label="手机(多个电话用';'分隔):">
              <b-form-input v-model="ad.phone"></b-form-input>
            </b-form-group>
            <b-form-group label="备注信息:">
              <b-form-textarea v-model="ad.remark"></b-form-textarea>
            </b-form-group>
            <b-button @click="Submit" block variant="success">提交</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import { buy, buyList } from '../../types/typing'
export default Vue.extend({
  data() {
    return {
      ad: {
        daqu: '',
        province: '',
        city: '',
        area: '',
        address: '华一路1-1号2楼 ',
        tel: '0571-88254085 88254086',
        linkman: '杨清华',
        phone: '13777892810',
        remark: '杭州市 （浙江省销售服务中心）',
      },
      daqu: [
        { value: '华中地区销售服务中心', text: '华中地区销售服务中心' },
        { value: '华东地区销售服务中心', text: '华东地区销售服务中心' },
        { value: '华北地区销售服务中心', text: '华北地区销售服务中心' },
        { value: '华南地区销售服务中心', text: '华南地区销售服务中心' },
        { value: '西南地区销售服务中心', text: '西南地区销售服务中心' },
        { value: '东北地区销售服务中心', text: '东北地区销售服务中心' },
        { value: '西北地区销售服务中心', text: '西北地区销售服务中心' },
      ],
    }
  },
  methods: {
    regionChange(data: any) {
      let { area, city, province } = data
      this.ad.area = area ? area.value : ''
      this.ad.city = city ? city.value : ''
      this.ad.province = province ? province.value : ''
    },
    async Submit() {
      const {
        daqu,
        province,
        city,
        area,
        address,
        tel,
        linkman,
        phone,
        remark,
      } = this.$data.ad
      const info = `区域：${daqu}\n
                    省市县(区)：${province}|${city}|${area}\n
                    详细地址：${address}\n
                    联系人：${linkman}|${tel}|${phone}\n
                    备注：${remark}`

      const isQ = await this.$bvModal.msgBoxConfirm(info, {
        title: '核对信息',
        buttonSize: 'sm',
      })
      if (isQ) {
        const date = new Date().toLocaleDateString('zh')
        const link = `/about/${date + new Date().getSeconds()}`
        const ad: buyList = {
          MainTitle: daqu,
          MainParent: '经销商列表',
          table: 'Buy_list',
          link,
          parentsUntil: daqu,
          parent: province,
          title: remark,
          content: info,
        }
        await this.$apollo.mutate({
          mutation: gql`
            mutation($arg: JSON) {
              setBuy(arg: $arg) {
                ok
              }
            }
          `,
          variables: { arg: ad },
        })
        this.$bvModal.msgBoxOk('添加成功')
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
