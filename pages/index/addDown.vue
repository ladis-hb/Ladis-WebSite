<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>软件/彩页/资质上传</span>
    </b-card-header>
    <b-card-body>
      <b-form class="m-5">
        <my-keywords
          :title.sync="dev.PageTitle"
          :keywords.sync="dev.Pagekeywords"
          :description.sync="dev.Pagedescription"
        ></my-keywords>
        <b-form-group label="*标题:" label-cols="2" label-align="right">
          <b-form-input v-model.trim="dev.title"></b-form-input>
        </b-form-group>
        <b-form-group label="*上传类型:" label-cols="2" label-align="right">
          <b-form-select :options="selectType" v-model="dev.type"></b-form-select>
        </b-form-group>
        <div id="soft" v-if="dev.type === 'soft'">
          <b-form-group label="*软件平台:" label-cols="2" label-align="right">
            <b-form-select :options="selectSoft" v-model="dev.MainTitle"></b-form-select>
          </b-form-group>

          <b-form-group label="说明:" label-cols="2" label-align="right">
            <b-form-input v-model.trim="dev.platform"></b-form-input>
          </b-form-group>
          <b-form-group label="*语言:" label-cols="2" label-align="right">
            <b-form-select :options="languages" v-model="dev.language"></b-form-select>
          </b-form-group>
          <b-form-group label="版本:" label-cols="2" label-align="right">
            <b-form-input v-model.trim="dev.version"></b-form-input>
          </b-form-group>
          <b-form-group label="更新说明:" label-cols="2" label-align="right">
            <b-form-input v-model.trim="dev.updateReason"></b-form-input>
          </b-form-group>
        </div>
        <div id="zz" v-if="dev.type === 'pdf'">
          <b-form-group label="*彩页类型:" label-cols="2" label-align="right">
            <b-form-select :options="selectPdf" v-model="dev.MainTitle"></b-form-select>
          </b-form-group>
        </div>
        <my-selectfile :isPic="false" :files.sync="dev.down" v-if="dev.type"></my-selectfile>
        <b-button block @click="Submit()" variant="success">提交</b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import MyKeywords from "../../components/MyKeywords.vue";
import MySelectfile from "../../components/MySelectfile.vue";
import { selectFiles, ApolloMongoResult } from "../../server/typing/interface";
import gql from "graphql-tag";
import { support } from "../../types/typing";
export default Vue.extend({
  components: { MyKeywords, MySelectfile },
  data() {
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
        link: "",
        language: "",
        type: "",
        title: "",
        platform: "",
        size: "",
        version: "",
        updateReason: "",
        down: ""
      },
      selectType: [
        { text: "软件", value: "soft" },
        { text: "彩页/资质", value: "pdf" }
      ],
      selectSoft: ["windows", "linux", "mac", "other"],
      selectPdf: [
        "其他产品彩页",
        "数据中心彩页",
        "机房空调彩页",
        "UPS电源彩页",
        "UPS相关",
        "精密空调相关",
        "数据中心相关",
        "公司相关"
      ],
      languages: ["简体中文", "英文"],
      support: null,
      active: false
    };
  },
  watch: {
    support: function(newVal: support) {
      if (newVal) {
        this.active =
          newVal.type === "pdf" &&
          this.selectPdf.includes(newVal.MainTitle as string);
        this.$data.dev.PageTitle = newVal.PageTitle;
        this.$data.dev = Object.assign(this.$data.dev, newVal);
        //console.log({ dev: this.$data.dev, newVal,PageTitle:this.$data.dev.PageTitle });
        this.dev.down = newVal.down || (newVal.href as string);
      } else {
        Object.assign(this.dev, {
          PageTitle: "",
          Pagekeywords: "",
          Pagedescription: "",
          MainUrl: "",
          MainTitle: "",
          MainParent: "",
          date: "",
          href: "",
          link: "",
          language: "",
          type: "",
          title: "",
          platform: "",
          size: "",
          version: "",
          updateReason: "",
          down: ""
        });
      }
    }
  },
  apollo: {
    support: {
      query: gql`
        query($title: String) {
          support: getSoft(title: $title) {
            PageTitle
            Pagekeywords
            Pagedescription
            MainUrl
            MainTitle
            MainParent
            date
            href
            link
            language
            type
            title
            platform
            size
            version
            updateReason
            down
          }
        }
      `,
      variables() {
        return {
          title: this.$route.query.title
        };
      },
      fetchPolicy: "network-only"
    }
  },
  methods: {
    async Submit() {
      const params: support = this.$data.dev;
      if (!params.link) {
        const date = new Date().toLocaleDateString("zh");
        const link = `/support/${date + new Date().getSeconds()}`;
      }
      

      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setSoft(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: params }
      });
      this.$bvToast.toast("success");
      this.$apollo.queries.support.refresh();
    }
  }
});
</script>
