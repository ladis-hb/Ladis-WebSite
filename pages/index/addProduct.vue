<template>
  <b-card>
    <b-card-header class="bg-light">产品</b-card-header>
    <b-card-body id="editSelect">
      <b-form>
        <my-keywords
          :title.sync="dev.PageTitle"
          :keywords.sync="dev.Pagekeywords"
          :description.sync="dev.Pagedescription"
        ></my-keywords>
        <b-form-group label="产品类型:" label-align="right" label-cols="2">
          <b-form-select v-model="dev.MainParent" :options="ProductType"></b-form-select>
        </b-form-group>
        <b-form-group label="产品标题:" label-align="right" label-cols="2">
          <b-form-input v-model.trim="dev.title"></b-form-input>
        </b-form-group>
        <my-selectfile :isPic="true" :files.sync="dev.img"></my-selectfile>
        <!-- <b-form-group label="轮播图片:" label-align="right" label-cols="2">
          <b-form-select v-model="carouselPic" :options="SourceFile" multiple></b-form-select>
        </b-form-group>-->
        <b-form-group label="产品介绍:" label-align="right" label-cols="2">
          <b-form-input disabled v-model.trim="dev.head" @click="content = dev.head"></b-form-input>
        </b-form-group>
        <b-form-group label="产品详情:" label-align="right" label-cols="2">
          <b-form-input disabled v-model.trim="dev.body"></b-form-input>
        </b-form-group>

        <my-edit :content.sync="content" />
      </b-form>
      <div id="editFooter">
        <b-button variant="info" @click="Save_content_head">保存为说明</b-button>
        <b-button variant="info" @click="Save_content_body" :disabled="dev.head === ''">保存为内容</b-button>
        <!--  <b-button class="ml-5" @click="Preview">预览</b-button> -->
        <b-button variant="success" class="float-right" @click="SendEdit">确定</b-button>
      </div>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import MyKeywords from "../../components/MyKeywords.vue";
import gql from "graphql-tag";
import MyEdit from "../../components/MyEdit.vue";
import MySelectfile from "../../components/MySelectfile.vue";
import { selectFiles, editProduct } from "../../server/typing/interface";

export default Vue.extend({
  components: { MyKeywords, MyEdit, MySelectfile },
  data() {
    const ProductType = [
      "UPS电源",
      "后备式UPS电源",
      "高频单相UPS电源",
      "高频三相UPS电源",
      "工频UPS电源",
      "机架式UPS电源",
      "模块化UPS电源",
      "UPS蓄电池",
      "数据中心",
      "微模块机房",
      "一体化机柜",
      "配电PDU",
      "动环监控",
      "网络机柜",
      "机房空调",
      "房间空调",
      "列间空调",
      "机架空调"
    ];

    return {
      dev: {
        PageTitle: "",
        Pagekeywords: "",
        Pagedescription: "",
        MainUrl: "",
        MainTitle: "",
        MainParent: "",
        date: "",
        table: "",
        href: "",
        title: "",
        link: "",
        t1: "",
        t2: "",
        head: "",
        body: "",
        img: "",
        down: ""
      },
      ProductType,
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">
      Text content loading..</span></h2>`
    };
  },

  methods: {
    // 提交
    async SendEdit() {
      /* const params: editProduct = {
        selectType: this.selectType,
        title: this.title,
        indexPic: this.indexPic,
        carouselPic: this.carouselPic,
        content_head: this.content_head,
        content_body: this.content_body
      };
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setProduct(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: params }
      });
      const data = result.data.setProduct;
      const isQ = await this.$bvModal.msgBoxConfirm("编辑成功", {
        title: "edit success"
      }); */
    },
    Save_content_head() {
      /* this.content_head = this.content;
      this.content = ""; */
    },
    // save消息主题
    Save_content_body() {
      /* this.content_body = this.content;
      this.content = ""; */
    }
  }
});
</script>
