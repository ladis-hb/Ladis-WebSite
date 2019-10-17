<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-tabs v-model="active" id="tabs">
          <b-tab title="软件上传">
            <b-form class="m-5">
              <b-form-group label="*软件平台:" label-cols="2" label-align="right">
                <b-form-select :options="soft.system" v-model="soft.selectSystem"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="soft.title"></b-form-input>
              </b-form-group>
              <b-form-group label="说明:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="soft.platform"></b-form-input>
              </b-form-group>
              <b-form-group label="*语言:" label-cols="2" label-align="right">
                <b-form-select :options="soft.language" v-model="soft.selectLanguage"></b-form-select>
              </b-form-group>
              <b-form-group label="版本:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="soft.version"></b-form-input>
              </b-form-group>
              <b-form-group label="更新说明:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="soft.update"></b-form-input>
              </b-form-group>
              <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-select v-model="soft.file" :options="SourceFile"></b-form-select>
              </b-form-group>
              <b-button block @click="Submit('soft')" variant="success">提交</b-button>
            </b-form>
          </b-tab>
          <b-tab title="彩页上传">
            <b-form class="m-5">
              <b-form-group label="*彩页类型:" label-cols="2" label-align="right">
                <b-form-select :options="cp.system" v-model="cp.selectSystem"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="cp.title"></b-form-input>
              </b-form-group>

              <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-select v-model="cp.file" :options="SourceFile"></b-form-select>
              </b-form-group>
              <b-button block @click="Submit('cp')" variant="success">提交</b-button>
            </b-form>
          </b-tab>
          <b-tab title="资质">
            <b-form class="m-5">
              <b-form-group label="*资质类型:" label-cols="2" label-align="right">
                <b-form-select :options="zz.system" v-model="zz.selectSystem"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="zz.title"></b-form-input>
              </b-form-group>

              <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-select v-model="zz.file" :options="SourceFile"></b-form-select>
              </b-form-group>
              <b-button block @click="Submit('zz')" variant="success">提交</b-button>
            </b-form>
          </b-tab>
          <b-tab title="视频教程">
            <b-form class="m-5">
              <b-form-group label="*父类型:" label-cols="2" label-align="right">
                <b-form-select :options="problem.parentsUntil" v-model="problem.selectparentsUntil"></b-form-select>
              </b-form-group>
              <b-form-group label="*子类型:" label-cols="2" label-align="right">
                <b-form-select :options="parent" v-model="problem.selectparent"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="problem.title"></b-form-input>
              </b-form-group>
              <b-form-group label="*视频链接:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="problem.movie"></b-form-input>
              </b-form-group>
              <b-button block @click="Submit('problem')" variant="success">提交</b-button>
            </b-form>
          </b-tab>
          <b-tab title="常见问题">
            <b-form class="m-5">
              <b-form-group label="*父类型:" label-cols="2" label-align="right">
                <b-form-select :options="problem.parentsUntil" v-model="problem.selectparentsUntil"></b-form-select>
              </b-form-group>
              <b-form-group label="*子类型:" label-cols="2" label-align="right">
                <b-form-select :options="parent" v-model="problem.selectparent"></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model.trim="problem.title"></b-form-input>
              </b-form-group>
              <div
                class="quill-editor mb-5"
                :content="problem.html"
                @change="onEditorChange($event)"
                v-quill:myQuillEditor="editorOption"
              ></div>
              <b-button block @click="Submit('problem')" variant="success">提交</b-button>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Add_Problem, Add_Soft } from "../../../api/axios";
import { mapState } from "vuex";
import { MessageBox, Loading } from "element-ui";
export default {
  data() {
    return {
      active: Number(this.$route.query.index) || 0,
      soft: {
        system: ["windows", "linux", "mac", "other"],
        selectSystem: "",
        title: "ceshi",
        platform: "ceshi pla",
        language: ["简体中文", "英文"],
        selectLanguage: "",
        version: "1.00",
        update: "test",
        file: "",
        Loading: true
      },
      cp: {
        title: "",
        system: ["其他产品彩页", "数据中心彩页", "机房空调彩页", "UPS电源彩页"],
        selectSystem: "",
        file: ""
      },
      zz: {
        title: "",
        system: ["UPS相关", "精密空调相关", "数据中心相关", "公司相关"],
        selectSystem: "",
        file: ""
      },
      problem: {
        title: "",
        movie: "http://",
        html: "输入",
        parentsUntil: [
          "软件设置",
          "电池连接",
          "硬件安装",
          "错误代码",
          "技术文档"
        ],
        selectparentsUntil: "",
        parent: {
          软件设置: [
            "viewpower设置",
            "viewpowerPro设置",
            "viewpower mini",
            "SH/D3000",
            "百事服",
            "NAS系统"
          ],
          电池连接: ["电池连接"],
          硬件安装: ["电池更换", "套件安装"],
          错误代码: ["警告代码", "故障代码"],
          技术文档: ["电池相关", "数据中心相关", "精密空调相关", "UPS相关"]
        },
        selectparent: ""
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"] //, "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },

  computed: {
    ...mapState(["user", "token", "SourceFile"]),
    parent() {
      return this.problem.parent[this.problem.selectparentsUntil];
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.problem.html = html;
    },
    async Submit(type) {
      let LoadingTabs = Loading.service({ target: "#tabs" });
      let respon = {};
      switch (type) {
        case "problem":
          {
            let problem = this.$data.problem;
            for (let key of Object.keys(problem)) {
              if (problem[key] === "") {
                LoadingTabs.close();
                return MessageBox.alert(`${key}不能为空`, "参数错误");
              }
            }
            problem.type = type;
            respon = await Add_Problem(problem);
          }
          break;
        default:
          {
            let data = this.$data[type];
            let keys = Object.keys(data);
            let params = { type: type };
            for (let key of keys) {
              if (data[key] === "") {
                LoadingTabs.close();
                return MessageBox.alert(`${key}不能为空`, "参数错误");
              }
              params[key] = data[key];
            }
            respon = await Add_Soft(params);
          }
          break;
      }
      let { stat, msg, result } = respon;
      LoadingTabs.close();
      if (stat) return MessageBox.alert(msg, "Success");
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  width: auto;
  overflow-y: auto;
}
</style>
