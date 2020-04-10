<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>视频教程/常见问题</span>
    </b-card-header>
    <b-card-body>
      <b-form class="m-5">
        <my-keywords
          :title.sync="problem.PageTitle"
          :keywords.sync="problem.Pagekeywords"
          :description.sync="problem.Pagedescription"
        ></my-keywords>
        <b-form-group label="*父类型:" label-cols="2" label-align="right">
          <b-form-select :options="parentsUntil" v-model="problem.MainParent"></b-form-select>
        </b-form-group>
        <b-form-group label="*子类型:" label-cols="2" label-align="right">
          <b-form-select :options="parent" v-model="problem.MainTitle"></b-form-select>
        </b-form-group>
        <b-form-group label="*标题:" label-cols="2" label-align="right">
          <b-form-input v-model.trim="problem.title"></b-form-input>
        </b-form-group>
        <b-form-group label="*视频链接:" label-cols="2" label-align="right">
          <b-form-input v-model.trim="problem.movie"></b-form-input>
        </b-form-group>
        <vue-editor id="asxsd " v-model="problem.html"></vue-editor>
        <b-button block @click="Submit('problem')" variant="success">提交</b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { supportList } from "../../types/typing";
export default Vue.extend({
  data() {
    return {
      parentsUntil: [
        "软件设置",
        "电池连接",
        "硬件安装",
        "错误代码",
        "技术文档"
      ],
      problem: {
        PageTitle: "",
        Pagekeywords: "",
        Pagedescription: "",
        MainUrl: "",
        MainTitle: "",
        MainParent: "",
        title: "",
        link: "",
        movie: "",
        html: `<font face="宋体">一体化机柜将数据中心基础设施产品进行深度整合，包含</font>`
      },
      blem: null,
      active: false,
    };
  },
  computed: {
    parent() {
      const s = this.$data.problem.MainParent;
      const parent = {
        软件设置: [
          "软件设置",
          "viewpower设置",
          "viewpowerPro设置",
          "viewpower mini",
          "SH/D3000",
          "百事服",
          "NAS系统"
        ],
        电池连接: ["电池连接"],
        硬件安装: ["硬件安装", "电池更换", "套件安装"],
        错误代码: ["错误代码", "警告代码", "故障代码"],
        技术文档: [
          "技术文档",
          "电池相关",
          "数据中心相关",
          "精密空调相关",
          "UPS相关"
        ]
      };
      return (parent as any)[s];
    }
  },
  watch: {
    blem: function(val: supportList) {
      if (val) {
        Object.assign(this.problem, val);
        this.active = !Boolean(val.movie);
      }
    }
  },
  apollo: {
    blem: {
      query: gql`
        query($title: String) {
          blem: getProblem(title: $title) {
            PageTitle
            Pagekeywords
            Pagedescription
            MainUrl
            MainTitle
            MainParent
            title
            link
            movie
            html
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
            setProblem(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: this.$data.problem }
      });
      this.$bvToast.toast("success");
      this.$apollo.queries.blem.refresh();
    }
  }
});
</script>

