<template>
  <div class="overflow-auto">
    <b-card>
      <b-card-header class="bg-dark text-light">About</b-card-header>
      <b-card-body id="editSelect">
        <div>
          <b-form-group label="类型:" label-align="right" label-cols="2">
            <b-form-select v-model="selectType" :options="type"></b-form-select>
          </b-form-group>
          <b-form-group label="区域网址:" label-align="right" label-cols="2">
            <b-input disabled :placeholder="name"></b-input>
            <!-- <b-form-select v-model="webSite" :options="webSites"></b-form-select> -->
          </b-form-group>
        </div>
        <section id="editBody" class="my-3">
          <my-edit :content.sync="content" />
        </section>

        <div id="editFooter">
          <b-button variant="success" class="float-right" @click="SendEdit">确定</b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import MyEdit from "../../components/MyEdit.vue";
import { about } from "../../types/typing";
export default Vue.extend({
  components: { MyEdit },
  data() {
    return {
      type: [
        "公司简介",
        "服务承诺",
        "经营理念",
        "加入我们",
        "联系我们",
        "使用声明",
        "隐私政策"
      ],
      selectType: "公司简介",
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">
      Text content loading..</span></h2>`
    };
  },
  computed: {
    name() {
      return this.$route.query.name;
    }
  },
  watch: {
    contents: function(newVal) {
      this.$data.content = newVal;
    }
  },
  apollo: {
    contents: {
      query: gql`
        query($selectType: String, $webSite: String) {
          contents: getAbouts(selectType: $selectType, webSite: $webSite)
        }
      `,
      variables() {
        return {
          webSite: (this as any).name,
          selectType: this.$data.selectType
        };
      },
      fetchPolicy: "network-only"
    }
  },
  methods: {
    async SendEdit() {
      let { selectType, webSite, content } = this.$data;
      const params: about = {
        type: selectType,
        webSite,
        content
      };
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setAbout(arg: $arg) {
              ok
            }
          }
        `,
        variables: {
          arg: params
        }
      });
      // console.log(result);
      this.$bvModal.msgBoxOk("操作成功", { buttonSize: "sm" });
      this.$data.content = "";
    },

    onEditorChange({ html }: any) {
      this.$data.content = html;
    }
  }
});
</script>

<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  max-height: 400px;
  width: auto;
  overflow-y: auto;
}
.text-capitalize {
  border-bottom: inset 1px;
}
</style>
