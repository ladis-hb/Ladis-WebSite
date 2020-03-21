<template>
  <div class="overflow-auto">
    <b-card>
      <b-card-header class="bg-light">产品</b-card-header>
      <b-card-body id="editSelect">
        <div>
          <b-form-group label="产品类型:" label-align="right" label-cols="2">
            <b-form-select
              v-model="selectType"
              :options="ProductType"
            ></b-form-select>
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
          <b-button
            variant="info"
            @click="Save_content_body"
            :disabled="content_head === ''"
            >保存为内容</b-button
          >
         <!--  <b-button class="ml-5" @click="Preview">预览</b-button> -->
          <b-button variant="success" class="float-right" @click="SendEdit"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { selectFiles, editProduct } from '../../server/typing/interface'
import gql from 'graphql-tag'
export default Vue.extend({
  data() {
    const ProductType = [
      'UPS电源',
      '后备式UPS电源',
      '高频单相UPS电源',
      '高频三相UPS电源',
      '工频UPS电源',
      '机架式UPS电源',
      '模块化UPS电源',
      'UPS蓄电池',
      '数据中心',
      '微模块机房',
      '一体化机柜',
      '配电PDU',
      '动环监控',
      '网络机柜',
      '机房空调',
      '房间空调',
      '列间空调',
      '机架空调',
    ]
    const hljs = null
    const editorOption = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image'], //, "video"]
        ],
        syntax: {
          highlight: (text: any) => (hljs as any).highlightAuto(text).value,
        },
      },
    }
    return {
      ProductType,
      selectType: '', // 产品类型
      title: '', // 产品名称
      indexPic: '', // 产品主图
      carouselPic: [], // 产品轮播图
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">
      Text content loading..</span></h2>`,
      content_head: '', // 简介
      content_body: '', //详情
      editorOption,
    }
  },
  computed: {
    SourceFile() {
      const SourceFile: selectFiles[] = this.$store.state.SourceFile
      const result = SourceFile.filter(
        file => file.filetype === 'img'
      ).map(file => Object.assign(file, { text: file.name, value: file.path }))
      return result
    },
  },

  methods: {
    // 提交
    async SendEdit() {
      const params: editProduct = {
        selectType: this.selectType,
        title: this.title,
        indexPic: this.indexPic,
        carouselPic: this.carouselPic,
        content_head: this.content_head,
        content_body: this.content_body,
        
      }
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON) {
            setProduct(arg: $arg) {
              ok
              msg
            }
          }
        `,
        variables: { arg: params },
      })
      const data = result.data.setProduct
      const isQ = await this.$bvModal.msgBoxConfirm(
        "编辑成功",
        { title: "edit success" }
      )
    },
    Save_content_head() {
      this.content_head = this.content
      this.content = ''
    },
    // save消息主题
    Save_content_body() {
      this.content_body = this.content
      this.content = ''
    },
    // 预览
    Preview() {
      /* this.$store.commit("carouselPic", {
        title: this.title,
        content_head: this.content_head,
        content_body: this.content_body,
        carouselPic: this.carouselPic,
        selectType: this.selectType,
        indexPic: this.indexPic
      }); */
      const rout = this.$router.resolve({
        name: 'prewive',
        params: {
          title: this.$data.title,
          content_head: this.$data.content_head,
          content_body: this.$data.content_body,
          carouselPic: this.$data.carouselPic,
        },
      })
      window.open(rout.href, '_blank')
    },
    // edit编辑器输入事件
    onEditorChange({ html }: { html: string }) {
      this.content = html
    },
  },
})
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
