<template>
  <client-only>
    <vue-editor v-model="Cont"></vue-editor>
  </client-only>
</template>
<script lang="ts">
import Vue from "vue";
import { VueEditor } from "vue2-editor";
export default Vue.extend({
  components: {
    VueEditor
  },
  props: ["content"],
  data() {
    return {
      editorContent: "<h1>Some initial content</h1>"
    };
  },
  computed: {
    Cont: {
      get() {
        return (this as any).content;
      },
      set(val) {
        (this as any).editorContent = val as string;
      }
    }
  },
  watch: {
    editorContent: function(val) {
      (this as any).$emit("update:content", val);
    }
  }
});
</script>