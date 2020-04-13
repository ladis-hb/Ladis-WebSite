<template>
  <b-tabs>
    <b-tab title="编辑器">
      <quill-editor
        v-model="cpContent"
        :options="editorOption"
        @change="onEditorChange($event)"
      ></quill-editor>
    </b-tab>
    <b-tab title="源码">
      <codemirror ref="myCm"
                :value="cpContent" 
                :options="cmOptions"
                @input="onCmCodeChange">
    </codemirror>
    </b-tab>
  </b-tabs>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
//
import { codemirror } from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
export default {
  components: { quillEditor, codemirror },
  data() {
    return {
      DaContent: ``,
      editorOption: {
        modules: {
          imageDrop: true, //图片拖拽
          imageResize: {
            //放大缩小
            displaySize: true
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      },
      //
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/html',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    };
  },
  methods: {
    // 值发生变化
    onEditorChange(editor) {
      this.$emit("update:content", this.DaContent);
    },
    onCmCodeChange(newCode) {
      this.DaContent = newCode
      this.$emit("update:content", this.DaContent);
      console.log({cp:this.cpContent,newCode})
      
      
    }
  },
  props: ["content"],
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    },
    cpContent: {
      get() {
        return this.content || "";
      },
      set(val) {
        this.DaContent = val;
      }
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>