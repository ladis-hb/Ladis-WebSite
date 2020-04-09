<template>
  <client-only>
    <quill-editor
      v-model="comContent"
      ref="textEditor"
      :options="editorOption"
      @change="onEditorChange($event)"
    ></quill-editor>
  </client-only>
  <!-- <div
    class="quill-editor mb-5"
    :content="comContent"
    @change="onEditorChange($event)"
    v-quill:myQuillEditor="editorOption"
  ></div>-->
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MyEdit",
  props: ["content"],
  data() {
    return {
      editorContent: "",
      editorOption: {
        placeholder: "What’s on your mind?",
        theme: "snow",
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
          imageResize: true
        }
      }
    };
  },
  computed: {
    comContent: {
      get() {
        return (this as any).content;
      },
      set(val) {
        (this as any).editorContent = val as string;
      }
    }
  },
  methods: {
    onEditorChange({ html, text }: any) {
      this.$emit("update:content", html);
    }
  }
});
</script>

<style lang="scss" scoped>
.quill-editor {
  height: 100%;
  width: auto;
  overflow-y: auto;
}
</style>