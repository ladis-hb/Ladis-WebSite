<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-tabs id="tabs" fill lazy>
          <b-tab title="软件上传" title-link-class=" text-dark">
            <b-form class="m-5">
              <my-keywords
                v-bind:PageTitle.sync="PageTitle"
                :Pagekeywords.sync="Pagekeywords"
                :Pagedescription.sync="Pagedescription"
              ></my-keywords>
              <b-form-group label="*软件平台:" label-cols="2" label-align="right">
                <b-form-select :options="selectSoft" v-model="MainTitle"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="title"></b-form-input>
              </b-form-group>
              <b-form-group label="说明:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="platform"></b-form-input>
              </b-form-group>
              <b-form-group label="*语言:" label-cols="2" label-align="right">
                <b-form-select :options="languages" v-model="language"></b-form-select>
              </b-form-group>
              <b-form-group label="版本:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="version"></b-form-input>
              </b-form-group>
              <b-form-group label="更新说明:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="updateReason"></b-form-input>
              </b-form-group>
              <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-select v-model="down" :options="SourceFile"></b-form-select>
              </b-form-group>
              <b-button block @click="Submit()" variant="success">提交</b-button>
            </b-form>
          </b-tab>

          <b-tab title="彩页/资质上传" title-link-class=" text-dark" :active="active">
            <b-form class="m-5">
              <my-keywords
                :PageTitle.sync="PageTitle"
                :Pagekeywords.sync="Pagekeywords"
                :Pagedescription.sync="Pagedescription"
              ></my-keywords>
              <b-form-group label="*彩页类型:" label-cols="2" label-align="right">
                <b-form-select :options="selectPdf" v-model="MainTitle"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="title"></b-form-input>
              </b-form-group>

              <!-- <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-select v-model="down" :options="SourceFile"></b-form-select>
              </b-form-group> -->
              <my-selectfile :isPic="true" ></my-selectfile>
              <p>{{PageTitle}}</p>
              <b-button block @click="Submit()" variant="success">提交</b-button>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from "vue";
import MyKeywords from "../../components/MyKeywords.vue";
import MySelectfile from "../../components/MySelectfile.vue"
import { selectFiles, ApolloMongoResult } from "../../server/typing/interface";
import gql from "graphql-tag";
import { support } from "../../types/typing";
export default Vue.extend({
  components: { MyKeywords, MySelectfile },
  data() {
    return {
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
      down: "",

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

  computed: {
    SourceFile() {
      const SourceFile: selectFiles[] = this.$store.state.SourceFile;
      const result = SourceFile.map(file =>
        Object.assign(file, { text: file.name, value: file.path })
      );
      return result;
    }
  },
  watch: {
    support: function(newVal: support) {
      if (newVal) {
        this.active = newVal.type === "pdf";
        Object.assign(this.$data, newVal);
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
      }
    }
  },
  methods: {
    async Submit() {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setSoft(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: this.$data }
      });
      this.$apollo.queries.support.refresh()
    }
  }
});
</script>
