<template>
  <div>
    <b-card>
      <b-card-header class="bg-light">Case</b-card-header>
      <b-card-body>
        <div id="editSelect">
          <b-form-group label="案例类型:" label-align="right" label-cols="2">
            <b-form-select v-model="type" :options="editOption"></b-form-select>
          </b-form-group>
          <b-form-group label="案例标题:" label-align="right" label-cols="2">
            <b-form-input v-model.trim="title"></b-form-input>
          </b-form-group>
          <b-form-group label="图片:" label-align="right" label-cols="2">
            <b-form-select v-model="file" :options="SourceFile"></b-form-select>
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
          <b-button
            variant="success"
            class="float-right"
            @click="SendEdit('case')"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { selectFiles } from '../../server/typing/interface'
import gql from 'graphql-tag'
export default Vue.extend({
  data() {
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
      title: '',
      type: '',
      file: '',
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editOption: ['[UPS电源]', '[一体化机柜]', '[数据中心]', '[机房空调]'],
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
    async SendEdit(Type: string) {
      let { file, type: editType, content, title } = this.$data
      if (!file || !content || !title || !editType)
        return this.$bvModal.msgBoxOk('参数不能为空', { title: '输入错误' })
      if (title.length > 50)
        return this.$bvModal.msgBoxOk('标题长度过长', { title: '输入错误' })
      if (file.size > 2048000)
        return this.$bvModal.msgBoxOk('图片大大小不能超过2MB', {
          title: '输入错误',
        })
      const params = {
        pic: file,
        content,
        title,
        editType,
        inputType: Type,
      }
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($type: String, $arg: JSON) {
            ok
            msg
          }
        `,
        variables: { type: Type, arg: params },
      })
      this.$bvModal.msgBoxOk('编辑成功')
      /* let result = await SendNewCaseEdit(params);
      if (result.stat) {
        const isQ = await this.$bvModal.msgBoxConfirm(result.msg, {
          title: "编辑成功"
        });
        if (isQ) {
          this.$router.push({ path: result.href });
        }
      } else {
        switch (result.error) {
          case "tokenValidationError":
            const isQ = await this.$bvModal.msgBoxConfirm(result.msg, {
              title: "提交错误"
            });
            if (isQ) {
              this.$router.push({ path: "/admin/accont" });
            } else {
              this.$router.push({ path: "/admin/accont" });
            }

            break;
        }
      }  */
    },
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
</style>
