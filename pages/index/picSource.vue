<template>
  <my-card title="上传素材" class="py-0">
    <b-jumbotron>
      <b-form>
        <b-input-group prepend="选择文件" class="mt-3">
          <b-form-file
            multiple
            v-model="files"
            :file-name-formatter="formatNames"
            placeholder="可以多选"
          ></b-form-file>
          <b-input-group-append>
            <b-overlay :show="load" rounded="sm">
              <b-button variant="info" @click="Put_file_Source" :disabled="!files">上传</b-button>
            </b-overlay>
          </b-input-group-append>
        </b-input-group>
        <ul class="mt-5">
          <li v-for="(name, key) in fileList" :key="key">{{ name }}</li>
        </ul>
      </b-form>
    </b-jumbotron>
    <b-navbar variant="dark" type="dark" sticky>
      <b-nav-form class="float-right">
        <b-form-input
          class="mr-sm-2"
          placeholder="选中图片直接拖入此输入框"
          v-model="inputSour"
          @input="inputSours"
        ></b-form-input>
      </b-nav-form>
      <b-nav-form class="ml-auto">
        <b-form-input v-model.trim="keyswords" placeholder="默认检索全部文件"></b-form-input>
        <b-button variant="info" @click="Get_pic_Source(keyswords)">检索</b-button>
      </b-nav-form>
    </b-navbar>
    <b-card title="选择素材">
      <div id="allImg" class="my-2" v-if="sourceFileFilter.Img.length>0">
        <h5 class="px-3 border-bottom">图片素材</h5>

        <span
          v-for="(item, index) in sourceFileFilter.Img"
          :key="index"
          @click="show(index)"
          v-b-tooltip.hover
          :title="item.name.split('__').pop()"
        >
          <b-img-lazy class="previewer-demo-img" thumbnail :src="item.src" width="150" />
        </span>
        <previewer ref="previewer" :list="sourceFileFilter.Img"></previewer>
      </div>
      <div id="allOther" class="my-2" v-if="sourceFileFilter.Other.length>0">
        <h5 class="px-3 border-bottom">文件素材</h5>
        <b-list-group>
          <b-list-group-item v-for="val in sourceFileFilter.Other" :key="val.name">
            <b-badge>{{String(val.filetype).toLocaleUpperCase()}}</b-badge>
            <b-link :href="val.path" class="text-decoration-none text-dark">{{val.name}}</b-link>
            <b-button
              variant="success"
              pill
              size="sm"
              class="ml-2 mb-2 float-right"
              @click="selectSourceFile(val)"
            >选中素材</b-button>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-card>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
import { uploadResult, fileDirList, selectFiles } from "../../types/typing";
import gql from "graphql-tag";
import Previewer from "../../components/previewer.vue";
export default Vue.extend({
  components: {
    Previewer
  },
  data() {
    let sourceFile = {
      files: [],
      size: 0,
      msg: ""
    };
    return {
      files: null,
      keyswords: "",
      sourceFile,
      load: false,
      inputSour: ""
    };
  },
  computed: {
    //  要上传的文件名列表
    fileList() {
      if (!this.$data.files) return [];
      return (<File[]>this.$data.files).map(file => {
        return decodeURI(file.name);
      });
    },

    // 刷选文件
    sourceFileFilter() {
      const sourceFile: fileDirList = this.$data.sourceFile;
      const keyswords = this.$data.keyswords;
      const files: any = {
        Img: [],
        Other: []
      };
      sourceFile.files
        .filter(el => !keyswords || el.includes(keyswords))
        .forEach(file => {
          let filetype = <string>file.split(".").pop();
          const name = <string>file.split("/").pop();
          const data = {
            // pre
            src: file,
            //
            path: file,
            name,
            filetype
          };
          if (["png", "jpeg", "jpg", "git", "bmp"].includes(filetype)) {
            files.Img.push({
              src: file,
              path: file,
              name,
              filetype: "img"
            });
          } else {
            files.Other.push({
              path: file,
              name,
              filetype
            });
          }
        });
      return files;
    }
  },
  methods: {
    show(index: any) {
      // 显示特定index的图片，使用ref
      (this.$refs.previewer as any).show(index);
    },
    // 上传文件
    Put_file_Source() {
      this.$data.load = true;
      const data = new FormData();
      (<Blob[]>this.$data.files).forEach(file => {
        data.append("files", file);
      });
      this.$axios
        .$put("/uploads/files", data)
        .then((result: { code: number; data: uploadResult[] }) => {
          this.$bvModal.msgBoxOk("上传已完成");
          this.$data.files = null;
          this.$data.load = false;
          result.data.forEach(file => {
            this.$store.commit("SET_SOURCE_FILE", file);
          });
        });
    },
    // 获取图片
    async Get_pic_Source(filter: string = "") {
      const files = await this.$apollo.query({
        query: gql`
          query getUploadFiles($filter: String) {
            getUploadFiles(filter: $filter) {
              files
              size
              msg
            }
          }
        `,
        variables: { filter },
        fetchPolicy: "network-only"
      });
      this.$data.sourceFile = files.data.getUploadFiles;
    },
    // 格式化文件名
    formatNames(files: File[]) {
      if (files.length === 1) {
        return files[0].name;
      } else {
        return `${files.length} files selected`;
      }
    },
    // 选中文件
    selectSourceFile(file: selectFiles) {
      this.$data.sourceFile.files = (this.$data
        .sourceFile as fileDirList).files.filter(f => f !== file.path);
      this.$store.commit("SET_SOURCE_FILE", file);
    },
    //
    inputSours() {
      const inputSour = decodeURI(new URL(this.$data.inputSour).pathname);
      if (!inputSour) return;
      const sourceFile: fileDirList = this.$data.sourceFile;
      const files: string[] = sourceFile.files;

      if (files.includes(inputSour)) {
        console.log(files);
        console.log(inputSour);
      }

      this.$data.inputSour = "";
    }
  }
});
</script>

<style lang="scss" scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "选取";
}
.list-file {
  transition: 2s;
  width: 0px;
}
.moo {
  z-index: 100;
  position: absolute;
  margin-top: 0%;
}
</style>
