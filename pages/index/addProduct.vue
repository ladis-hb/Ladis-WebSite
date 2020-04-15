<template>
  <my-card title="产品详情" :load="$apollo.loading">
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
      <my-selectfile :isPic="true" :files.sync="productImg"></my-selectfile>
    </b-form>
    <div id="pre" class="border rounded p-2">
      <b-row>
        <b-col>
          <my-selectfile-multi :isPic="true" :files.sync="dev.img"></my-selectfile-multi>
        </b-col>
        <b-col>
          <my-code :html.sync ='dev.head'></my-code>
          <!-- <my-edit :content.sync='dev.head'></my-edit> -->
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-card title="产品特点" class="w-100">
          <my-code :html.sync ='dev.body'></my-code>
          <!-- <my-edit :content.sync='dev.body'></my-edit> -->
        </b-card>
      </b-row>
    </div>
    <div id="editFooter" class="p-3">
      <b-button block variant="success" class="float-right" @click="SendEdit()">确定</b-button>
    </div>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import {
  selectFiles,
  editProduct,
  product,
  productList
} from "../../types/typing";
import { paresLink } from "../../plugins/tool";

export default Vue.extend({
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
        href: "",
        title: "",
        link: "",
        head: "",
        body: "",
        img: [],
      } as productList,
      ProductType,
      // apollo
      productImg: ""
    };
  },

  apollo: {
    productImg: {
      query: gql`
        query getProduct($title: String) {
          productImg: getProduct(title: $title) {
            img
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      },
      update: data => data.productImg?.img || ""
    },
    dev: {
      query: gql`
        query($title: String) {
          dev: getProductList(title: $title) {
            PageTitle
            Pagekeywords
            Pagedescription
            MainUrl
            MainTitle
            MainParent
            date
            table
            href
            title
            link
            head
            body
            img
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      },
      update: function(data) {
        if (data.dev) {
          const dev: productList = data.dev;

          if (dev?.t1 && !dev.head) {
            dev.head = dev.t1?.content;
            dev.body = dev.t2?.content;
          }
          return dev;
        } else {
          return this.$data.dev;
        }
      }
    }
  },
  scrollToTop: true,
  methods: {
    // 提交
    async SendEdit() {
      const dev: productList = this.$data.dev;
      const { date, link, datePares } = paresLink("products");
      console.log(datePares);

      // 构建产品目录
      const product: product = {
        MainTitle: dev.MainParent,
        date,
        link: dev.link || link,
        title: dev.title,
        img: this.$data.productImg
      };
      // 构建产品详情
      const productlist: productList = {
        PageTitle: dev.PageTitle,
        Pagekeywords: dev.Pagekeywords,
        Pagedescription: dev.Pagedescription,
        MainParent: dev.MainParent,
        date,
        link: dev.link || link,
        title: dev.title,
        head: dev.head,
        body: dev.body,
        img: dev.img
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
        variables: {
          arg: { product, productlist }
        }
      });
      this.$apollo.queries.productImg.refresh();
      this.$apollo.queries.dev.refresh();
      this.$bvModal.msgBoxOk("success");
    }
  }
});
</script>
