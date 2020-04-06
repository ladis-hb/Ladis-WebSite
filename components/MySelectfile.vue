<template>
  <div>
    <b-form-group :label="title[0]" label-align="right" label-cols="2">
      <b-form-select v-model="file" :options="SourceFile"></b-form-select>
    </b-form-group>
    <b-form-group :label="title[1]" label-align="right" label-cols="2">
      <b-form-text>{{file}}</b-form-text>
      <b-img :src="file" height="100" fluid></b-img>
    </b-form-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { selectFiles } from "../types/typing";
export default Vue.extend({
  props: {
    isPic: {
      type: Boolean,
      default: true
    },
    files: {
      type: Array,
      default: ()=>[]
    }
  },
  data(){
      return {
          file:null
      }
  },
  computed: {
    title() {
      if (this.isPic) {
        return ["主题图片:", "图片预览:"];
      } else {
        return ["文件:", "选择文件"];
      }
    },
    SourceFile() {
      const SourceFile: selectFiles[] = this.$store.state.SourceFile;
      const files =this.files as string[]
      const hrefs = files.map((el:string)=>({text:el.split('/').pop() as string,value:el}))


      const result = SourceFile.filter(file => {
        if (this.isPic) {
          return file.filetype === "img";
        } else {
          return file.filetype !== "img";
        }
      }).map(file =>
        Object.assign(file, { text: file.name, value: file.path })
      );
      console.log({hrefs,result});
      
      return [...result,...hrefs];
    }
  }
});
</script>