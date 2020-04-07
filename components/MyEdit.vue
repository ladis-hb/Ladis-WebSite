<template>
  <div
    class="quill-editor mb-5"
    :content="comContent"
    @change="onEditorChange($event)"
    v-quill:myQuillEditor="editorOption"
  ></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MyEdit",
  props: ["content"],
  data() {
    const hljs = null;
    const editorOption = {
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
          highlight: (text: any) => (hljs as any).highlightAuto(text).value
        }
      }
    };
    return {
      DataContent: "",
      editorOption
    };
  },
  computed: {
    comContent: {
      get() {
        return this.content;
      },
      set(val) {
        this.DataContent = val as string;
      }
    }
  },
  methods: {
    onEditorChange({
      editor,
      html,
      text
    }: {
      editor: string;
      html: string;
      text: string;
    }) {
      this.$emit("update:content", html);
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
</style>