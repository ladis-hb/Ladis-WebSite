<template>
  <div>
    <b-card>
      <b-card-header class="bg-info text-light">新闻资讯</b-card-header>
      <b-card-body>
        <div id="editSelect">
          <b-form-group label="新闻类型:" label-align="right" label-cols="2">
            <b-form-select v-model="type" :options="Option"></b-form-select>
          </b-form-group>
          <b-form-group label="新闻标题:" label-align="right" label-cols="2">
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
            @click="SendEdit('news')"
            >确定</b-button
          >
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import deep from 'deepmerge'
import { selectFiles, cases, caseList } from '../../types/typing'
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
      type:'',
      title: '',
      file: '',
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      Option: ['UPS电源', ' 一体化机柜', '数据中心', '机房空调'],
      editorOption,
    }
  },
  computed: {
    SourceFile() {
      const SourceFile:selectFiles[] = this.$store.state.SourceFile
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
      const date = new Date().toLocaleDateString("zh")
      const link = `/news/${date+new Date().getSeconds()}`
      const newsContent:cases = {
        MainUrl:"",
        MainTitle:editType,
        MainParent:"home",
        table:"News",
        date,
        link,
        href:"",
        name:`[${editType}]`,
        img:file,
        text:title,
        title,
        linkText:"查看详情 >",
        time:date
      }
      
      const newListContent:caseList =deep(newsContent,{MainTitle:title,MainUrl:link,MainParent:editType,title,content,text:null})
      // console.log({newsContent,newListContent});
      
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($arg: JSON){
            setCaseNews(arg:$arg){
              ok
              msg
            }
          }
        `,
        variables: { arg: {newsContent,newListContent} },
      })
      console.log(result);
      
      const isOpen = await this.$bvModal.msgBoxConfirm("success")
      if(isOpen) window.open("http://www.ladishb.com"+link,"_blank")
    },
    onEditorChange({ html }: any) {
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
