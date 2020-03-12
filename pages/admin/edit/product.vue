<template>
  <div class="overflow-auto">
    <b-card>
      <b-card-header class="bg-light">产品</b-card-header>
      <b-card-body id="editSelect">
        <div>
          <b-form-group label="产品类型:" label-align="right" label-cols="2">
            <b-form-select v-model="selectType" :options="type"></b-form-select>
          </b-form-group>
          <b-form-group label="产品标题:" label-align="right" label-cols="2">
            <b-form-input v-model.trim="title"></b-form-input>
          </b-form-group>
          <b-form-group label="产品图片:" label-align="right" label-cols="2">
            <b-form-select
              v-model="indexPic"
              :options="SourceFile"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="轮播图片:" label-align="right" label-cols="2">
            <b-form-select
              v-model="carouselPic"
              :options="SourceFile"
              multiple
            ></b-form-select>
          </b-form-group>
          <b-form-group label="产品介绍:" label-align="right" label-cols="2">
            <b-form-input
              disabled
              v-model.trim="content_head"
              @click="content = content_head"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="产品详情:" label-align="right" label-cols="2">
            <b-form-input disabled v-model.trim="content_body"></b-form-input>
          </b-form-group>
        </div>
        <section id="editBody" class="my-3">
          <div
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>

        <div id="editFooter">
          <b-button variant="info" @click="Save_content_head"
            >保存为说明</b-button
          >
          <b-button variant="info" @click="Save_content_body"
            >保存为内容</b-button
          >
          <b-button class="ml-5" @click="Preview">预览</b-button>
          <b-button variant="success" class="float-right" @click="SendEdit"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { Add_Product } from "../../../api/axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      type: [
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
      ],
      selectType: "",
      title: "",
      indexPic: "",
      carouselPic: [],
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">
      Text content loading..</span></h2>`,
      content_head: "",
      content_body: "",
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
    ...mapState(["user", "token", "carouselPics", "SourceFile"])
  },
  activated() {
    if (this.carouselPics) {
      let {
        title,
        content_head,
        content_body,
        carouselPic,
        selectType,
        indexPic
      } = this.carouselPics;

      this.title = title;
      this.content_head = content_head;
      this.content_body = content_body;
      this.carouselPic = carouselPic;
      this.selectType = selectType;
      this.indexPic = indexPic;
      this.content = content_body;
    }
  },
  methods: {
    async SendEdit() {
      let params = {
        selectType: this.selectType,
        title: this.title,
        content_head: this.content_head,
        content_body: this.content_body,
        indexPic: this.indexPic,
        carouselPic: this.carouselPic.join("+")
      };

      let result = await Add_Product(params);
      const isQ = await this.$bvModal.msgBoxConfirm(
        "编辑成功，是否跳转到页面？",
        { title: "edit success" }
      );
      if (isQ) {
        this.$router.push(result.href);
      }
    },
    Save_content_head() {
      this.content_head = this.content;
      this.content = "";
    },
    Save_content_body() {
      this.content_body = this.content;
      this.content = "";
    },
    Preview() {
      this.$store.commit("carouselPic", {
        title: this.title,
        content_head: this.content_head,
        content_body: this.content_body,
        carouselPic: this.carouselPic,
        selectType: this.selectType,
        indexPic: this.indexPic
      });
      let routeData = this.$router.push({
        name: "admin-prewive___zh",
        params: {
          title: this.title,
          content_head: this.content_head,
          content_body: this.content_body,
          carouselPic: this.carouselPic
        }
      });
    },
    onEditorChange({ html }) {
      this.content = html;
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
.text-capitalize {
  border-bottom: inset 1px;
}
</style>
